import { useFlowStore } from "../store/flow-store";
import { objToReturnDynamic } from "./utils";


/**
 * Creates a flow object from the current nodes and edges in the flow store
 * @returns The complete flow object representing the conversation flow
 */
export function createFlowObject() {
  // Get necessary state and functions from stores
  const {
    nodes,
    edges
  } = useFlowStore.getState()
  // Helper function to get the next connected node
  const getNext = (source, sourceHandle) => {
    let target = null
    edges.forEach((element) => {
      if (element.source === source) {
        if (sourceHandle === "-1") {
          target = element.target
        } else {
          if (element.sourceHandle === sourceHandle) {
            target = element.target
          }
        }
      }
    })
    return target
  }

  // Initialize the flow object
  let flow = {}

  // Process each node in the flow
  nodes.forEach((element) => {
    let obj1 = null
    let obj2 = null
    let obj3 = null

    if (element.type === 'Handler') {
      // Set up the initial flow properties
      flow = {
        ...flow,
        firstComponent: element.id,
        cancel: element.data.cancel.trim(),
        restart: element.data.restart.trim(),
        greet: element.data.greet.trim(),
        bye: element.data.bye.trim(),
        'thank you': element.data.thankYou.trim(),
      }

      obj1 = {
        type: 'handler',
      }
      obj1 = {
        ...obj1,
        next: getNext(element.id, '0'),
        nextflag: handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(element, '0'),
      }

    }
    else if (element.type === 'Message') {
      if (!element.data.advanced) {
        obj1 = {
          type: 'message',
          message: element.data.botSays.trim(),
          next: getNext(element.id, '0'),
          nextflag: handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(element, '0'),
        }
      }
      else {
        obj1 = {
          type: 'textPrompt',
          message: element.data.botSays.trim(),
          next: element.id + '-handler',
        }

        obj2 = {
          type: "handler",
          save: false,
        }

        if (element.data.regex) {
          obj1 = {
            ...obj1,
            validator: {
              regex: element.data.regex.trim(),
              errorMsg: element.data.errorMessage.trim()
            },
          }
        }
        if (element.data.save) {
          obj2 = {
            ...obj2,
            save: element.data.save,
            name: element.data.variableName.trim(),
          }
        }

        obj2 = {
          ...obj2,
          next: getNext(element.id, '0'),
          nextflag: handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(element, '0'),
        }
      }
    }
    else if (element.type === 'ChoicePrompt') {
      let btns = []
      let cases = {}

      obj2 = {
        type: "handler",
      }

      obj3 = {
        type: "handler",
      }

      element.data.formData.forEach((obj, index) => {
        btns = btns.concat({
          text: obj.text.trim(),
        })

        cases = {
          ...cases,
          [obj.text.trim()]: getNext(element.id, (index + 1) + '')
        }
      })

      cases = {
        ...cases,
        Other: element.id + '-handler-2',
      }

      obj3 = { ...obj3, next: getNext(element.id, '0') }

      obj2 = {
        ...obj2,
        save: false,
      }
      
      if (element.data.save) {
        obj2 = {
          ...obj2,
          save: element.data.save,
          name: element.data.variableName.trim(),
        }
      }

      obj1 = {
        type: 'choicePrompt',
        btns: btns,
        message: element.data.botSays.trim(),
        next: element.id + '-handler-1',
        other: true,
      }

      obj2 = {
        ...obj2,
        cases: cases,
      }
    }
    else if (element.type === 'RPA') {
      obj1 = {
        type: 'rpa',
        token: element.data.token,
        outputs: element.data.rpaOutputs
      }
      let vars = {}

      obj1 = {
        ...obj1,
        name: element.data.label,
      }

      if (element.data.rpaVariables.length > 0) {
        element.data.rpaVariables.forEach((rpaV) => {
          vars = { ...vars, [Object.keys(rpaV)[0]]: rpaV[Object.keys(rpaV)[0]] }
        })
      }

      obj1 = {
        ...obj1,
        vars: vars,
      }

      if (element.data.variables) {
        obj1 = {
          ...obj1,
          variables: element.data.variables,
        }
      }

      if (element.data.outputs) {
        if (Object.keys(element.data.outputs).length > 0) {
          let cases = {}
          let key = null
          let index = 0

          for (key in element.data.outputs) {
            if (element.data.outputs.hasOwnProperty(key)) {
              cases = {
                ...cases,
                [element.data.outputs[key]]: getNext(element.id, (index) + '')
              }
              index = index + 1
            }
          }

          obj1 = {
            ...obj1,
            cases: cases,
          }
        }
        else {
          obj1 = {
            ...obj1,
            next: getNext(element.id, '-1'),
            nextflag: handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(element, '-1'),
          }
        }
      }
    }
    else if (element.type === 'End') {
      obj1 = {
        type: 'endDialog',
        message: element.data.botSays.trim(),
        loopFrom: handleRightDrawerCheckIfLoopFromNameAlreadyExists(element),
      }
    }
    else if (element.type === 'Switch') {
      function transformData(data) {
        return data.map((item, index) => {
          const { operator_type, first_operator, operation, second_operator } = item;

          // Helper function to determine if operator contains a variable (${v})
          const determineOperatorSource = (operator) => {
            return operator.includes('${') ? 'variable' : 'text';
          };

          return {
            type: operator_type,
            operator: operation,
            firstOperatorSource: determineOperatorSource(first_operator),
            secondOperatorSource: determineOperatorSource(second_operator),
            firstOperator: first_operator,
            secondOperator: second_operator,
            relatedCase: `condition${index}`
          };
        });
      }
      const finalObj = objToReturnDynamic(element.data.json)
      const dataToSend = transformData(finalObj.conditions)

      let cases = {}

      obj2 = {
        type: "handler",
      }
      finalObj.conditions.forEach((obj, index) => {
        cases = {
          ...cases,
          [`condition${index}`]: this.getNext(element.id, (index + 1) + '')
        }
      })
      obj2 = { ...obj2, next: this.getNext(element.id, '0') }
      cases = {
        ...cases,
        Other: element.id + '-handler-1',
      }
      obj1 = {
        type: 'switchHandler',
        next: element.id + '-handler-1',
        data: {
          conditions: dataToSend,
          cases: cases
        },
      }

    }

    // Add objects to flow
    if (obj1 !== null) {
      flow = { ...flow, [element.id]: obj1 }
      if (obj2 !== null) {
        flow = { ...flow, [obj1.next]: obj2 }
        if (obj3 !== null) {
          flow = { ...flow, [obj2.cases.Other]: obj3 }
        }
      }
    }
  })

  return flow
}
function handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(node, sourceHandle) {
  const { nodes } = useFlowStore.getState()
  let toReturn = false
  let nextEdgeTarget = getNext(node.id, sourceHandle)
  if (nextEdgeTarget) {
    let nextNode = nodes.find(node => node.id === nextEdgeTarget)
    if (nextNode && nextNode.type !== 'End' && nextNode.data) {
      if (nextNode.data.loopFromSwitch && nextNode.data.loopFromName && nextNode.data.loopFromName.trim()) {
        if (handleRightDrawerCheckIfLoopFromNameIsUsedInEndNode(nextNode.data.loopFromName)) {
          toReturn = true
        }
      }
    }
  }
  return toReturn
}

