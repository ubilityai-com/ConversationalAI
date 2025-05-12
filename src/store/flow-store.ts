import { applyEdgeChanges, applyNodeChanges, Edge, Node, type ReactFlowInstance } from "@xyflow/react"
import { create } from "zustand"

interface FlowState {
    // Flow instance
    reactFlowInstance: ReactFlowInstance | null
    setReactFlowInstance: (instance: ReactFlowInstance) => void

    // Theme
    theme: boolean
    toggleTheme: () => void

    // Elements
    droppedElement: any | null
    setDroppedElement: (element: any | null) => void

    clickedElement: any | null
    setClickedElement: (element: any | null) => void

    flowZoneSelectedManyElement: any[]
    setFlowZoneSelectedManyElement: (elements: any[]) => void

    zoomAndMoveValues: { x: number; y: number; zoom: number }
    setZoomAndMoveValues: (values: { x: number; y: number; zoom: number }) => void

    // Nodes and edges
    nodes: any[]
    setNodes: (value: Node[] | ((prev: Node[]) => Node[])) => void
    applyNodeChangesFunc: (changes: any) => void

    edges: any[]
    setEdges: (value: Edge[] | ((prev: Edge[]) => Edge[])) => void
    applyEdgeChangesFunc: (changes: any) => void

    // User and authentication
    userData: any
    setUserData: (data: any) => void

    authToken: string | boolean
    setAuthToken: (token: string | boolean) => void

    // Bot data
    updatingBot: any
    setUpdatingBot: (bot: any) => void

    isLoadingBot: boolean
    setIsLoadingBot: (loading: boolean) => void

    IDOnSelectionContextMenu: string
    setIDOnSelectionContextMenu: (id: string) => void

    flow: any
    setFlow: (flow: any) => void

    formDialogBotName: string
    setFormDialogBotName: (name: string) => void

    botType: string
    setBotType: (type: string) => void

    variablesNamesOfEachRPA: Record<string, string[]>
    setVariablesNamesOfEachRPA: (variables: Record<string, string[]>) => void

    endLoopFromNodesNames: Record<string, string[]>
    setEndLoopFromNodesNames: (names: Record<string, string[]>) => void

    // UI state
    isLeftOpen: boolean
    setIsLeftOpen: (open: boolean) => void

    isRightOpen: boolean
    setIsRightOpen: (open: boolean) => void

    isFormDialogOpen: boolean
    setIsFormDialogOpen: (open: boolean) => void

    formDialogStatus: any
    setFormDialogStatus: (status: any) => void

    formDialogApplyValues: string
    setFormDialogApplyValues: (values: string) => void

    mousePositionHandleMenu: { mouseX: number | null; mouseY: number | null; handle: string | null }
    setMousePositionHandleMenu: (position: {
        mouseX: number | null
        mouseY: number | null
        handle: string | null
    }) => void

    mousePositionManySelectedElementMenu: { mouseX: number | null; mouseY: number | null }
    setMousePositionManySelectedElementMenu: (position: { mouseX: number | null; mouseY: number | null }) => void

    showSnackBarMessage: { open: boolean; message: string | null; color: string | null; duration: number }
    setShowSnackBarMessage: (message: {
        open: boolean
        message: string | null
        color: string | null
        duration: number
    }) => void

    // Data lists
    cards: any[]
    setCards: (cards: any[]) => void

    rpasList: any[]
    setRpasList: (list: any[]) => void

    intents: string[]
    setIntents: (intents: string[]) => void

    entities: string[]
    setEntities: (entities: string[]) => void

    // Constants
    operations: string[]
    limitArray: string[]
    scoreArray: string[]
    components: any[]
}

