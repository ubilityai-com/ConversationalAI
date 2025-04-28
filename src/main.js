import React, { useState } from 'react';
// import clsx from 'clsx';
import { addEdge, applyEdgeChanges, applyNodeChanges, getConnectedEdges, isEdge, isNode, MarkerType } from '@xyflow/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
//import jwt from 'jsonwebtoken';
//import from Material UI
// import Drawer from '@material-ui/core/Drawer';
// import IconButton from '@material-ui/core/IconButton';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// //import from my files
// import ApplicationBar from './app-bar'
// import LeftDrawerBody from './left-drawer-body';
// import RightDrawerBody from './right-drawer-body'
// import FromDialog from './form-dialog'
// import FlowZone from './flow-zone';
// import SnackBarMessage from './snackbar-message'

import MainLayout from './MainLayout';
const rightDrawerWidth = 300;

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.LeftDrawerElement = React.createRef()
        this.ApplicationBarElement = React.createRef()

        this.onHandleMenuDeleteSelected = this.onHandleMenuDeleteSelected.bind(this)
        this.handleRightClickOnHandleMenuOpenOrClose = this.handleRightClickOnHandleMenuOpenOrClose.bind(this)
        this.onSelectionContextMenu = this.onSelectionContextMenu.bind(this)
        this.applyNodeChangesFunc = this.applyNodeChangesFunc.bind(this)
        this.applyEdgeChangesFunc = this.applyEdgeChangesFunc.bind(this)
        this.setReactFlowInstance = this.setReactFlowInstance.bind(this)
        //Handle Right Drawer
        this.handleRightDrawerAddInnerCounters = this.handleRightDrawerAddInnerCounters.bind(this)
        this.handleRightDrawerSubtractInnerCounters = this.handleRightDrawerSubtractInnerCounters.bind(this)

        this.handleRightDrawerAddCounters = this.handleRightDrawerAddCounters.bind(this)
        this.handleRightDrawerSubtractCounters = this.handleRightDrawerSubtractCounters.bind(this)
        this.handleRightDrawerCheckIfAINLPIsChosenInBefore = this.handleRightDrawerCheckIfAINLPIsChosenInBefore.bind(this)
        // this.handleRightDrawerCheckIfPreviousNodeIsABranchsNode = this.handleRightDrawerCheckIfPreviousNodeIsABranchsNode.bind(this)

        this.handleRightDrawerAnyFormChange = this.handleRightDrawerAnyFormChange.bind(this)
        this.handleRightDrawerUploadIconClicked = this.handleRightDrawerUploadIconClicked.bind(this)

        this.handleSaveFormDialogCheckIfAllRequiredDataAreFilledForEachElement = this.handleSaveFormDialogCheckIfAllRequiredDataAreFilledForEachElement.bind(this)

        // this.handleAppBarVersionOnChange = this.handleAppBarVersionOnChange.bind(this);

        this.handleFlowZoneCheckIfAllHandlesAreConnected = this.handleFlowZoneCheckIfAllHandlesAreConnected.bind(this);
        this.checkIfWebUrlIsEmpty = this.checkIfWebUrlIsEmpty.bind(this);


        this.state = {
            reactFlowInstance:null,
            droppedElement: null,
            clickedElement: null,
            flowZoneSelectedManyElement: [],
            zoomAndMoveValues: { x: 0, y: 0, zoom: 1 },
            nodes: [],
            edges: [],
            userData: {},
            authToken: false,
            updatingBot: false,
            isLoadingBot: false,
            IDOnSelectionContextMenu: "",
            // flowVersionsList: [],
            // selectedFlowVersion: null,
            flow: {},
            formDialogBotName: '',
            botType: 'Web',
            variablesNamesOfEachRPA: {},
            endLoopFromNodesNames: {},
            //allVariablesNames: [],
            isLeftOpen: true,
            isRightOpen: false,
            isFormDialogOpen: false,
            formDialogStatus: null,
            formDialogApplyValues: 'Draft',
            mousePositionHandleMenu: { mouseX: null, mouseY: null, handle: null },
            mousePositionManySelectedElementMenu: { mouseX: null, mouseY: null },
            showSnackBarMessage: { open: false, message: null, color: null, duration: 3000 },
            //searchText: '',
            //filteredCards: [],
            cards: [],
            rpasList: [],
            intents: [],
            entities: [],
            operations: ['==', '!=', '<=', '<', '>=', '>',],
            limitArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            scoreArray: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0'],
            components: [
                {
                    "name": "Message",
                    "type": 'Message',
                    "icon": "QuestionAnswer",
                    "color": '#4b98ea'//"#1e62ea",
                },
                // {
                //     "name": "Date Prompt",
                //     "type": 'DatePrompt',
                //     "icon": "Event",
                //     "color": '#e067c6',//"#19a0b3",
                // },
                // {
                //     "name": "Number Prompt",
                //     "type": 'NumberPrompt',
                //     "icon": "Looks3",
                //     "color": "#009688",
                // },
                // {
                //     "name": "Confirmation Prompt",
                //     "type": 'ConfirmPrompt',
                //     "icon": "Announcement",
                //     "color": "#c34dea",
                // },
                {
                    "name": "Choice",
                    "type": 'ChoicePrompt',
                    "icon": "InsertComment",
                    "color": "#61b765",
                },
                {
                    "name": "Web List Card",
                    "type": 'WebListCard',
                    "icon": "LinearScale",
                    "color": "#1b3d8c",
                },
                {
                    "name": "List Card",
                    "type": 'ListCard',
                    "icon": "LinearScale",
                    "color": "#855DA1",
                },
                // {
                //     "name": "Knowledge Base",
                //     "type": 'KnowledgeBase',
                //     "icon": "Storage",
                //     "color": "#e2aa00",
                // },
                // {
                //     "name": "RPA Result Card Display",
                //     "cardname": "RPA Result Card Display",
                //     // 'withHandler': false,
                //     'variables': null,
                //     "type": "Card",
                //     'icon': 'InsertDriveFile',
                //     "color": "#607D8B",
                //     "cardDetails": {
                //         "type": "AdaptiveCard",
                //         "body": [
                //             {
                //                 "type": "TextBlock",
                //                 "text": "**RPA Info**"
                //             },
                //             {
                //                 "type": "FactSet",
                //                 "facts": [
                //                     {
                //                         // eslint-disable-next-line
                //                         "$data": "${properties}",
                //                         // eslint-disable-next-line
                //                         "title": "${key}:",
                //                         // eslint-disable-next-line
                //                         "value": "${value}"
                //                     }
                //                 ]
                //             }
                //         ],
                //         "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                //         "version": "1.2"
                //     },
                // },
                // {
                //     "name": "RPA Result List Display",
                //     "type": "RPAList",
                //     'icon': 'InsertDriveFile',
                //     "color": "#7f7f7f",
                // },

                {
                    "name": "End",
                    "type": 'End',
                    "icon": "Stop",
                    "color": "#E32212",
                },
            ],
        };
    }

    //On page load, get Data from DB
    componentDidMount() {//like useEffect() but called once.
        let authToken = this.checkAuthenticationTokenAndBotID();

        this.getDataFromDatabaseAndSaveItInState(process.env.REACT_APP_GET_RPAS_URL + 'get_triggers', authToken, 'rpasList')
        this.getDataFromDatabaseAndSaveItInState(process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + 'card/get_cards', authToken, 'cards')
        this.getDataFromDatabaseAndSaveItInState(process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + 'luis/get_intents', authToken, 'intents')
        this.getDataFromDatabaseAndSaveItInState(process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + 'luis/get_entities', authToken, 'entities')
    }

    checkAuthenticationTokenAndBotID() {
        let authToken = Cookies.get('token');
        let botID = Cookies.get('botID');
        let botType = Cookies.get('botType');
        Cookies.remove('botID');
        Cookies.remove('botType');

        //next line is temporerly for testing issues 
        let newAuthToken = authToken ? authToken : process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_TOKEN;
        this.setState({ authToken: newAuthToken, botType: botType ? botType : 'Web' });
        this.getDetailsOfUser(newAuthToken);

        //next lines is temporerly for testing issues 
        // let rpaToken = rpaToken
        //     ? rpaToken
        //     : 203

        if (botID) {
            this.loadBotByItsID(botID, newAuthToken);
        }
        // if (newAuthToken) {
        //     this.getDetailsOfUser(newAuthToken);


        // }
        else {
            this.initializeAllDroppedElementsByHandler()
        }

        return newAuthToken;
    }
    loadBotByItsID(botID, authToken) {
        this.setState({ isLoadingBot: true });
        let config = {
            method: 'get',
            url: process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + 'configuration/getBotUI/' + botID,
            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        };

        axios(config)
            .then((response) => {
                const { ui, flow_name, status } = response.data;
                const nodes = ui.ui.filter(elt => isNode(elt))
                const edges = ui.ui.filter(elt => isEdge(elt))
                this.setState({
                    updatingBot: response.data,
                    isLoadingBot: false,
                    nodes,
                    edges,
                    formDialogBotName: flow_name,
                    formDialogApplyValues: status,
                });
                this.onLoadWhenVersionIsChanged()
            })
            .catch((error) => {
                console.log("Loading Bot By ID Error", error);
                this.setState({ isLoadingBot: false });
            });

    }

    getDetailsOfUser(authToken) {
        // this.setState({ isLoadingBot: true });

        let config = {
            method: 'get',
            url: process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + 'userdetails/get',
            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        };


        axios(config)
            .then((response) => {
                // const { ui, flow_name, status } = response.data;
                this.setState({
                    userData: response.data,

                });
                // this.onLoadWhenVersionIsChanged()
            })
            .catch((error) => {
                console.log("Error Details Of User", error);
                // this.setState({ isLoadingBot: false });
            });

    }






    initializeAllDroppedElementsByHandler() {
        this.setState({
            nodes: [
                {
                    id: uuidv4(),
                    type: 'Handler',
                    data: {
                        color: '#68b04b',
                        label: 'Start Dialog',
                        icon: 'PlayArrow',
                        dynamicDataHandler: [],
                        greet: '',
                        restart: '',
                        thankYou: '',
                        cancel: '',
                        bye: '',
                        // onHandleMenuDeleteSelected: this.onHandleMenuDeleteSelected,
                        // handleRightClickOnHandleMenuOpenOrClose: this.handleRightClickOnHandleMenuOpenOrClose,
                        mousePositionHandleMenu: this.state.mousePositionHandleMenu,
                    },
                    position: { x: 400, y: 40 },
                    //sourcePosition: 'right',
                }
            ],
        });
    }
    applyNodeChangesFunc(changes) {
        console.log({ changes });
        this.setState((prevState) => ({ nodes: applyNodeChanges(changes, prevState.nodes) }))
    }
    applyEdgeChangesFunc(changes) {
        console.log({ changes });
        this.setState((prevState) => ({ edges: applyEdgeChanges(changes, prevState.edges) }))
    }
    setReactFlowInstance(rfInst){
        this.setState(()=>({reactFlowInstance:rfInst}))
    }

    // Get  Cards, Intents and Entities from DB and save them in state variables
    getDataFromDatabaseAndSaveItInState(url, authToken, stateName) {

        let config = {
            method: 'get',
            url: url,
            headers: { 'Authorization': 'Bearer ' + authToken }
        };

        axios(config)
            .then(function (response) {
                let newData = response.data;
                if (stateName === 'intents') {
                    newData.sort((a, b) => (a.toUpperCase() > b.toUpperCase()) ? 1 : ((b.toUpperCase() > a.toUpperCase()) ? -1 : 0));
                    this.setState({ [stateName]: newData });
                }
                else if (stateName === 'entities') {
                    newData.sort((a, b) => (a.toUpperCase() > b.toUpperCase()) ? 1 : ((b.toUpperCase() > a.toUpperCase()) ? -1 : 0));
                    this.setState({ [stateName]: newData });
                }
                else if (stateName === 'rpasList') {
                    newData = response.data.triggers.filter(item => item.status === "Active")
                    newData.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0));
                    this.setState({ [stateName]: newData });
                }
                else if (stateName === 'cards') {
                    newData.sort((a, b) => (a.cardname.toUpperCase() > b.cardname.toUpperCase()) ? 1 : ((b.cardname.toUpperCase() > a.cardname.toUpperCase()) ? -1 : 0));
                    this.setState({ [stateName]: newData });
                }
            }.bind(this))
            .catch(function (error) {
                console.log(stateName + " : ", error);
            });
    }
    //ON canavas State Changes render all page 
    componentDidUpdate(prevProps, prevState) {// like useEffect called on any change
        if (prevState.nodes !== this.state.nodes) {//LATER
            this.assignVariablesNamesToEachRPA()// to see with rayan later
            this.assignNodeNamesToEachEnd()// to see with rayan later
            // this.createFlowObject()
            // console.log('handleSaveFormDialogCheckIfAllRequiredDataAreFilledForEachElement',
            //     this.handleSaveFormDialogCheckIfAllRequiredDataAreFilledForEachElement())
            // console.log('handleFlowZoneCheckIfAllHandlesAreConnected',
            //     this.handleFlowZoneCheckIfAllHandlesAreConnected())
        }
    }

    //allows RPA to find varaibles from attached components 
    assignVariablesNamesToEachRPA() {
        let newVariablesNamesOfEachRPA = {}
        this.state.nodes.forEach((RPAElement) => {
            if (RPAElement.type === 'RPA') {
                let id = RPAElement.id
                let isNode = false
                let finished = false
                let foundElement = null
                let myRPADropdownVariables = [] //RPAElement.data.inputs

                while (!finished) {
                    if (!isNode) {
                        // eslint-disable-next-line
                        foundElement = this.state.edges.find(element => element.target === id)
                        if (foundElement) {
                            id = foundElement.source
                        }
                        else {
                            finished = true
                        }
                        isNode = true
                    }
                    else {
                        // eslint-disable-next-line
                        foundElement = this.state.nodes.find(element => element.id === id)
                        if (foundElement.type === 'Handler') {

                            // eslint-disable-next-line
                            foundElement.data.dynamicDataHandler.forEach((dynamicDataHandlerObj, index) => {
                                dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj, innerIndex) => {
                                    if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                                        if (innerDynamicDataHandlerObj.value &&
                                            innerDynamicDataHandlerObj.save &&
                                            innerDynamicDataHandlerObj.variableName) {
                                            myRPADropdownVariables = myRPADropdownVariables.concat('${' + innerDynamicDataHandlerObj.variableName + '}')
                                        }
                                    }
                                })
                            })

                            finished = true
                        }
                        else if (foundElement.type === 'Message') {
                            if (foundElement.data.save && foundElement.data.variableName) {
                                myRPADropdownVariables = myRPADropdownVariables.concat('${' + foundElement.data.variableName + '}')
                            }
                            // eslint-disable-next-line
                            foundElement.data.dynamicDataHandler.forEach((dynamicDataHandlerObj, index) => {
                                dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj, innerIndex) => {
                                    if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                                        if (innerDynamicDataHandlerObj.value &&
                                            innerDynamicDataHandlerObj.save &&
                                            innerDynamicDataHandlerObj.variableName) {
                                            myRPADropdownVariables = myRPADropdownVariables.concat('${' + innerDynamicDataHandlerObj.variableName + '}')
                                        }
                                    }
                                })
                            })
                        }
                        else if (foundElement.type === 'ConfirmPrompt' || foundElement.type === 'DatePrompt' || foundElement.type === 'NumberPrompt' || foundElement.type === 'RPAList') {
                            if (foundElement.data.variableName) {
                                myRPADropdownVariables = myRPADropdownVariables.concat('${' + foundElement.data.variableName + '}')
                            }
                        }
                        else if (foundElement.type === 'ListCard' || foundElement.type === 'WebListCard' || foundElement.type === 'ChoicePrompt') {
                            if (!foundElement.data.other) {
                                if (foundElement.data.save && foundElement.data.variableName) {
                                    myRPADropdownVariables = myRPADropdownVariables.concat('${' + foundElement.data.variableName + '}')
                                }
                            }
                            else {
                                // eslint-disable-next-line
                                foundElement.data.dynamicDataHandler.forEach((dynamicDataHandlerObj, index) => {
                                    dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj, innerIndex) => {
                                        if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                                            if (innerDynamicDataHandlerObj.value &&
                                                innerDynamicDataHandlerObj.save &&
                                                innerDynamicDataHandlerObj.variableName) {
                                                myRPADropdownVariables = myRPADropdownVariables.concat('${' + innerDynamicDataHandlerObj.variableName + '}')
                                            }
                                        }
                                    })
                                })
                            }
                        }
                        else if (foundElement.type === 'Card') {
                            if (foundElement.data.variables && foundElement.data.variables.length > 0) {
                                // eslint-disable-next-line
                                foundElement.data.variables.forEach((vari, innerIndex) => {
                                    myRPADropdownVariables = myRPADropdownVariables.concat('${' + vari + '}')
                                })
                            }
                        }

                        if (foundElement) {
                            id = foundElement.id
                        }
                        else {
                            finished = true
                        }
                        isNode = false
                    }
                }
                //console.log('myRPADropdownVariables')
                //console.log(myRPADropdownVariables)
                if (myRPADropdownVariables && myRPADropdownVariables.length > 0) {
                    newVariablesNamesOfEachRPA = { ...newVariablesNamesOfEachRPA, [RPAElement.id]: myRPADropdownVariables }
                    this.setState({
                        variablesNamesOfEachRPA: newVariablesNamesOfEachRPA,
                    });
                }
            }
        })
    }


    //allows RPA to find varaibles from attached components 
    assignNodeNamesToEachEnd() {
        let newEndLoopFromNodesNames = {}
        this.state.nodes.forEach(EndNode => {
            if (EndNode.type === 'End') {
                let id = EndNode.id
                let isNode = false
                let finished = false
                let foundElement = null
                let myEndLoopFromNodesNames = []

                while (!finished) {
                    if (!isNode) {
                        // eslint-disable-next-line
                        foundElement = this.state.edges.find(element => element.target === id)
                        if (foundElement) {
                            id = foundElement.source
                        }
                        else {
                            finished = true
                        }
                        isNode = true
                    }
                    else {
                        // eslint-disable-next-line
                        foundElement = this.state.nodes.find(element => element.id === id)
                        if (foundElement.type === 'Handler') {
                            finished = true
                        }
                        else {
                            // if (this.handleRightDrawerCheckIfPreviousNodeIsABranchsNode(foundElement)) {
                            if (foundElement.data.loopFromSwitch && foundElement.data.loopFromName && foundElement.data.loopFromName.trim()) {
                                myEndLoopFromNodesNames = [...myEndLoopFromNodesNames, foundElement.data.loopFromName]
                            }
                            // }
                        }

                        if (foundElement) {
                            id = foundElement.id
                        }
                        else {
                            finished = true
                        }
                        isNode = false
                    }
                }
                // console.log('myEndLoopFromNodesNames', myEndLoopFromNodesNames)
                if (myEndLoopFromNodesNames) {
                    if (myEndLoopFromNodesNames.length > 0) {
                        newEndLoopFromNodesNames = { ...newEndLoopFromNodesNames, [EndNode.id]: [...myEndLoopFromNodesNames, 'None'] }
                    }
                    else {
                        newEndLoopFromNodesNames = { ...newEndLoopFromNodesNames, [EndNode.id]: ['None'] }
                    }
                    // console.log('newEndLoopFromNodesNames', newEndLoopFromNodesNames)
                    this.setState({
                        endLoopFromNodesNames: newEndLoopFromNodesNames,
                    });
                }
            }
        })
    }
    ///CREATE/FLOW/OBJECT/////////////////////////////////////////////////////////////////////////
    // when apply clicked convert the flow to object
    createFlowObject() {
        //let variablesNames = ['None', 'Teams_name', 'Teams_id', 'Teams_email'];
        this.state.nodes.forEach((element) => {
            let obj1 = null;
            let obj2 = null;
            let obj3 = null;


            if (element.type === 'Handler') {

                this.setState((prevState) => ({
                    flow: {
                        firstComponent: element.id,
                        cancel: element.data.cancel.trim(),
                        restart: element.data.restart.trim(),
                        greet: element.data.greet.trim(),
                        bye: element.data.bye.trim(),
                        'thank you': element.data.thankYou.trim(),
                    }
                }));

                obj1 = {
                    type: 'handler',
                }

                let allConditions = [];

                element.data.dynamicDataHandler.forEach((dynamicDataHandlerObj, index) => {
                    let innerConditions = null;
                    let conditions = [];
                    let luisConditions = [];
                    let variableConditions = [];

                    dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj) => {
                        if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                            let obj = {
                                value: innerDynamicDataHandlerObj.value.trim(),
                                save: false,
                            }
                            if (innerDynamicDataHandlerObj.save) {
                                obj = {
                                    ...obj,
                                    save: true,
                                    variableName: innerDynamicDataHandlerObj.variableName.trim(),
                                }
                            }
                            conditions = conditions.concat(obj)
                        }
                        else if (innerDynamicDataHandlerObj.choice === 'AI NLP') {
                            let entities = []
                            innerDynamicDataHandlerObj.entities.forEach((entity) => {
                                entities = entities.concat({
                                    name: entity.name,
                                    keyword: entity.any ? 'Any' : entity.value.trim()
                                })

                            })
                            if (!entities.length) {
                                entities = []
                            }
                            luisConditions = luisConditions.concat({ intent: innerDynamicDataHandlerObj.intent, entities: entities })
                        }
                        else if (innerDynamicDataHandlerObj.choice === 'Variable') {
                            variableConditions = variableConditions.concat({
                                value: innerDynamicDataHandlerObj.value.trim(),
                                operator: innerDynamicDataHandlerObj.operator,
                            })
                        }
                    })

                    if (conditions.length !== 0) {
                        innerConditions = {
                            ...innerConditions,
                            conditions: conditions,
                        }
                    }
                    if (luisConditions.length !== 0) {
                        innerConditions = {
                            ...innerConditions,
                            luisConditions: luisConditions,
                        }
                    }
                    if (variableConditions.length !== 0) {
                        innerConditions = {
                            ...innerConditions,
                            variableConditions: variableConditions,
                        }
                    }
                    if (innerConditions !== null) {
                        allConditions = allConditions.concat({
                            ...innerConditions,
                            next: this.getNext(element.id, (index + 1) + ''),
                        })
                    }

                })
                if (allConditions.length > 0) {
                    allConditions = allConditions.concat({
                        defaultDialog: 'defaultDialog',
                        next: this.getNext(element.id, '0')
                    })

                    obj1 = { ...obj1, allConditions: allConditions }
                }
                else {
                    obj1 = {
                        ...obj1,
                        next: this.getNext(element.id, '0'),
                        nextflag: this.handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(element, '0'),
                    }
                }
            }
            else if (element.type === 'Message') {

                if (!element.data.advanced) {
                    obj1 = {
                        type: 'message',
                        message: element.data.botSays.trim(),
                        next: this.getNext(element.id, '0'),
                        nextflag: this.handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(element, '0'),
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

                    let allConditions = [];

                    element.data.dynamicDataHandler.forEach((dynamicDataHandlerObj, index) => {
                        let innerConditions = null;
                        let conditions = [];
                        let luisConditions = [];
                        let variableConditions = [];

                        dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj) => {
                            if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                                let obj = {
                                    value: innerDynamicDataHandlerObj.value.trim(),
                                    save: false,
                                }
                                if (innerDynamicDataHandlerObj.save) {
                                    obj = {
                                        ...obj,
                                        save: true,
                                        variableName: innerDynamicDataHandlerObj.variableName.trim(),
                                    }
                                }
                                conditions = conditions.concat(obj)
                            }
                            else if (innerDynamicDataHandlerObj.choice === 'AI NLP') {
                                let entities = []
                                innerDynamicDataHandlerObj.entities.forEach((entity) => {
                                    entities = entities.concat({
                                        name: entity.name,
                                        keyword: entity.any ? 'Any' : entity.value.trim()
                                    })

                                })
                                if (!entities.length) {
                                    entities = []
                                }
                                luisConditions = luisConditions.concat({ intent: innerDynamicDataHandlerObj.intent, entities: entities })
                            }
                            else if (innerDynamicDataHandlerObj.choice === 'Variable') {
                                variableConditions = variableConditions.concat({
                                    value: innerDynamicDataHandlerObj.value.trim(),
                                    operator: innerDynamicDataHandlerObj.operator,
                                })
                            }
                        })

                        if (conditions.length !== 0) {
                            innerConditions = {
                                ...innerConditions,
                                conditions: conditions,
                            }
                        }
                        if (luisConditions.length !== 0) {
                            innerConditions = {
                                ...innerConditions,
                                luisConditions: luisConditions,
                            }
                        }
                        if (variableConditions.length !== 0) {
                            innerConditions = {
                                ...innerConditions,
                                variableConditions: variableConditions,
                            }
                        }
                        if (innerConditions !== null) {
                            allConditions = allConditions.concat({
                                ...innerConditions,
                                next: this.getNext(element.id, (index + 1) + '')
                            })
                        }

                    })

                    if (allConditions.length > 0) {
                        allConditions = allConditions.concat({
                            defaultDialog: 'defaultDialog',
                            next: this.getNext(element.id, '0')
                        })
                        obj2 = { ...obj2, allConditions: allConditions }
                    }
                    else {
                        obj2 = {
                            ...obj2,
                            next: this.getNext(element.id, '0'),
                            nextflag: this.handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(element, '0'),
                        }
                    }
                }
            }
            else if ((element.type === 'NumberPrompt') || (element.type === 'DatePrompt')) {
                let type = 'numberPrompt'
                let conditions = []

                if (element.type === 'DatePrompt') {
                    type = 'datePrompt'
                }

                obj1 = {
                    type: type,
                    message: element.data.botSays.trim(),
                    errorMessage: element.data.errorMessage.trim(),
                    next: element.id + '-handler'
                }

                obj2 = {
                    type: "handler",
                    save: false,
                }

                element.data.dynamicDataHandler.forEach((obj, index) => {
                    conditions = conditions.concat({
                        operator: obj.operator,
                        value: obj.value.trim(),
                        next: this.getNext(element.id, (index + 1) + '')
                    })
                })
                if (conditions.length > 0) {
                    conditions = conditions.concat({
                        default: 'default',
                        next: this.getNext(element.id, '0')
                    })
                    obj2 = {
                        ...obj2,
                        conditions: conditions,
                        nextflag: true,
                    }
                }
                else {
                    obj2 = {
                        ...obj2,
                        next: this.getNext(element.id, '0'),
                        nextflag: this.handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(element, '0'),
                    }
                }


                if (element.data.save) {
                    obj2 = {
                        ...obj2,
                        save: element.data.save,
                        name: element.data.variableName.trim(),
                    }
                }
            }

            else if (element.type === 'ConfirmPrompt') {
                obj1 = {
                    type: 'confirmPrompt',
                    message: element.data.botSays.trim(),
                    errorMessage: element.data.errorMessage.trim(),
                    next: element.id + '-handler'
                }
                obj2 = {
                    type: "handler",
                    save: false,
                    cases: { true: this.getNext(element.id, '0'), false: this.getNext(element.id, '1') }
                }

                if (element.data.save) {
                    obj2 = {
                        ...obj2,
                        save: true,
                        name: element.data.variableName.trim(),
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
                        [obj.text.trim()]: this.getNext(element.id, (index + 1) + '')
                    }
                })

                cases = {
                    ...cases,
                    Other: element.id + '-handler-2',
                }

                let allConditions = [];

                element.data.dynamicDataHandler.forEach((dynamicDataHandlerObj, index) => {
                    let innerConditions = null;
                    let conditions = [];
                    let luisConditions = [];
                    let variableConditions = [];

                    dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj) => {
                        if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                            let obj = {
                                value: innerDynamicDataHandlerObj.value.trim(),
                                save: false,
                            }
                            if (innerDynamicDataHandlerObj.save) {
                                obj = {
                                    ...obj,
                                    save: true,
                                    variableName: innerDynamicDataHandlerObj.variableName.trim(),
                                }
                            }
                            conditions = conditions.concat(obj)
                        }
                        else if (innerDynamicDataHandlerObj.choice === 'AI NLP') {
                            let entities = []
                            innerDynamicDataHandlerObj.entities.forEach((entity) => {
                                entities = entities.concat({
                                    name: entity.name,
                                    keyword: entity.any ? 'Any' : entity.value.trim()
                                })

                            })
                            if (!entities.length) {
                                entities = []
                            }
                            luisConditions = luisConditions.concat({ intent: innerDynamicDataHandlerObj.intent, entities: entities })
                        }
                        else if (innerDynamicDataHandlerObj.choice === 'Variable') {
                            variableConditions = variableConditions.concat({
                                value: innerDynamicDataHandlerObj.value.trim(),
                                operator: innerDynamicDataHandlerObj.operator,
                            })
                        }
                    })

                    if (conditions.length !== 0) {
                        innerConditions = {
                            ...innerConditions,
                            conditions: conditions,
                        }
                    }
                    if (luisConditions.length !== 0) {
                        innerConditions = {
                            ...innerConditions,
                            luisConditions: luisConditions,
                        }
                    }
                    if (variableConditions.length !== 0) {
                        innerConditions = {
                            ...innerConditions,
                            variableConditions: variableConditions,
                        }
                    }
                    if (innerConditions !== null) {
                        allConditions = allConditions.concat({
                            ...innerConditions,
                            next: this.getNext(element.id, 'h-' + (index + 1))
                        })
                    }

                })
                if (allConditions.length > 0) {
                    allConditions = allConditions.concat({
                        defaultDialog: 'defaultDialog',
                        next: this.getNext(element.id, '0')
                    })
                    obj3 = { ...obj3, allConditions: allConditions }
                }
                else {
                    obj3 = { ...obj3, next: this.getNext(element.id, '0') }
                }

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

            else if (element.type === 'WebListCard') {
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
                        [obj.text.trim()]: this.getNext(element.id, (index + 1) + '')
                    }
                })

                cases = {
                    ...cases,
                    Other: element.id + '-handler-2',
                }

                let allConditions = [];

                element.data.dynamicDataHandler.forEach((dynamicDataHandlerObj, index) => {
                    let innerConditions = null;
                    let conditions = [];
                    let luisConditions = [];
                    let variableConditions = [];

                    dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj) => {
                        if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                            let obj = {
                                value: innerDynamicDataHandlerObj.value.trim(),
                                save: false,
                            }
                            if (innerDynamicDataHandlerObj.save) {
                                obj = {
                                    ...obj,
                                    save: true,
                                    variableName: innerDynamicDataHandlerObj.variableName.trim(),
                                }
                            }
                            conditions = conditions.concat(obj)
                        }
                        else if (innerDynamicDataHandlerObj.choice === 'AI NLP') {
                            let entities = []
                            innerDynamicDataHandlerObj.entities.forEach((entity) => {
                                entities = entities.concat({
                                    name: entity.name,
                                    keyword: entity.any ? 'Any' : entity.value.trim()
                                })

                            })
                            if (!entities.length) {
                                entities = []
                            }
                            luisConditions = luisConditions.concat({ intent: innerDynamicDataHandlerObj.intent, entities: entities })
                        }
                        else if (innerDynamicDataHandlerObj.choice === 'Variable') {
                            variableConditions = variableConditions.concat({
                                value: innerDynamicDataHandlerObj.value.trim(),
                                operator: innerDynamicDataHandlerObj.operator,
                            })
                        }
                    })

                    if (conditions.length !== 0) {
                        innerConditions = {
                            ...innerConditions,
                            conditions: conditions,
                        }
                    }
                    if (luisConditions.length !== 0) {
                        innerConditions = {
                            ...innerConditions,
                            luisConditions: luisConditions,
                        }
                    }
                    if (variableConditions.length !== 0) {
                        innerConditions = {
                            ...innerConditions,
                            variableConditions: variableConditions,
                        }
                    }
                    if (innerConditions !== null) {
                        allConditions = allConditions.concat({
                            ...innerConditions,
                            next: this.getNext(element.id, 'h-' + (index + 1))
                        })
                    }

                })
                if (allConditions.length > 0) {
                    allConditions = allConditions.concat({
                        defaultDialog: 'defaultDialog',
                        next: this.getNext(element.id, '0')
                    })
                    obj3 = { ...obj3, allConditions: allConditions }
                }
                else {
                    obj3 = { ...obj3, next: this.getNext(element.id, '0') }
                }

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
                    type: 'webListCard',
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
            else if (element.type === 'ListCard') {
                let btns = []
                let cases = {}

                obj2 = {
                    type: "handler",
                }

                obj3 = {
                    type: "handler",
                }

                element.data.formData.forEach((obj, index) => {
                    let obji = {
                        text: obj.text.trim(),
                        icon: obj.icon || null,
                    }
                    if (obj.urlSwitch) {
                        obji = { ...obji, url: obj.url.trim() }
                    }
                    btns = btns.concat(obji)

                    if (!obj.urlSwitch) {
                        cases = {
                            ...cases,
                            [obj.text]: this.getNext(element.id, (index + 1) + '')
                        }
                    }
                })

                cases = {
                    ...cases,
                    Other: element.id + '-handler-2',
                }

                let allConditions = [];

                element.data.dynamicDataHandler.forEach((dynamicDataHandlerObj, index) => {
                    let innerConditions = null;
                    let conditions = [];
                    let luisConditions = [];
                    let variableConditions = [];

                    dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj) => {
                        if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                            let obj = {
                                value: innerDynamicDataHandlerObj.value.trim(),
                                save: false,
                            }
                            if (innerDynamicDataHandlerObj.save) {
                                obj = {
                                    ...obj,
                                    save: true,
                                    variableName: innerDynamicDataHandlerObj.variableName.trim(),
                                }
                            }
                            conditions = conditions.concat(obj)
                        }
                        else if (innerDynamicDataHandlerObj.choice === 'AI NLP') {
                            let entities = []
                            innerDynamicDataHandlerObj.entities.forEach((entity) => {
                                entities = entities.concat({
                                    name: entity.name,
                                    keyword: entity.any ? 'Any' : entity.value.trim()
                                })

                            })
                            if (!entities.length) {
                                entities = []
                            }
                            luisConditions = luisConditions.concat({ intent: innerDynamicDataHandlerObj.intent, entities: entities })
                        }
                        else if (innerDynamicDataHandlerObj.choice === 'Variable') {
                            variableConditions = variableConditions.concat({
                                value: innerDynamicDataHandlerObj.value.trim(),
                                operator: innerDynamicDataHandlerObj.operator,
                            })
                        }
                    })

                    if (conditions.length !== 0) {
                        innerConditions = {
                            ...innerConditions,
                            conditions: conditions,
                        }
                    }
                    if (luisConditions.length !== 0) {
                        innerConditions = {
                            ...innerConditions,
                            luisConditions: luisConditions,
                        }
                    }
                    if (variableConditions.length !== 0) {
                        innerConditions = {
                            ...innerConditions,
                            variableConditions: variableConditions,
                        }
                    }
                    if (innerConditions !== null) {
                        allConditions = allConditions.concat({
                            ...innerConditions,
                            next: this.getNext(element.id, 'h-' + (index + 1))
                        })
                    }

                })
                if (allConditions.length > 0) {
                    allConditions = allConditions.concat({
                        defaultDialog: 'defaultDialog',
                        next: this.getNext(element.id, '0')
                    })
                    obj3 = {
                        ...obj3,
                        allConditions: allConditions,
                    }
                }
                else {
                    obj3 = {
                        ...obj3,
                        next: this.getNext(element.id, '0'),
                    }
                }

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
                    type: 'listCard',
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
                //let newRPAVariables = {}
                let vars = {}

                obj1 = {
                    ...obj1,
                    name: element.data.label,
                }

                //newRPAVariables = { ...element.data.rpaVariables }//.filter(vari => Object.keys(vari)[0] !== 'None');

                if (element.data.rpaVariables.length > 0) {
                    element.data.rpaVariables.forEach((rpaV, i) => {
                        //console.log('rpaV', rpaV)
                        //console.log('Object.keys(rpaV)[0]', Object.keys(rpaV)[0])
                        //delete v['asVariable']
                        //let vKey = v[Object.keys(v)[0]]
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
                                // console.log(key + " -> " + newRightSideStaticData[key].value);
                                cases = {
                                    ...cases,
                                    [element.data.outputs[key]]: this.getNext(element.id, (index) + '')
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
                            next: this.getNext(element.id, '-1'),
                            nextflag: this.handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(element, '-1'),
                        }

                    }
                }
            }
            else if (element.type === 'KnowledgeBase') {
                obj1 = {
                    type: 'knowledgeBase',
                    limit: element.data.limit,
                    score: element.data.score,
                    cases: { true: this.getNext(element.id, '0'), false: this.getNext(element.id, '1') }
                }
            }
            else if (element.type === 'RPAList') {
                obj1 = {
                    type: 'RpaList',
                    ticket_list: element.data.ticketList,
                    next: element.id + '-handler'
                }
                obj2 = {
                    type: "RpaHandler",
                    save: false,
                    next: this.getNext(element.id, '-1'),
                    nextflag: this.handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(element, '-1'),
                }
                if (element.data.save) {
                    obj2 = {
                        ...obj2,
                        save: element.data.save,
                        name: element.data.variableName.trim(),
                    }
                }
            }
            else if (element.type === 'End') {
                obj1 = {
                    type: 'endDialog',
                    message: element.data.botSays.trim(),
                    loopFrom: this.handleRightDrawerCheckIfLoopFromNameAlreadyExists(element),
                }
            }
            else if (element.type === 'Card') {
                obj1 = {
                    type: 'card',
                    payload: element.data.payload,
                    next: this.getNext(element.id, '-1'),
                    nextflag: this.handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(element, '-1'),
                }

                if (element.data.name === "RPA Result Card Display") {
                    obj1 = {
                        ...obj1,
                        ticket_details: element.data.ticketDetails,
                    }
                }
                if (element.data.variables && element.data.variables.length > 0) {
                    obj1 = {
                        ...obj1,
                        type: 'cardWithHandler',
                        next: element.id + '-handler'
                    }

                    obj2 = {
                        type: 'handler',
                        next: this.getNext(element.id, '-1'),
                        nextflag: this.handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(element, '-1'),
                    }
                }
            }
            else {
                obj1 = null;
                obj2 = null;
                obj3 = null;
            }

            if (obj1 !== null) {
                this.setState((prevState) => ({
                    flow: { ...prevState.flow, [element.id]: obj1 },
                }));
                if (obj2 !== null) {
                    this.setState((prevState) => ({
                        flow: { ...prevState.flow, [obj1.next]: obj2 },
                    }));
                    if (obj3 !== null) {
                        this.setState((prevState) => ({
                            flow: { ...prevState.flow, [obj2.cases.Other]: obj3 },
                        }));
                    }
                }
            }

        })
    }

    ///get the IDs of next connected components
    getNext(source, sourceHandle) {
        // console.log(source, sourceHandle)

        let target = null
        this.state.edges.forEach((element) => {

            if (element.source === source) {
                if (sourceHandle === '-1') {
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

    handleFlowZoneCheckIfAllHandlesAreConnected() {
        let allAreConnected = true

        this.state.nodes.forEach((element) => {
            if (element.type === 'Handler') {
                let allAreSources = true

                let isDefaultSource = this.state.edges.find(edge => ((element.id === edge.source) && edge.sourceHandle === '0'))

                if (!isDefaultSource) {
                    allAreSources = false
                }

                element.data.dynamicDataHandler.forEach((elt, index) => {
                    let isSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === (index + 1) + '')

                    if (!isSource) {
                        allAreSources = false
                    }
                })

                if (!allAreSources) {
                    allAreConnected = false
                }
            }
            else if (element.type === 'RPAList' || element.type === 'Card') {
                let isSource = false
                this.state.edges.forEach((edge) => {
                    if ((element.id === edge.source)) {
                        isSource = true
                    }
                })

                if (!isSource) {
                    allAreConnected = false
                }

                let isTarget = false
                this.state.edges.forEach((edge) => {
                    if ((element.id === edge.target)) {
                        isTarget = true
                    }
                })

                if (!isTarget) {
                    allAreConnected = false
                }
            }
            else if (element.type === 'Message' || element.type === 'DatePrompt' || element.type === 'NumberPrompt') {
                let allAreSources = true

                let isDefaultSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '0')

                if (!isDefaultSource) {
                    allAreSources = false
                }
                element.data.dynamicDataHandler.forEach((elt, index) => {
                    let isSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === (index + 1) + '')

                    if (!isSource) {
                        allAreSources = false
                    }
                })

                if (!allAreSources) {
                    allAreConnected = false
                }

                let isTarget = this.state.edges.find(edge => (element.id === edge.target))

                if (!isTarget) {
                    allAreConnected = false
                }
            }
            else if (element.type === 'ConfirmPrompt' || element.type === 'KnowledgeBase') {
                let isSourceOnHandle0 = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '0')
                let isSourceOnHandle1 = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '1')

                if (!isSourceOnHandle0 || !isSourceOnHandle1) {
                    allAreConnected = false
                }

                let isTarget = this.state.edges.find(edge => (element.id === edge.target))

                if (!isTarget) {
                    allAreConnected = false
                }
            }
            else if (element.type === 'ChoicePrompt') {
                let allAreSources = true

                element.data.formData.forEach((elt, index) => {
                    let isSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === (index + 1) + '')

                    if (!isSource) {
                        allAreSources = false
                    }
                })

                let isDefaultSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '0')

                if (!isDefaultSource) {
                    allAreSources = false
                }

                element.data.dynamicDataHandler.forEach((elt, index) => {
                    let isSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === 'h-' + (index + 1))

                    if (!isSource) {
                        allAreSources = false
                    }
                })

                if (!allAreSources) {
                    allAreConnected = false
                }

                let isTarget = this.state.edges.find(edge => (element.id === edge.target))

                if (!isTarget) {
                    allAreConnected = false
                }
            }
            else if (element.type === 'WebListCard') {
                let allAreSources = true

                element.data.formData.forEach((elt, index) => {
                    let isSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === (index + 1) + '')

                    if (!isSource) {
                        allAreSources = false
                    }
                })

                let isDefaultSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '0')

                if (!isDefaultSource) {
                    allAreSources = false
                }

                element.data.dynamicDataHandler.forEach((elt, index) => {
                    let isSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === 'h-' + (index + 1))

                    if (!isSource) {
                        allAreSources = false
                    }
                })

                if (!allAreSources) {
                    allAreConnected = false
                }

                let isTarget = this.state.edges.find(edge => (element.id === edge.target))

                if (!isTarget) {
                    allAreConnected = false
                }
            }
            else if (element.type === 'ListCard') {
                let allAreSources = true

                element.data.formData.forEach((elt, index) => {
                    if (!elt.urlSwitch) {
                        let isSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === (index + 1) + '')

                        if (!isSource) {
                            allAreSources = false
                        }
                    }
                })

                let isDefaultSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === '0')

                if (!isDefaultSource) {
                    allAreSources = false
                }

                element.data.dynamicDataHandler.forEach((elt, index) => {
                    let isSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === 'h-' + (index + 1))

                    if (!isSource) {
                        allAreSources = false
                    }
                })

                if (!allAreSources) {
                    allAreConnected = false
                }

                let isTarget = this.state.edges.find(edge => (element.id === edge.target))

                if (!isTarget) {
                    allAreConnected = false
                }
            }
            else if (element.type === 'End') {
                let isTarget = this.state.edges.find(edge => (element.id === edge.target))

                if (!isTarget) {
                    allAreConnected = false
                }

            }
            else if (element.type === 'RPA') {
                let allAreSources = true

                if (element.data.outputs) {
                    if (Object.keys(element.data.outputs).length > 0) {
                        // eslint-disable-next-line
                        Array.from(Array(Object.keys(element.data.outputs).length), (e, index) => {
                            let isSource = this.state.edges.find(edge => (element.id === edge.source) && edge.sourceHandle === index + '')

                            if (!isSource) {
                                allAreSources = false
                            }
                        })

                        if (!allAreSources) {
                            allAreConnected = false
                        }
                    }
                    else {
                        let isSource = this.state.edges.find(edge => (element.id === edge.source))

                        if (!isSource) {
                            allAreSources = false
                        }

                        if (!allAreSources) {
                            allAreConnected = false
                        }
                    }
                }

                let isTarget = this.state.edges.find(edge => (element.id === edge.target))

                if (!isTarget) {
                    allAreConnected = false
                }
            }

        })

        return allAreConnected
    }

    //Canvas events functions
    // component remove when selected and backspace pressed
    onElementRemove = () => {
        if (this.state.clickedElement) {

            this.handleRightDrawerClose()

            const removeNodeAndEdges = (nodeToRemove, nodes, edges) => {
                const connectedEdges = getConnectedEdges([nodeToRemove], edges);
                const updatedNodes = nodes.filter(n => n.id !== nodeToRemove.id);
                const updatedEdges = edges.filter(e => !connectedEdges.some(ce => ce.id === e.id));

                return { nodes: updatedNodes, edges: updatedEdges };
            };
            this.setState((prevState) => (removeNodeAndEdges(this.state.clickedElement, this.prevState.nodes, this.prevState.edges)))
            this.handleSnackBarMessageOpen('Component Removed Successfully', '#68b04b', 1500)
        }
    };

    // when 2 components are connnected
    onConnect = (params) => {
        console.log({params});
        if (params.source === params.target) {
            this.handleSnackBarMessageOpen("Couldn't connect component with itself !", '#ce3a32', 3000)
        }
        else {
            let isSource = this.state.edges.find(element => element.source === params.source && element.sourceHandle === params.sourceHandle)

            if (isSource) {
                this.handleSnackBarMessageOpen("Source already connected !", '#ce3a32', 3000)
            }
            else {
                let sourceElement = this.state.nodes.find(element => element.id === params.source)
                if (sourceElement.type === 'ListCard' &&
                    !params.sourceHandle.startsWith('h-') &&
                    params.sourceHandle !== '0' &&
                    sourceElement.data.formData[parseInt(params.sourceHandle) - 1].urlSwitch) {
                    this.handleSnackBarMessageOpen("Source can not be connencted, Please disable URL so you can connect !", '#ce3a32', 4000)
                }
                else {
                    let edgeColor = sourceElement.data.color
                    console.log({eddd: addEdge(
                        {
                            ...params,
                            arrowHeadType: "arrowclosed",
                            type: "default" ,
                            markerEnd: { type: MarkerType.ArrowClosed },
                            style: { stroke: "#afafb5", strokeWidth: 2 },
                          },
                        this.state.edges
                    )});
                    this.setState((prevState) => ({
                        edges: addEdge(
                            {
                                ...params,
                                arrowHeadType: "arrowclosed",
                                type: "default" ,
                                markerEnd: { type: MarkerType.ArrowClosed },
                                style: { stroke: "#afafb5", strokeWidth: 2 },
                              },
                            prevState.edges
                        )
                    }))
                }
            }
        }
    };

    // when canvas moved or zoomed
    onMoveEnd = (transform) => {
        /* console.log('zoom/move endd', transform); */
        if (transform)
            this.setState({
                zoomAndMoveValues: { x: transform.x, y: transform.y, zoom: transform.zoom }
            })
    };

    onNodeDragStop = (event, node) => {
        //console.log('drag stop', node);
        const elementsIndex = this.state.nodes
            .findIndex(element => element.id === node.id)

        let newArray = [...this.state.nodes]

        newArray[elementsIndex] = {
            ...newArray[elementsIndex],
            position: { x: node.position.x, y: node.position.y }
        }

        this.setState({
            nodes: newArray,
        });
    }


    onSelectionContextMenu = (event, nodes) => {
        event.preventDefault();
        // console.log('selection context menu', nodes);

        // let triggerIsOneOfTheSelectedNodes = nodes.find(node => (node.type === 'Handler'))

        // if (!triggerIsOneOfTheSelectedNodes) {
        this.setState({
            mousePositionManySelectedElementMenu: { mouseX: event.clientX - 2, mouseY: event.clientY - 4 },
            // flowZoneSelectedManyElement: nodes,
            clickedElement: null,
            isRightOpen: false,
        });
        // }
    }

    onSelectionContextMenuClose = (event) => {
        this.setState({
            mousePositionManySelectedElementMenu: { mouseX: null, mouseY: null },
        });
    }

    onSelectionContextMenuDeleteSelected = (event, node) => {

        const nodeIdToRemove = this.state.IDOnSelectionContextMenu;
        const filteredData = this.state.nodes.filter(item => {
            if (item.id === nodeIdToRemove) {
                return false;
            }
            if (item.source === nodeIdToRemove || item.target === nodeIdToRemove) {
                return false;
            }
            return true;
        });
        this.setState({
            nodes: filteredData,
            mousePositionManySelectedElementMenu: { mouseX: null, mouseY: null },
        })
    }

    onSelectionDragStop = (event, nodes) => {
        // console.log('selection drag stop', nodes);
        if (nodes) {
            nodes.forEach((node) => {
                const elementsIndex = this.state.nodes
                    .findIndex(element => element.id === node.id)

                let newArray = [...this.state.nodes]

                newArray[elementsIndex] = {
                    ...newArray[elementsIndex],
                    position: { x: node.position.x, y: node.position.y }
                }

                this.setState({
                    nodes: newArray,
                });
            })
        }
    }
    /*  onLoad = (reactFlowInstance) => {
         setTimeout(
             function () {
                 //console.log('flow loaded:', reactFlowInstance);
                 //reactFlowInstance.zoomOut();
                 //reactFlowInstance.fitView();
             },
             1500
         );
 
     }; */

    onLoadWhenVersionIsChanged = () => {
        setTimeout(
            function () {
                document.getElementsByClassName("react-flow__controls-button react-flow__controls-fitview")[0].click();
                document.getElementsByClassName("react-flow__controls-button react-flow__controls-zoomout")[0].click();
                document.getElementsByClassName("react-flow__controls-button react-flow__controls-zoomout")[0].click();
            },
            500
        );
    };

    /* onPaneClick = (event) => {
        this.setState({
            clickedElement: null,
        });
    } */

    onElementClick = (event, element) => {
        if (element) {
            this.setState({
                clickedElement: element,
            });
            this.handleRightDrawerOpen();
        }

    }

    onDragOver = (event, node) => {
        //console.log('drag over')
        event.preventDefault();
    };

    onDrop = (event, node) => {
        console.log({ node, event });
        /* console.log('client : ', event.clientX, ' / ' + event.clientY); */
        this.addNewElementToFlowZone(event.clientX, event.clientY);
        event.preventDefault();
        this.handleRightDrawerClose()
    };

    onHandleMenuDeleteSelected(event, element, sourceHandle) {
        event.preventDefault()

        let edgeToRemove = this.state.edges.findIndex(elt => elt.source === element.id && elt.sourceHandle === sourceHandle)

        const elementsIndex = this.state.nodes.findIndex(elt => elt.id === element.id)

        let newNodes = [...this.state.nodes]
        let newData = { ...newNodes[elementsIndex].data }
        let newMousePositionHandleMenu = null

        newMousePositionHandleMenu = { mouseX: null, mouseY: null, handle: null }
        newData = { ...newData, mousePositionHandleMenu: newMousePositionHandleMenu }
        newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }
        newNodes.splice(edgeToRemove, 1);//remove connection

        this.setState((prevState) => ({
            nodes: newNodes,
            isRightOpen: false,
            mousePositionManySelectedElementMenu: { mouseX: null, mouseY: null },
        }))

        this.handleSnackBarMessageOpen('Connection Removed Successfully', '#68b04b', 1500)
    }

    handleRightClickOnHandleMenuOpenOrClose = (event, elementID, sourceHandle, handleID) => {
        event.preventDefault();

        let isSource = this.state.edges.find(elt => elt.source === elementID && elt.sourceHandle === sourceHandle)

        const elementsIndex = this.state.nodes.findIndex(element => element.id === elementID)

        let newNodes = [...this.state.nodes]
        let newData = { ...newNodes[elementsIndex].data }
        let newMousePositionHandleMenu = { mouseX: null, mouseY: null, handle: null }

        if (handleID && isSource) {
            newMousePositionHandleMenu = { mouseX: event.clientX - 2, mouseY: event.clientY - 4, handle: handleID }
        }
        else {
            this.handleRightDrawerClose()
        }

        newData = { ...newData, mousePositionHandleMenu: newMousePositionHandleMenu }
        newNodes[elementsIndex] = { ...newNodes[elementsIndex], data: newData }

        this.setState({ nodes: newNodes });

    };
    ///END/OF/FLOW/ZONE/FUNCTIONS////////////////////////////////////////////////////////////////////

    ///ADD/COMPONENT/TO/THE/FLOW/////////////////////////////////////////////////////////////////////
    addNewElementToFlowZone(clientX, clientY) {
        console.log({ sdss: this.state });
        if (this.state.droppedElement) {
            // this.props.setLeftDrawerWidth(this.LeftDrawerElement.current.offsetWidth)
            // this.props.setAppBarHeight(this.ApplicationBarElement.current.offsetHeight)

            const position =
            this.state.reactFlowInstance.screenToFlowPosition(
              {
                x: clientX,
                y: clientY,
              });
            let generateID = uuidv4();

            let newElement = {
                id: generateID,
                type: this.state.droppedElement.type,
                data: { label: this.state.droppedElement.name, },
                position,
            }
            let newData = { ...newElement.data }


            if (this.state.droppedElement.type !== 'Card' && this.state.droppedElement.type !== 'RPA') {// All elements except Cards and RPAs
                if (this.state.droppedElement.type === "Message") {
                    newData = { ...newData, botSays: '', advanced: false, regex: '', errorMessage: '', save: false, variableName: '', dynamicDataHandler: [], }
                }
                else if (this.state.droppedElement.type === 'DatePrompt' || this.state.droppedElement.type === 'NumberPrompt') {
                    newData = { ...newData, botSays: '', errorMessage: '', save: false, variableName: '', dynamicDataHandler: [] }
                }
                else if (this.state.droppedElement.type === "ConfirmPrompt") {
                    newData = { ...newData, botSays: '', errorMessage: '', save: false, variableName: '' }
                }
                else if (this.state.droppedElement.type === 'ChoicePrompt') {
                    newData = { ...newData, botSays: '', save: false, variableName: '', formData: [{ text: '' }], dynamicDataHandler: [] }
                }
                else if (this.state.droppedElement.type === 'WebListCard') {
                    newData = { ...newData, botSays: '', save: false, variableName: '', formData: [{ text: '' }], dynamicDataHandler: [] }
                }
                else if (this.state.droppedElement.type === 'ListCard') {
                    newData = { ...newData, botSays: '', save: false, variableName: '', formData: [{ text: '', urlSwitch: false, url: '' }], dynamicDataHandler: [] }
                }
                else if (this.state.droppedElement.type === "KnowledgeBase") {
                    newData = { ...newData, limit: this.state.limitArray[2], score: this.state.scoreArray[4] }
                }
                else if (this.state.droppedElement.type === 'RPAList') {
                    newData = { ...newData, ticketList: '', save: false, variableName: '', description: 'Display informations returned from robot server as choice list.' }
                }
                else if (this.state.droppedElement.type === "End") {
                    newData = { ...newData, botSays: '' }
                }

                newData = {
                    ...newData, color: this.state.droppedElement.color, icon: this.state.droppedElement.icon,
                    loopFromSwitch: false, loopFromName: this.state.droppedElement.type === "End" ? 'None' : '',
                    // onHandleMenuDeleteSelected: this.onHandleMenuDeleteSelected,
                    // handleRightClickOnHandleMenuOpenOrClose: this.handleRightClickOnHandleMenuOpenOrClose,
                    // onSelectionContextMenu: this.onSelectionContextMenu,
                    mousePositionHandleMenu: this.state.mousePositionHandleMenu,
                }
            }
            else if (this.state.droppedElement.type === 'Card') {
                newData = {
                    label: 'Card',
                    name: this.state.droppedElement.cardname,
                    payload: this.state.droppedElement.cardDetails,
                    color: '#607D8B',
                    icon: 'InsertDriveFile',
                    // withHandler: this.state.droppedElement.withHandler,
                    variables: this.state.droppedElement.variables,
                    // onHandleMenuDeleteSelected: this.onHandleMenuDeleteSelected,
                    // handleRightClickOnHandleMenuOpenOrClose: this.handleRightClickOnHandleMenuOpenOrClose,
                    // onSelectionContextMenu: this.onSelectionContextMenu,
                    mousePositionHandleMenu: this.state.mousePositionHandleMenu,
                }
            }
            else if (this.state.droppedElement.type === 'RPA') {
                let rpaVariables = []
                if (this.state.droppedElement.inputs) {
                    Object.keys(this.state.droppedElement.inputs).map((key, index) => {
                        return (
                            rpaVariables = rpaVariables.concat({ [key]: this.state.droppedElement.inputs[key], asVariable: false })
                        )
                    })
                }
                newData = {
                    ...newData,
                    label: this.state.droppedElement.name,
                    inputs: { ...this.state.droppedElement.inputs, None: 'None' },
                    outputs: { ...this.state.droppedElement.outputs },
                    rpaOutputs: this.state.droppedElement.rpaoutputs && this.state.droppedElement.rpaoutputs.length > 0 ? [...this.state.droppedElement.rpaoutputs] : [],
                    variables: { ...this.state.droppedElement.variables },
                    icon: "DeviceHub",
                    color: "#8f8f8f",
                    token: this.state.droppedElement.token,
                    rpaVariables: rpaVariables,
                    // onHandleMenuDeleteSelected: this.onHandleMenuDeleteSelected,
                    // handleRightClickOnHandleMenuOpenOrClose: this.handleRightClickOnHandleMenuOpenOrClose,
                    // onSelectionContextMenu: this.onSelectionContextMenu,
                    mousePositionHandleMenu: this.state.mousePositionHandleMenu,
                }
            }

            newElement = { ...newElement, data: newData }
            console.log({ newElement });
            this.setState((prevState) => ({
                nodes: prevState.nodes.concat(newElement),
                droppedElement: null
            }));
        }
    }

    ///START/OF/HANDLE/RIGHT/DRWAWER/FUNCTIONS/////////////////////////////////////////////////////
    //check if all required inputs are filled
    handleSaveFormDialogCheckIfAllRequiredDataAreFilledForEachElement() {

        let allInputsAreFilled = true

        this.state.nodes.forEach((element) => {

            if (element.type === 'Handler') {
                if (!element.data.greet || !element.data.restart || !element.data.thankYou || !element.data.cancel || !element.data.bye) {
                    allInputsAreFilled = false
                }

                element.data.dynamicDataHandler.forEach((dynamicDataHandlerObj) => {
                    dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj) => {
                        if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                            if (!innerDynamicDataHandlerObj.value || (innerDynamicDataHandlerObj.save && !innerDynamicDataHandlerObj.variableName)) {
                                allInputsAreFilled = false
                            }
                        }
                        else if (innerDynamicDataHandlerObj.choice === 'AI NLP') {
                            innerDynamicDataHandlerObj.entities.forEach((entity) => {
                                if (!entity.any && !entity.value) {
                                    allInputsAreFilled = false
                                }
                            })

                        }
                        else if (innerDynamicDataHandlerObj.choice === 'Variable') {
                            if (!innerDynamicDataHandlerObj.value) {
                                allInputsAreFilled = false
                            }
                        }
                    })
                })
            }
            else if (element.type === 'Message') {
                if (!element.data.botSays) {
                    allInputsAreFilled = false
                }

                if (element.data.advanced) {
                    if (element.data.regex && !element.data.errorMessage) {
                        allInputsAreFilled = false
                    }

                    if (element.data.save && !element.data.variableName) {
                        allInputsAreFilled = false
                    }

                    element.data.dynamicDataHandler.forEach((dynamicDataHandlerObj) => {
                        dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj) => {
                            if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                                if (!innerDynamicDataHandlerObj.value || (innerDynamicDataHandlerObj.save && !innerDynamicDataHandlerObj.variableName)) {
                                    allInputsAreFilled = false
                                }
                            }
                            else if (innerDynamicDataHandlerObj.choice === 'AI NLP') {
                                innerDynamicDataHandlerObj.entities.forEach((entity) => {
                                    if (!entity.any && !entity.value) {
                                        allInputsAreFilled = false
                                    }
                                })

                            }
                            else if (innerDynamicDataHandlerObj.choice === 'Variable') {
                                if (!innerDynamicDataHandlerObj.value) {
                                    allInputsAreFilled = false
                                }
                            }
                        })
                    })
                }
            }
            else if (element.type === 'DatePrompt' || element.type === 'NumberPrompt') {
                if (!element.data.botSays || !element.data.errorMessage || (element.data.save && !element.data.variableName)) {
                    allInputsAreFilled = false
                }

                element.data.dynamicDataHandler.forEach((item) => {
                    if (!item.value) {
                        allInputsAreFilled = false
                    }
                })
            }
            else if (element.type === 'ConfirmPrompt') {
                if (!element.data.botSays || !element.data.errorMessage || (element.data.save && !element.data.variableName)) {
                    allInputsAreFilled = false
                }
            }
            else if (element.type === 'ChoicePrompt') {
                if (!element.data.botSays) {
                    allInputsAreFilled = false
                }

                element.data.formData.forEach((item) => {
                    if (!item.text) {
                        allInputsAreFilled = false
                    }
                })

                if (element.data.save && !element.data.variableName) {
                    allInputsAreFilled = false
                }

                element.data.dynamicDataHandler.forEach((dynamicDataHandlerObj) => {
                    dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj) => {
                        if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                            if (!innerDynamicDataHandlerObj.value || (innerDynamicDataHandlerObj.save && !innerDynamicDataHandlerObj.variableName)) {
                                allInputsAreFilled = false
                            }
                        }
                        else if (innerDynamicDataHandlerObj.choice === 'AI NLP') {
                            innerDynamicDataHandlerObj.entities.forEach((entity) => {
                                if (!entity.any && !entity.value) {
                                    allInputsAreFilled = false
                                }
                            })

                        }
                        else if (innerDynamicDataHandlerObj.choice === 'Variable') {
                            if (!innerDynamicDataHandlerObj.value) {
                                allInputsAreFilled = false
                            }
                        }
                    })
                })
            }
            else if (element.type === 'WebListCard') {
                if (!element.data.botSays) {
                    allInputsAreFilled = false
                }

                element.data.formData.forEach((item) => {
                    if (!item.text) {
                        allInputsAreFilled = false
                    }
                })

                if (element.data.save && !element.data.variableName) {
                    allInputsAreFilled = false
                }

                element.data.dynamicDataHandler.forEach((dynamicDataHandlerObj) => {
                    dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj) => {
                        if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                            if (!innerDynamicDataHandlerObj.value || (innerDynamicDataHandlerObj.save && !innerDynamicDataHandlerObj.variableName)) {
                                allInputsAreFilled = false
                            }
                        }
                        else if (innerDynamicDataHandlerObj.choice === 'AI NLP') {
                            innerDynamicDataHandlerObj.entities.forEach((entity) => {
                                if (!entity.any && !entity.value) {
                                    allInputsAreFilled = false
                                }
                            })

                        }
                        else if (innerDynamicDataHandlerObj.choice === 'Variable') {
                            if (!innerDynamicDataHandlerObj.value) {
                                allInputsAreFilled = false
                            }
                        }
                    })
                })
            }
            else if (element.type === 'ListCard') {
                if (!element.data.botSays) {
                    allInputsAreFilled = false
                }

                element.data.formData.forEach((item) => {
                    if (!item.text || (item.urlSwitch && !item.url)) {
                        allInputsAreFilled = false
                    }
                })

                if (element.data.save && !element.data.variableName) {
                    allInputsAreFilled = false
                }

                element.data.dynamicDataHandler.forEach((dynamicDataHandlerObj) => {
                    dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj) => {
                        if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                            if (!innerDynamicDataHandlerObj.value || (innerDynamicDataHandlerObj.save && !innerDynamicDataHandlerObj.variableName)) {
                                allInputsAreFilled = false
                            }
                        }
                        else if (innerDynamicDataHandlerObj.choice === 'AI NLP') {
                            innerDynamicDataHandlerObj.entities.forEach((entity) => {
                                if (!entity.any && !entity.value) {
                                    allInputsAreFilled = false
                                }
                            })

                        }
                        else if (innerDynamicDataHandlerObj.choice === 'Variable') {
                            if (!innerDynamicDataHandlerObj.value) {
                                allInputsAreFilled = false
                            }
                        }
                    })
                })
            }
            else if (element.type === 'RPAList') {
                if (!element.data.ticketList) {
                    allInputsAreFilled = false
                }
                if (element.data.save && !element.data.variableName) {
                    allInputsAreFilled = false
                }
            }
            else if (element.type === 'End') {
                if (!element.data.botSays) {
                    allInputsAreFilled = false
                }
            }
            else if (element.type === 'RPA') {
                if (element.data && element.data.rpaVariables) {
                    element.data.rpaVariables.forEach((rpaVar) => {
                        //console.log('rpaVar[Object.keys(rpaVar)[0]]', rpaVar[Object.keys(rpaVar)[0]])
                        if (!rpaVar[Object.keys(rpaVar)[0]]) {
                            allInputsAreFilled = false
                        }
                    })
                }
            }
            else if (element.type === 'Card') {
                if (element.data.name === "RPA Result Card Display") {
                    if (!element.data.ticketDetails) {
                        allInputsAreFilled = false
                    }
                }
            }

        })
        return allInputsAreFilled
    }

    //Add Sub Condition or Entity 
    handleRightDrawerAddInnerCounters(event, index, innerIndex) {
        //const { name } = event.target.offsetParent //get button name

        const elementsIndex = this.state.nodes
            .findIndex(element => element.id === this.state.clickedElement.id)

        let newArray = [...this.state.nodes]
        let newData = { ...newArray[elementsIndex].data }

        let newDynamicDataHandler = [...newData.dynamicDataHandler]
        let newDynamicDataHandlerObject = { ...newDynamicDataHandler[index] }

        if (innerIndex === -1) {
            let newInnerDynamicDataHandler = [...newDynamicDataHandlerObject.innerDynamicDataHandler]
            newInnerDynamicDataHandler = newInnerDynamicDataHandler.concat({ choice: 'Keyword', value: '', save: false, variableName: '' })
            newDynamicDataHandler[index] = { innerDynamicDataHandler: newInnerDynamicDataHandler }


        } else {
            let newInnerDynamicDataHandler = [...newDynamicDataHandlerObject.innerDynamicDataHandler]
            let newInnerDynamicDataHandlerObject = { ...newInnerDynamicDataHandler[innerIndex] }
            let newInnerDynamicDataHandlerEntities = [...newInnerDynamicDataHandlerObject.entities]

            newInnerDynamicDataHandlerEntities = newInnerDynamicDataHandlerEntities.concat({ name: this.state.entities[0], value: '', any: false })
            newInnerDynamicDataHandler[innerIndex] = {
                ...newInnerDynamicDataHandler[innerIndex],
                entities: newInnerDynamicDataHandlerEntities
            }
            newDynamicDataHandler[index] = {
                ...newDynamicDataHandler[index],
                innerDynamicDataHandler: newInnerDynamicDataHandler
            }
        }
        newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }


        newArray[elementsIndex] = {
            ...newArray[elementsIndex],
            data: newData
        }

        this.setState({
            nodes: newArray,
        });

    }

    // Remove Sub Condition or Entity by its index
    handleRightDrawerSubtractInnerCounters(event, index, innerIndex, entityIndex) {
        //const { name } = event.target.offsetParent //get button name

        const elementsIndex = this.state.nodes
            .findIndex(element => element.id === this.state.clickedElement.id)

        let newArray = [...this.state.nodes]
        let newData = { ...newArray[elementsIndex].data }

        let newDynamicDataHandler = [...newData.dynamicDataHandler]
        let newDynamicDataHandlerObject = { ...newDynamicDataHandler[index] }

        if (entityIndex < 0) {
            let newInnerDynamicDataHandler = [...newDynamicDataHandlerObject.innerDynamicDataHandler]

            newInnerDynamicDataHandler.splice(innerIndex, 1)
            newDynamicDataHandler[index] = {
                innerDynamicDataHandler: newInnerDynamicDataHandler
            }
        }
        else {
            let newInnerDynamicDataHandler = [...newDynamicDataHandlerObject.innerDynamicDataHandler]
            let newInnerDynamicDataHandlerObject = { ...newInnerDynamicDataHandler[innerIndex] }
            let newInnerDynamicDataHandlerEntities = [...newInnerDynamicDataHandlerObject.entities]

            newInnerDynamicDataHandlerEntities.splice(entityIndex, 1)
            newInnerDynamicDataHandler[innerIndex] = { ...newInnerDynamicDataHandler[innerIndex], entities: newInnerDynamicDataHandlerEntities }
            newDynamicDataHandler[index] = { ...newDynamicDataHandler[index], innerDynamicDataHandler: newInnerDynamicDataHandler }
        }

        newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
        newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }

        this.setState({ nodes: newArray, });

    }

    //Add Condition or Cards
    handleRightDrawerAddCounters(event, isHandler) {
        //const { name } = event.target.offsetParent //get button name

        const elementsIndex = this.state.nodes
            .findIndex(element => element.id === this.state.clickedElement.id)

        let newArray = [...this.state.nodes]
        let newData = { ...newArray[elementsIndex].data }

        let newFormData = null
        let newDynamicDataHandler = null

        if (newArray[elementsIndex].type === 'Handler') {
            newDynamicDataHandler = [...newData.dynamicDataHandler]
            newDynamicDataHandler = newDynamicDataHandler.concat({ innerDynamicDataHandler: [{ choice: 'Keyword', value: '', save: false, variableName: '' }] })
            newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
        }
        else if (newArray[elementsIndex].type === 'Message') {
            newDynamicDataHandler = [...newData.dynamicDataHandler]
            newDynamicDataHandler = newDynamicDataHandler.concat({ innerDynamicDataHandler: [{ choice: 'Keyword', value: '', save: false, variableName: '' }] })
            newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
        }
        else if (newArray[elementsIndex].type === 'DatePrompt') {
            newDynamicDataHandler = [...newData.dynamicDataHandler]
            newDynamicDataHandler = newDynamicDataHandler.concat({ value: '', operator: this.state.operations[0] })
            newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
        }
        else if (newArray[elementsIndex].type === 'NumberPrompt') {
            newDynamicDataHandler = [...newData.dynamicDataHandler]
            newDynamicDataHandler = newDynamicDataHandler.concat({ value: '', operator: this.state.operations[0] })
            newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
        }
        else if (newArray[elementsIndex].type === 'ChoicePrompt') {
            if (!isHandler) {
                newFormData = [...newData.formData]
                newFormData = newFormData.concat({ text: '' })
                newData = { ...newData, formData: newFormData }
            }
            else {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler = newDynamicDataHandler.concat({ innerDynamicDataHandler: [{ choice: 'Keyword', value: '', save: false, variableName: '' }] })
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
            }
        }
        else if (newArray[elementsIndex].type === 'WebListCard') {
            if (!isHandler) {
                newFormData = [...newData.formData]
                newFormData = newFormData.concat({ text: '' })
                newData = { ...newData, formData: newFormData }
            }
            else {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler = newDynamicDataHandler.concat({ innerDynamicDataHandler: [{ choice: 'Keyword', value: '', save: false, variableName: '' }] })
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
            }
        }
        else if (newArray[elementsIndex].type === 'ListCard') {
            if (!isHandler) {
                newFormData = [...newData.formData]
                newFormData = newFormData.concat({ text: '', urlSwitch: false, url: '' }) //icon is missing
                newData = { ...newData, formData: newFormData }
            }
            else {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler = newDynamicDataHandler.concat({ innerDynamicDataHandler: [{ choice: 'Keyword', value: '', save: false, variableName: '' }] })
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
            }
        }

        newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }

        this.setState({ nodes: newArray, });
    }

    //Remove Condition or Card by its index
    handleRightDrawerSubtractCounters(event, index, isHandler) {
        //const { name } = event.target.offsetParent //get button name

        const elementsIndex = this.state.nodes
            .findIndex(element => element.id === this.state.clickedElement.id)

        let newArray = [...this.state.nodes]
        let newData = { ...newArray[elementsIndex].data }

        if (this.handleRightDrawerCheckIfRemovedConditionIsConnectedWhenSubtractCounters({ ...newArray[elementsIndex] }, isHandler, index)) {
            let alertMessage = isHandler ? 'Condition' : 'Choice'
            alertMessage = alertMessage + ' is connected !! To remove it, Please remove connection first.'

            this.handleSnackBarMessageOpen(alertMessage, '#ce3a32', 2000)
        }
        else {
            let newFormData = null
            let newDynamicDataHandler = null

            if (newArray[elementsIndex].type === 'Handler') {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler.splice(index, 1)
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }
                this.handleRightDrawerAdjustConnectionsWhenSubtractCounters(this.state.edges, newArray[elementsIndex].id, false, index)
            }
            else if (newArray[elementsIndex].type === 'Message') {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler.splice(index, 1)
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }
                this.handleRightDrawerAdjustConnectionsWhenSubtractCounters(this.state.edges, newArray[elementsIndex].id, false, index)
            }
            else if (newArray[elementsIndex].type === 'DatePrompt') {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler.splice(index, 1)
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }
                this.handleRightDrawerAdjustConnectionsWhenSubtractCounters(this.state.edges, newArray[elementsIndex].id, false, index)
            }
            else if (newArray[elementsIndex].type === 'NumberPrompt') {
                newDynamicDataHandler = [...newData.dynamicDataHandler]
                newDynamicDataHandler.splice(index, 1)
                newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }
                this.handleRightDrawerAdjustConnectionsWhenSubtractCounters(this.state.edges, newArray[elementsIndex].id, false, index)
            }
            else if (newArray[elementsIndex].type === 'ChoicePrompt') {
                if (!isHandler) {
                    newFormData = [...newData.formData]
                    newFormData.splice(index, 1)
                    newData = { ...newData, formData: newFormData }

                    newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }
                    this.handleRightDrawerAdjustConnectionsWhenSubtractCounters(this.state.edges, newArray[elementsIndex].id, false, index)
                }
                else {
                    newDynamicDataHandler = [...newData.dynamicDataHandler]
                    newDynamicDataHandler.splice(index, 1)
                    newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                    newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }
                    this.handleRightDrawerAdjustConnectionsWhenSubtractCounters(this.state.edges, newArray[elementsIndex].id, true, index)
                }
            }
            else if (newArray[elementsIndex].type === 'WebListCard') {
                if (!isHandler) {
                    newFormData = [...newData.formData]
                    newFormData.splice(index, 1)
                    newData = { ...newData, formData: newFormData }

                    newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }
                    this.handleRightDrawerAdjustConnectionsWhenSubtractCounters(this.state.edges, newArray[elementsIndex].id, false, index)
                }
                else {
                    newDynamicDataHandler = [...newData.dynamicDataHandler]
                    newDynamicDataHandler.splice(index, 1)
                    newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                    newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }
                    this.handleRightDrawerAdjustConnectionsWhenSubtractCounters(this.state.edges, newArray[elementsIndex].id, true, index)
                }
            }
            else if (newArray[elementsIndex].type === 'ListCard') {
                if (!isHandler) {
                    newFormData = [...newData.formData]
                    newFormData.splice(index, 1)
                    newData = { ...newData, formData: newFormData }

                    newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }
                    this.handleRightDrawerAdjustConnectionsWhenSubtractCounters(this.state.edges, newArray[elementsIndex].id, false, index)
                }
                else {
                    newDynamicDataHandler = [...newData.dynamicDataHandler]
                    newDynamicDataHandler.splice(index, 1)
                    newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }

                    newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }
                    this.handleRightDrawerAdjustConnectionsWhenSubtractCounters(this.state.edges, newArray[elementsIndex].id, true, index)
                }
            }
        }
    }

    //Adjust Connections After Removing Condition or Choice
    handleRightDrawerAdjustConnectionsWhenSubtractCounters(newArrayToAdjust, elementsId, startWithH, deletedIndex) {
        let newArray = [...newArrayToAdjust]

        newArrayToAdjust.forEach((edge, index) => {
            if (edge.source === elementsId) {
                let oldSourceHandleAsNumber = edge.sourceHandle // = parseInt(edge.sourceHandle)
                let newSourceHandle = null

                if (startWithH && edge.sourceHandle.startsWith('h-')) {// Choice Handler and List Card Handler
                    // here sourceHandle starts with 'h-'
                    let oldSourceHandleNumber = oldSourceHandleAsNumber.substring(2, oldSourceHandleAsNumber.length)
                    oldSourceHandleNumber = parseInt(oldSourceHandleNumber)

                    if (oldSourceHandleNumber > deletedIndex + 1) {
                        newSourceHandle = 'h-' + (oldSourceHandleNumber - 1)

                        newArray[index] = { ...newArray[index], sourceHandle: newSourceHandle }
                    }
                }

                if (!startWithH && !edge.sourceHandle.startsWith('h-')) { // All Message Handler, Date Handler , Number Handler , Choice not Handler and List Card not Handler
                    // here sourceHandle doesn't start with 'h-' (only digit)
                    if (oldSourceHandleAsNumber > deletedIndex + 1) {
                        newSourceHandle = '' + (oldSourceHandleAsNumber - 1)

                        newArray[index] = { ...newArray[index], sourceHandle: newSourceHandle }
                    }
                }
            }
        })

        this.setState({ edges: newArray });
    }

    handleRightDrawerCheckIfRemovedConditionIsConnectedWhenSubtractCounters(element, isHandler, indexToCheck) {
        let connected = false
        //let lastIndex = null
        let sourceHandle = null
        let isSource = null

        if (!isHandler) {// fromData in ListCard, ChoicePrompt and WebListCard
            //lastIndex = element.data.formData.length - 1
            sourceHandle = (indexToCheck + 1) + ''
            isSource = this.getNext(element.id, sourceHandle)
        }
        else {// dynamicData in Handler, Message, DatePrompt, NumberPrompt, ListCard, ChoicePrompt and WebListCard
            //lastIndex = element.data.dynamicDataHandler.length - 1

            if (element.type === 'Handler' || element.type === 'Message' || element.type === 'DatePrompt' || element.type === 'NumberPrompt') {
                sourceHandle = (indexToCheck + 1) + ''
            }
            else {// ListCard, ChoicePrompt and WebListCard
                sourceHandle = 'h-' + (indexToCheck + 1)
            }
            isSource = this.getNext(element.id, sourceHandle)
        }

        if (isSource) {
            connected = true
        }

        return connected
    }

    handleRightDrawerAnyFormChange(event, index, innerIndex, entityIndex, isHandler) {
        let { name, value, checked, type } = event.target
        const elementsIndex = this.state.nodes
            .findIndex(element => element.id === this.state.clickedElement.id)
        let newArray = [...this.state.nodes]
        let newData = { ...newArray[elementsIndex].data }

        if (type === "checkbox") {//type is CheckBox or Switch
            value = checked
        }
        else {//type is TextField or Select
            if (!Array.isArray(value)) {
                if (!value.trim()) {// prevent user from type only space.
                    value = value.trim()
                }
            }
        }

        if (index === -1) {
            newData = { ...newData, [name]: value }
        }
        else {
            if (!isHandler) {
                if (this.state.nodes[elementsIndex].type === 'RPA') {
                    let newRPAVariables = [...newData.rpaVariables]

                    if (innerIndex !== 'asVariable') {
                        newRPAVariables[index] = { ...newRPAVariables[index], [innerIndex]: value }
                    }
                    else {
                        if (this.state.variablesNamesOfEachRPA[newArray[elementsIndex].id]) {
                            newRPAVariables[index] = { ...newRPAVariables[index], [innerIndex]: value }//innerIndex is asVariable and value is true or false
                            if (value === true) {
                                newRPAVariables[index] = {
                                    ...newRPAVariables[index],
                                    [Object.keys(newRPAVariables[index])[0]]: this.state.variablesNamesOfEachRPA[this.state.nodes[elementsIndex].id][0]
                                } //when innerIndex (asVariable) which is true switch to dropdown and select first elemnt of this.state.variablesNamesOfEachRPA  as default value 
                            }
                            else {
                                newRPAVariables[index] = {
                                    ...newRPAVariables[index],
                                    [Object.keys(newRPAVariables[index])[0]]: this.state.nodes[elementsIndex].data.inputs[Object.keys(newRPAVariables[index])[0]]
                                }//when innerIndex (asVariable) which is false switch to text input reset its value
                            }
                        }
                        else {
                            this.handleSnackBarMessageOpen('There is no existed variable related to this rpa !!', '#ce3a32', 2000)
                        }

                    }

                    newData = { ...newData, rpaVariables: newRPAVariables }
                }
                else {
                    if (name === 'urlSwitch' && value === true && this.handleRightDrawerCheckIfRemovedConditionIsConnectedWhenSubtractCounters(newArray[elementsIndex], false, index)) {
                        this.handleSnackBarMessageOpen('This Choice is connected, Please remove connection so you can enable URL', '#ce3a32', 2000)
                    }
                    else {
                        let newFormData = [...newData.formData]
                        let newObject = { ...newFormData[index] }

                        newObject = { ...newObject, [name]: value }
                        newFormData[index] = newObject
                        newData = { ...newData, formData: newFormData }
                    }

                }
            } else {
                if (innerIndex > -1) {
                    let newDynamicDataHandler = [...newData.dynamicDataHandler]
                    let newDynamicDataHandlerObject = { ...newDynamicDataHandler[index] }
                    let newInnerDynamicDataHandler = [...newDynamicDataHandlerObject.innerDynamicDataHandler]
                    let newInnerDynamicDataHandlerObject = { ...newInnerDynamicDataHandler[innerIndex] }

                    if (entityIndex > -1) {
                        let newEntities = [...newInnerDynamicDataHandlerObject.entities]
                        let newEntityObject = { ...newEntities[entityIndex] }

                        newEntityObject = { ...newEntityObject, [name]: value }
                        newEntities[entityIndex] = { ...newEntityObject }
                        newInnerDynamicDataHandlerObject = {
                            ...newInnerDynamicDataHandlerObject,
                            entities: newEntities
                        }
                        newInnerDynamicDataHandler[innerIndex] = { ...newInnerDynamicDataHandlerObject }
                    }
                    else {//For Handler, Message, ListCard, ChoicePrompt and WebListCard
                        if (name === 'choice' && value === 'Keyword') {//if Choice changed to Keyword
                            newInnerDynamicDataHandlerObject = { value: '', save: false, variableName: '' }
                        }
                        else if (name === 'choice' && value === 'AI NLP') {//if Choice changed to AI NLP
                            newInnerDynamicDataHandlerObject = { intent: this.state.intents[0], entities: [] }
                        }
                        else if (name === 'choice' && value === 'Variable') {//if Choice changed to Variable
                            newInnerDynamicDataHandlerObject = { value: '', operator: this.state.operations[0] }
                        }
                        newInnerDynamicDataHandlerObject = { ...newInnerDynamicDataHandlerObject, [name]: value }
                    }
                    newInnerDynamicDataHandler[innerIndex] = { ...newInnerDynamicDataHandlerObject }
                    newDynamicDataHandler[index] = {
                        ...newDynamicDataHandler[index],
                        innerDynamicDataHandler: newInnerDynamicDataHandler
                    }
                    newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
                }
                else { //For Date Prompt and Number Prompt
                    let newDynamicDataHandler = [...newData.dynamicDataHandler]
                    let newDynamicDataHandlerObject = { ...newDynamicDataHandler[index] }

                    newDynamicDataHandler[index] = { ...newDynamicDataHandlerObject, [name]: value }
                    newData = { ...newData, dynamicDataHandler: newDynamicDataHandler }
                }
            }
        }
        newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData }

        this.setState({
            nodes: newArray,
        });
    }

    //Remove Condition or Card by its index
    handleRightDrawerCheckIfAINLPIsChosenInBefore(dynamicDataHandlerObj) {
        let ainlpNotChosenYet = true

        dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj) => {
            if (innerDynamicDataHandlerObj.choice === 'AI NLP') {
                ainlpNotChosenYet = false
            }
        })

        return ainlpNotChosenYet
    }
    //Upload Icon to server and save its name (Card URL and List Card)
    handleRightDrawerUploadIconClicked(event) {
        //const { name } = event.target.offsetParent //get button name
        let index = event.target.name
        let file = event.target.files[0];

        if (file && file.name) {
            //Upload file to server
            const formData = new FormData();

            formData.append('file', file);
            formData.append('name', file.name);

            axios.post(
                process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + 'images/api/uploads',
                formData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.authToken,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.handleRightDrawerSetIconNameInItsNode(response.data.image_name, file.name, index)

                    this.handleSnackBarMessageOpen('Icon Uploaded', '#68b04b', 1500)
                })
                .catch(error => {
                    let errorData = error.response && error.response.data && error.response.data.err
                        ? error.response.data.err
                        : false;
                    console.log('Upload Error errorData', error.response);

                    if (errorData && errorData.includes("already exists")) {
                        this.handleRightDrawerSetIconNameInItsNode(error.response.data.file_name, file.name, index);
                        this.handleSnackBarMessageOpen('Icon Already Exists', '#d4b72a', 1500)
                    }
                    else if (errorData && errorData.includes("Size")) {
                        this.handleSnackBarMessageOpen("Failed Uploading Icon (Size greater than 20 MB)", '#ce3a32', 2000);
                    }
                    else {
                        this.handleSnackBarMessageOpen('Failed Uploading Icon !!', '#ce3a32', 2000);
                    }
                });
        }
    };

    handleRightDrawerSetIconNameInItsNode = async (realName, name, index) => {
        const elementsIndex = this.state.nodes.findIndex(element => element.id === this.state.clickedElement.id)

        let newArray = [...this.state.nodes];
        let newData = { ...newArray[elementsIndex].data };
        let newFormData = [...newData.formData];
        let newObject = { ...newFormData[index] };
        let fullURL = process.env.REACT_APP_UPLOAD_FILE_URL + '/img/' + realName;

        newObject = { ...newObject, icon: fullURL, virtualIcon: name };
        newFormData[index] = newObject;
        newData = { ...newData, formData: newFormData };
        newArray[elementsIndex] = { ...newArray[elementsIndex], data: newData };

        this.setState({ nodes: newArray, });

    }

    handleRightDrawerCheckIfLoopFromFlagEnabledInNextNode(node, sourceHandle) {
        let toReturn = false
        let nextEdgeTarget = this.getNext(node.id, sourceHandle)
        if (nextEdgeTarget) {
            let nextNode = this.state.nodes.find(node => node.id === nextEdgeTarget)
            if (nextNode && nextNode.type !== 'End' && nextNode.data) {
                if (nextNode.data.loopFromSwitch && nextNode.data.loopFromName && nextNode.data.loopFromName.trim()) {
                    if (this.handleRightDrawerCheckIfLoopFromNameIsUsedInEndNode(nextNode.data.loopFromName)) {
                        toReturn = true
                    }
                }
            }
        }
        return toReturn
    }

    handleRightDrawerCheckIfLoopFromNameIsUsedInEndNode(loopFromName) {
        let toReturn = false

        this.state.nodes.forEach(endNode => {
            if (endNode.type === 'End') {
                if (endNode.data.loopFromSwitch) {
                    if (endNode.data.loopFromSwitch && endNode.data.loopFromName === loopFromName) {
                        toReturn = true
                    }
                }
            }
        })
        return toReturn
    }

    handleRightDrawerCheckIfLoopFromNameAlreadyExists(endNode) {
        let toReturn = false

        if (endNode.data.loopFromSwitch && endNode.data.loopFromName && endNode.data.loopFromName !== 'None') {
            let foundNode = this.state.nodes.find(node => node.type !== 'End' && node.data && node.data.loopFromName === endNode.data.loopFromName)
            toReturn = foundNode && foundNode.data.loopFromSwitch && foundNode.data.loopFromName ? foundNode.id : false
        }

        return toReturn
    }
    ///END/OF/HANDLE/RIGHT/DRWAWER/FUNCTIONS///////////////////////////////////////////////////////

    //when Apply Button clicked save data into DB. And send to azure(if staging or Productio selected)
    checkIfWebUrlIsEmpty() {
        if (!this.state.userData.bot_configuration?.web_staging_url.trim() || !this.state.userData.bot_configuration?.web_production_url.trim()) {
            return false
        }
        else return true
    }
    handleSaveFormDialogApplyClicked = event => {
        let DBBodyJsonAdd = {
            completeflow: this.state.flow,
            flow_name: this.state.formDialogBotName,
            ui: { ui: [...this.state.nodes, ...this.state.edges] },
            status: this.state.formDialogApplyValues,
            flow_type: this.state.botType,
        }

        let DBBodyJsonUpdate = {
            flow_id: this.state.updatingBot.id,
            completeflow: this.state.flow,
            old_flow_name: this.state.updatingBot.flow_name,
            new_flow_name: this.state.formDialogBotName,
            ui: { ui: [...this.state.nodes, ...this.state.edges] },
            status: this.state.formDialogApplyValues,
            flow_type: this.state.botType,
        }


        let addOrUpdateRoute = this.state.updatingBot ? "updateConfiguration" : 'addConfiguration';
        let DBBodyJson = this.state.updatingBot ? DBBodyJsonUpdate : DBBodyJsonAdd;

        axios.post(
            process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL + 'configuration/' + addOrUpdateRoute,
            DBBodyJson,
            { headers: { 'Authorization': 'Bearer ' + this.state.authToken } }
        )
            .then(response => {
                this.handleSnackBarMessageOpen('Bot Configuration Saved Successfully', '#68b04b', 2000);
                let updatingBot = { ...response.data };
                this.setState({ updatingBot: updatingBot });
            })
            .catch(error => {//function (error) {
                console.log("Save Or Update Bot Error", error);
                this.handleSnackBarMessageOpen('Failed Saving Bot Configuration !', '#ce3a32', 3000)
                //}
            });

        if (this.state.formDialogApplyValues === 'Staging') {
            let body_json = {
                bot: {
                    settings: {},
                    flow: this.state.flow
                }
            }
            // axios.post(process.env.REACT_APP_AZURE_STAGING_BOT_URL, body_json)
            axios.post(`${this.state.userData.bot_configuration.web_staging_url}/api/bot`, body_json)

                .then(res => {
                    // console.log("STAGING", this.state.userData.appservice_staging_url, body_json)

                    this.handleSnackBarMessageOpen('Bot Configuration Sent Successfully', '#68b04b', 2000)
                })
                .catch(res => {
                    console.log("Error Data")
                    this.handleSnackBarMessageOpen('Sending Bot Configuration Was Not Successfully', '#ce3a32', 3000)
                });
        }
        else if (this.state.formDialogApplyValues === 'Production') {
            let body_json = {
                bot: {
                    settings: {},
                    flow: this.state.flow
                }
            }

            // axios.post(process.env.REACT_APP_AZURE_STAGING_BOT_URL, body_json)
            axios.post(`${this.state.userData.bot_configuration.web_production_url}/api/bot`, body_json)

                .then(res => {
                    this.handleSnackBarMessageOpen('Bot Configuration Sent Successfully', '#68b04b', 2000)
                })
                .catch(res => {
                    //console.log("Error")
                    this.handleSnackBarMessageOpen('Sending Bot Configuration Was Not Successfully', '#ce3a32', 3000)
                });
        }

        // this.getDataFromDatabaseAndSaveItInState(process.env.REACT_APP_GET_CARDS_INETENTS_ENTITIES_URL+'configuration/getconfigurationlist',
        //     null,
        //     'flowVersionsList')

        this.setState({ flow: {} });
        this.handleFormDialogClose();

    }

    ///START/OF/LEFT/DRAWER/FUNCTIONS////////////////////////////////////////////////////////////////
    handleLeftDrawerOpen = () => {
        this.setState({
            isLeftOpen: true
        })
    };

    handleLeftDrawerClose = () => {
        this.setState({
            isLeftOpen: false
        })
    };
    ///END/OF/LEFT/DRAWER/FUNCTIONS//////////////////////////////////////////////////////////////////

    ///START/OF/RIGHT/DRAWER/FUNCTIONS///////////////////////////////////////////////////////////////
    handleRightDrawerOpen = () => {
        this.setState({
            isRightOpen: true
        })
    };

    handleRightDrawerClose = () => {
        this.setState({
            clickedElement: null,
            isRightOpen: false
        })
    };
    ///END/OF/RIGHT/DRAWER/FUNCTIONS/////////////////////////////////////////////////////////////////

    ///START/OF/FORM/DIALOG/FUNCTIONS////////////////////////////////////////////////////////////////
    handleFormDialogOpen = (event, status) => {
        //console.log(status)

        this.createFlowObject();

        this.setState({
            isFormDialogOpen: true,
            formDialogStatus: status
        })
    };

    handleFormDialogClose = () => {
        this.setState({
            isFormDialogOpen: false
        })
    };

    handleSaveFormDialogOnChange = (value, variableName) => {
        this.setState({ [variableName]: value });
    };
    ///END/OF/FORM/DIALOG/FUNCTIONS////////////////////////////////////////////////////////////////

    handleSnackBarMessageOpen = (message, color, duration) => {
        this.setState({ showSnackBarMessage: { open: true, message: message, color: color, duration: duration } });
    }

    handleSnackBarMessageClose = () => {
        this.setState({ showSnackBarMessage: { open: false, message: null, color: null, duration: 3000 } });
    }

    ///GET/NAME/OF/DROPPED/ELEMENT/FUNCTION////////////////////////////////////////////////////////
    getDroppedElement = (data) => {
        console.log({ data });
        // console.log('droppedElement', data);
        this.setState({
            droppedElement: data
        })
    }
    handleNodeContextMenu = (event, node) => {
        event.preventDefault();
        this.setState({ IDOnSelectionContextMenu: node.id });
    };
    ///RENDER/FUNCTION/////////////////////////////////////////////////////////////////////////////
    render() {

        return (
            <MainLayout parentThis={this} />
        );
    }
}

// Wrap and export
function MainFunction(props) {

    const [leftDrawerWidth, setLeftDrawerWidth] = useState(180);//110 or 280 or 190
    const [appBarHeight, setAppBarHeight] = useState(55);


    return (
        < Main {...props}
            leftDrawerWidth={leftDrawerWidth}
            setLeftDrawerWidth={setLeftDrawerWidth}
            appBarHeight={appBarHeight}
            setAppBarHeight={setAppBarHeight}
        />
    )
}

export default MainFunction;