// Get the IDs of next connected components
function getNext(source, sourceHandle) {
  const { edges } = useFlowStore.getState()
  let target = null
  edges.forEach((element) => {
    if (element.source === source) {
      if (sourceHandle === "-1") {
        target = element.target
      } else {
        if (element.sourceHandle === sourceHandle) {
          target = element.target
        }
      }
    }
  })
  return target
}
// Check if loop from name already exists
function handleRightDrawerCheckIfLoopFromNameAlreadyExists(endNode) {
  const { nodes } = useFlowStore.getState()
  let toReturn = false
  if (endNode.data.loopFromSwitch && endNode.data.loopFromName && endNode.data.loopFromName !== "None") {
    const foundNode = nodes.find(
      (node) => node.type !== "End" && node.data && node.data.loopFromName === endNode.data.loopFromName,
    )
    toReturn = foundNode && foundNode.data.loopFromSwitch && foundNode.data.loopFromName ? foundNode.id : false
  }

  return toReturn
}
// Check if loop from name is used in end node
function handleRightDrawerCheckIfLoopFromNameIsUsedInEndNode(loopFromName) {
  const { nodes } = useFlowStore.getState()
  let toReturn = false

  nodes.forEach((endNode) => {
    if (endNode.type === "End") {
      if (endNode.data.loopFromSwitch) {
        if (endNode.data.loopFromSwitch && endNode.data.loopFromName === loopFromName) {
          toReturn = true
        }
      }
    }
  })
  return toReturn
}