export const useFlowStore = create<FlowState>((set) => ({
    // Flow instance
    reactFlowInstance: null,
    setReactFlowInstance: (instance) => set({ reactFlowInstance: instance }),

    // Theme
    theme: localStorage.getItem("darkMode") === "true",
    toggleTheme: () => set((state) => ({ theme: !state.theme })),

    // Elements
    droppedElement: null,
    setDroppedElement: (element) => set({ droppedElement: element }),

    clickedElement: null,
    setClickedElement: (element) => set({ clickedElement: element }),

    flowZoneSelectedManyElement: [],
    setFlowZoneSelectedManyElement: (elements) => set({ flowZoneSelectedManyElement: elements }),

    zoomAndMoveValues: { x: 0, y: 0, zoom: 1 },
    setZoomAndMoveValues: (values) => set({ zoomAndMoveValues: values }),

    // Nodes and edges
    nodes: [],
    setNodes: (valueOrUpdater) =>
        set((state) => ({
            nodes:
                typeof valueOrUpdater === 'function'
                    ? valueOrUpdater(state.nodes)
                    : valueOrUpdater,
        })),
    applyNodeChangesFunc: (changes) =>
        set((state) => ({
            nodes: applyNodeChanges(changes, state.nodes),
        })),

    edges: [],
    setEdges: (valueOrUpdater) =>
        set((state) => ({
            edges:
                typeof valueOrUpdater === 'function'
                    ? valueOrUpdater(state.edges)
                    : valueOrUpdater,
        })),
    applyEdgeChangesFunc: (changes) =>
        set((state) => ({
            edges: applyEdgeChanges(changes, state.edges),
        })),

    // User and authentication
    userData: {},
    setUserData: (data) => set({ userData: data }),

    authToken: false,
    setAuthToken: (token) => set({ authToken: token }),

    // Bot data
    updatingBot: {},
    setUpdatingBot: (bot) => set({ updatingBot: bot }),

    isLoadingBot: false,
    setIsLoadingBot: (loading) => set({ isLoadingBot: loading }),

    IDOnSelectionContextMenu: "",
    setIDOnSelectionContextMenu: (id) => set({ IDOnSelectionContextMenu: id }),

    flow: {},
    setFlow: (flow) => set({ flow }),

    formDialogBotName: "",
    setFormDialogBotName: (name) => set({ formDialogBotName: name }),

    botType: "Web",
    setBotType: (type) => set({ botType: type }),

    variablesNamesOfEachRPA: {},
    setVariablesNamesOfEachRPA: (variables) => set({ variablesNamesOfEachRPA: variables }),

    endLoopFromNodesNames: {},
    setEndLoopFromNodesNames: (names) => set({ endLoopFromNodesNames: names }),

    // UI state
    isLeftOpen: true,
    setIsLeftOpen: (open) => set({ isLeftOpen: open }),

    isRightOpen: false,
    setIsRightOpen: (open) => set({ isRightOpen: open }),

    isFormDialogOpen: false,
    setIsFormDialogOpen: (open) => set({ isFormDialogOpen: open }),

    formDialogStatus: null,
    setFormDialogStatus: (status) => set({ formDialogStatus: status }),

    formDialogApplyValues: "Draft",
    setFormDialogApplyValues: (values) => set({ formDialogApplyValues: values }),

    mousePositionHandleMenu: { mouseX: null, mouseY: null, handle: null },
    setMousePositionHandleMenu: (position) => set({ mousePositionHandleMenu: position }),

    mousePositionManySelectedElementMenu: { mouseX: null, mouseY: null },
    setMousePositionManySelectedElementMenu: (position) => set({ mousePositionManySelectedElementMenu: position }),

    showSnackBarMessage: { open: false, message: null, color: null, duration: 3000 },
    setShowSnackBarMessage: (message) => set({ showSnackBarMessage: message }),

    // Data lists
    cards: [],
    setCards: (cards) => set({ cards }),

    rpasList: [],
    setRpasList: (list) => set({ rpasList: list }),

    intents: [],
    setIntents: (intents) => set({ intents }),

    entities: [],
    setEntities: (entities) => set({ entities }),

    // Constants
    operations: ["==", "!=", "<=", "<", ">=", ">"],
    limitArray: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    scoreArray: ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"],
    components: [
        {
            name: "Message",
            type: "Message",
            icon: "QuestionAnswer",
            color: "#4b98ea",
        },
        {
            name: "Choice",
            type: "ChoicePrompt",
            icon: "InsertComment",
            color: "#61b765",
        },
        {
            name: "Web List Card",
            type: "WebListCard",
            icon: "LinearScale",
            color: "#1b3d8c",
        },
        {
            name: "List Card",
            type: "ListCard",
            icon: "LinearScale",
            color: "#855DA1",
        },
        {
            name: "End",
            type: "End",
            icon: "Stop",
            color: "#E32212",
        },
    ],
}))
