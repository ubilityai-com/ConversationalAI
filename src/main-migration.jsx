import { isEdge, isNode } from "@xyflow/react"
import axios from "axios"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import MainLayout from "./MainLayout"
import { useFlowStore } from "./store/flow-store"

const Main = () => {
  // Get state and actions from Zustand stores
  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    setUserData,
    setAuthToken,
    setUpdatingBot,
    setIsLoadingBot,
    setFormDialogBotName,
    setBotType,
    setVariablesNamesOfEachRPA,
    setEndLoopFromNodesNames,
    setFormDialogApplyValues,
    mousePositionHandleMenu,
    setCards,
    setRpasList,
    setIntents,
    setEntities,
  } = useFlowStore()


  // Component Did Mount equivalent
  useEffect(() => {
    const authToken = checkAuthenticationTokenAndBotID()

    getDataFromDatabaseAndSaveItInState(process.env.REACT_APP_GET_RPAS_URL + "get_triggers", authToken, "rpasList")
    getDataFromDatabaseAndSaveItInState(
      process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + "card/get_cards",
      authToken,
      "cards",
    )
    getDataFromDatabaseAndSaveItInState(
      process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + "luis/get_intents",
      authToken,
      "intents",
    )
    getDataFromDatabaseAndSaveItInState(
      process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + "luis/get_entities",
      authToken,
      "entities",
    )
  }, [])

  // Component Did Update equivalent for nodes
  useEffect(() => {
    assignVariablesNamesToEachRPA()
    assignNodeNamesToEachEnd()
  }, [nodes])

  const checkAuthenticationTokenAndBotID = () => {
    const authToken = Cookies.get("token")
    const botID = Cookies.get("botID")
    const botType = Cookies.get("botType")
    Cookies.remove("botID")
    Cookies.remove("botType")

    //next line is temporerly for testing issues
    const newAuthToken = authToken
    setAuthToken(newAuthToken)
    setBotType(botType ? botType : "Web")
    getDetailsOfUser(newAuthToken)

    if (botID) {
      loadBotByItsID(botID, newAuthToken)
    } else {
      initializeAllDroppedElementsByHandler()
    }

    return newAuthToken
  }

  const loadBotByItsID = (botID, authToken) => {
    setIsLoadingBot(true)
    const config = {
      method: "get",
      url: process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + "configuration/getBotUI/" + botID,
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }

    axios(config)
      .then((response) => {
        const { ui, flow_name, status } = response.data
        const nodes = ui.ui.filter((elt) => isNode(elt))
        const edges = ui.ui.filter((elt) => isEdge(elt))
        setUpdatingBot(response.data)
        setIsLoadingBot(false)
        setNodes(nodes)
        setEdges(edges)
        setFormDialogBotName(flow_name)
        setFormDialogApplyValues(status)
        onLoadWhenVersionIsChanged()
      })
      .catch((error) => {
        console.log("Loading Bot By ID Error", error)
        setIsLoadingBot(false)
      })
  }

  const getDetailsOfUser = (authToken) => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + "userdetails/get",
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }

    axios(config)
      .then((response) => {
        setUserData(response.data)
      })
      .catch((error) => {
        console.log("Error Details Of User", error)
      })
  }

  const initializeAllDroppedElementsByHandler = () => {
    setNodes([
      {
        id: uuidv4(),
        type: "Handler",
        data: {
          color: "#68b04b",
          label: "Start Dialog",
          description:"Begin your Chatbot journey",
          icon: "PlayArrow",
          rightSideData: {
            greet: "",
            restart: "",
            thankYou: "",
            cancel: "",
            bye: "",
          },
        },
        position: { x: 400, y: 40 },
      },
    ])
  }

  // Get Cards, Intents and Entities from DB and save them in state variables
  const getDataFromDatabaseAndSaveItInState = (url, authToken, stateName) => {
    const config = {
      method: "get",
      url: url,
      headers: { Authorization: "Bearer " + authToken },
    }

    axios(config)
      .then((response) => {
        let newData = response.data
        if (stateName === "intents") {
          newData.sort((a, b) => (a.toUpperCase() > b.toUpperCase() ? 1 : b.toUpperCase() > a.toUpperCase() ? -1 : 0))
          setIntents(newData)
        } else if (stateName === "entities") {
          newData.sort((a, b) => (a.toUpperCase() > b.toUpperCase() ? 1 : b.toUpperCase() > a.toUpperCase() ? -1 : 0))
          setEntities(newData)
        } else if (stateName === "rpasList") {
          newData = response.data.triggers.filter((item) => item.status === "Active")
          newData.sort((a, b) =>
            a.name.toUpperCase() > b.name.toUpperCase() ? 1 : b.name.toUpperCase() > a.name.toUpperCase() ? -1 : 0,
          )
          newData = newData.map(flow => {
            const get = (droppedElement) => {
              const rpaVariables = droppedElement.inputs
                ? Object.entries(droppedElement.inputs).map(([key, val]) => ({
                  [key]: val,
                  asVariable: false,
                }))
                : [];

              return {
                label: droppedElement.name,
                inputs: { ...droppedElement.inputs, None: "None" },
                outputs: { ...droppedElement.outputs },
                rpaOutputs: droppedElement.rpaoutputs?.length ? [...droppedElement.rpaoutputs] : [],
                variables: { ...droppedElement.variables },
                icon: "DeviceHub",
                color: "#8f8f8f",
                token: droppedElement.token,
                rpaVariables,
              };
            }
            return { ...flow, type: "RPA", defaults: get(flow) }
          })
          setRpasList(newData)
        } else if (stateName === "cards") {
          newData.sort((a, b) =>
            a.cardname.toUpperCase() > b.cardname.toUpperCase()
              ? 1
              : b.cardname.toUpperCase() > a.cardname.toUpperCase()
                ? -1
                : 0,
          )
          setCards(newData)
        }
      })
      .catch((error) => {
        console.log(stateName + " : ", error)
      })
  }

  // Allows RPA to find variables from attached components
  const assignVariablesNamesToEachRPA = () => {
    let newVariablesNamesOfEachRPA = {}
    nodes.forEach((RPAElement) => {
      if (RPAElement.type === "RPA") {
        let id = RPAElement.id
        let isNode = false
        let finished = false
        let foundElement = null
        let myRPADropdownVariables = [] //RPAElement.data.inputs

        while (!finished) {
          if (!isNode) {
            // eslint-disable-next-line
            foundElement = edges.find((element) => element.target === id)
            if (foundElement) {
              id = foundElement.source
            } else {
              finished = true
            }
            isNode = true
          } else {
            // eslint-disable-next-line
            foundElement = nodes.find((element) => element.id === id)
            if (foundElement.type === "Handler") {
              // eslint-disable-next-line
              foundElement.data.dynamicDataHandler.forEach((dynamicDataHandlerObj, index) => {
                dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj, innerIndex) => {
                  if (innerDynamicDataHandlerObj.choice === "Keyword") {
                    if (
                      innerDynamicDataHandlerObj.value &&
                      innerDynamicDataHandlerObj.save &&
                      innerDynamicDataHandlerObj.variableName
                    ) {
                      myRPADropdownVariables = myRPADropdownVariables.concat(
                        "${" + innerDynamicDataHandlerObj.variableName + "}",
                      )
                    }
                  }
                })
              })

              finished = true
            } else if (foundElement.type === "Message") {
              if (foundElement.data.save && foundElement.data.variableName) {
                myRPADropdownVariables = myRPADropdownVariables.concat("${" + foundElement.data.variableName + "}")
              }
              // eslint-disable-next-line
              foundElement.data.dynamicDataHandler.forEach((dynamicDataHandlerObj, index) => {
                dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj, innerIndex) => {
                  if (innerDynamicDataHandlerObj.choice === "Keyword") {
                    if (
                      innerDynamicDataHandlerObj.value &&
                      innerDynamicDataHandlerObj.save &&
                      innerDynamicDataHandlerObj.variableName
                    ) {
                      myRPADropdownVariables = myRPADropdownVariables.concat(
                        "${" + innerDynamicDataHandlerObj.variableName + "}",
                      )
                    }
                  }
                })
              })
            } else if (
              foundElement.type === "ConfirmPrompt" ||
              foundElement.type === "DatePrompt" ||
              foundElement.type === "NumberPrompt" ||
              foundElement.type === "RPAList"
            ) {
              if (foundElement.data.variableName) {
                myRPADropdownVariables = myRPADropdownVariables.concat("${" + foundElement.data.variableName + "}")
              }
            } else if (
              foundElement.type === "ListCard" ||
              foundElement.type === "WebListCard" ||
              foundElement.type === "ChoicePrompt"
            ) {
              if (!foundElement.data.other) {
                if (foundElement.data.save && foundElement.data.variableName) {
                  myRPADropdownVariables = myRPADropdownVariables.concat("${" + foundElement.data.variableName + "}")
                }
              } else {
                // eslint-disable-next-line
                foundElement.data.dynamicDataHandler.forEach((dynamicDataHandlerObj, index) => {
                  dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj, innerIndex) => {
                    if (innerDynamicDataHandlerObj.choice === "Keyword") {
                      if (
                        innerDynamicDataHandlerObj.value &&
                        innerDynamicDataHandlerObj.save &&
                        innerDynamicDataHandlerObj.variableName
                      ) {
                        myRPADropdownVariables = myRPADropdownVariables.concat(
                          "${" + innerDynamicDataHandlerObj.variableName + "}",
                        )
                      }
                    }
                  })
                })
              }
            } else if (foundElement.type === "Card") {
              if (foundElement.data.variables && foundElement.data.variables.length > 0) {
                // eslint-disable-next-line
                foundElement.data.variables.forEach((vari, innerIndex) => {
                  myRPADropdownVariables = myRPADropdownVariables.concat("${" + vari + "}")
                })
              }
            }

            if (foundElement) {
              id = foundElement.id
            } else {
              finished = true
            }
            isNode = false
          }
        }
        console.log({ myRPADropdownVariables });
        if (myRPADropdownVariables && myRPADropdownVariables.length > 0) {
          newVariablesNamesOfEachRPA = { ...newVariablesNamesOfEachRPA, [RPAElement.id]: myRPADropdownVariables }
          setVariablesNamesOfEachRPA(newVariablesNamesOfEachRPA)
          console.log({ newVariablesNamesOfEachRPA });
        }
      }
    })
  }

  // Allows RPA to find variables from attached components
  const assignNodeNamesToEachEnd = () => {
    let newEndLoopFromNodesNames = {}
    nodes.forEach((EndNode) => {
      if (EndNode.type === "End") {
        let id = EndNode.id
        let isNode = false
        let finished = false
        let foundElement = null
        let myEndLoopFromNodesNames = []

        while (!finished) {
          if (!isNode) {
            // eslint-disable-next-line
            foundElement = edges.find((element) => element.target === id)
            if (foundElement) {
              id = foundElement.source
            } else {
              finished = true
            }
            isNode = true
          } else {
            // eslint-disable-next-line
            foundElement = nodes.find((element) => element.id === id)
            if (foundElement.type === "Handler") {
              finished = true
            } else {
              if (
                foundElement.data.loopFromSwitch &&
                foundElement.data.loopFromName &&
                foundElement.data.loopFromName.trim()
              ) {
                myEndLoopFromNodesNames = [...myEndLoopFromNodesNames, foundElement.data.loopFromName]
              }
            }

            if (foundElement) {
              id = foundElement.id
            } else {
              finished = true
            }
            isNode = false
          }
        }

        if (myEndLoopFromNodesNames) {
          if (myEndLoopFromNodesNames.length > 0) {
            newEndLoopFromNodesNames = {
              ...newEndLoopFromNodesNames,
              [EndNode.id]: [...myEndLoopFromNodesNames, "None"],
            }
          } else {
            newEndLoopFromNodesNames = { ...newEndLoopFromNodesNames, [EndNode.id]: ["None"] }
          }

          setEndLoopFromNodesNames(newEndLoopFromNodesNames)
        }
      }
    })
  }



  const onLoadWhenVersionIsChanged = () => {
    setTimeout(() => {
      document.getElementsByClassName("react-flow__controls-button react-flow__controls-fitview")[0].click()
      document.getElementsByClassName("react-flow__controls-button react-flow__controls-zoomout")[0].click()
      document.getElementsByClassName("react-flow__controls-button react-flow__controls-zoomout")[0].click()
    }, 500)
  }


  return (
    <MainLayout />
  )
}

export default Main
