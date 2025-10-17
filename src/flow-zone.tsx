import {
  addEdge,
  Background,
  Controls,
  MarkerType,
  MiniMap,
  OnInit,
  ReactFlow,
  type Connection,
  type Edge,
  type Node,
  type OnConnect
} from "@xyflow/react"
// @ts-ignore
import "@xyflow/react/dist/style.css"
import { useCallback, useMemo } from "react"
import { useShallow } from "zustand/react/shallow"

// 🧩 Components
import StickyNote from "./components/custom/sticky-note"
import ButtonEdge from "./components/edgeTypes/button-edge"
import connectionLine from "./components/edgeTypes/connection-line"
import StepLoopBackEdge from "./components/edgeTypes/loop-back-edge"

// 🧠 Node components
import { ChoiceNode } from "./components/nodes/choice-node"
import { ConditionAgentNode } from "./components/nodes/condition-agent-node"
import { InputNode } from "./components/nodes/input-node"
import { IntegrationNode } from "./components/nodes/integration-node"
import { LlmNode } from "./components/nodes/llm-node"
import { MessageNode } from "./components/nodes/message-node"
import { RouterNode } from "./components/nodes/router-node"
import StickyNoteNode from "./components/nodes/stickyNote-node"

// ⚙️ Utils & Store
import { getAllPreviousNodes } from "./lib/utils/utils"
import { useFlowStore } from "./store/root-store"

// 🧱 Types
type NodeData = Record<string, any>
// Extend the Node type to include optional color
interface ColoredNodeData {
  color?: string;
  [key: string]: any; // keep other properties flexible
}

type ColoredNode = Node<ColoredNodeData>;
const FlowZone: React.FC = () => {
  const {
    nodes,
    edges,
    setEdges,
    applyNodeChangesFunc,
    applyEdgeChangesFunc,
    setReactFlowInstance,
    setClickedElement,
    clickedElement,
    setIsRightOpen,
    setShowSnackBarMessage,
    theme
  } = useFlowStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      setEdges: state.setEdges,
      applyNodeChangesFunc: state.applyNodeChangesFunc,
      applyEdgeChangesFunc: state.applyEdgeChangesFunc,
      setReactFlowInstance: state.setReactFlowInstance,
      setClickedElement: state.setClickedElement,
      clickedElement: state.clickedElement,
      setIsRightOpen: state.setIsRightOpen,
      setShowSnackBarMessage: state.setShowSnackBarMessage,
      theme: state.theme
    }))
  )

  const nodeTypes = useMemo(
    () => ({
      Handler: InputNode,
      Message: MessageNode,
      ChoicePrompt: ChoiceNode,
      Router: RouterNode,
      ReactAgent: LlmNode,
      DataCollector: IntegrationNode,
      BasicLLM: LlmNode,
      ConditionAgent: ConditionAgentNode,
      QuestionAndAnswer: LlmNode,
      // integration nodes
      Outlook: IntegrationNode,
      JiraSoftware: IntegrationNode,
      MySQL: IntegrationNode,
      Teams: IntegrationNode,
      Stripe: IntegrationNode,
      Postgres: IntegrationNode,
      Shopify: IntegrationNode,
      ServiceNow: IntegrationNode,
      Twilio: IntegrationNode,
      Whatsapp: IntegrationNode,
      HubSpot: IntegrationNode,
      Salesforce: IntegrationNode,
      GoogleContacts: IntegrationNode,
      ZohoCRM: IntegrationNode,
      Odoo: IntegrationNode,
      Linear: IntegrationNode,
      GraphQL: IntegrationNode,
      Zoom: IntegrationNode,
      ClickUp: IntegrationNode,
      GoogleCalendar: IntegrationNode,
      GoogleMeet: IntegrationNode,
      AirTable: IntegrationNode,
      Notion: IntegrationNode,
      MongoDb: IntegrationNode,
      Asana: IntegrationNode,
      MicrosoftWord: IntegrationNode,
      Telegram: IntegrationNode,
      GoogleSheets: IntegrationNode,
      GoogleDrive: IntegrationNode,
      Freshdesk: IntegrationNode,
      Zendesk: IntegrationNode,
      OpenAI: IntegrationNode,
      Onedrive: IntegrationNode,
      Excel: IntegrationNode,
      Gemini: IntegrationNode,
      Slack: IntegrationNode,
      Gmail: IntegrationNode,
      HttpRequest: IntegrationNode,
      Attachment: IntegrationNode,
      StickyNote: StickyNoteNode
    }),
    []
  )

  const edgeTypes = useMemo(
    () => ({
      buttonEdge: ButtonEdge,
      loopBackEdge: StepLoopBackEdge
    }),
    []
  )

  const handleRightDrawerClose = () => {
    setClickedElement(null)
    setIsRightOpen(false)
  }

  const handleRightDrawerOpen = () => {
    setIsRightOpen(true)
  }



  const onElementClick = (_: React.MouseEvent, element: Node<NodeData>) => {
    if (element && element.type !== "StickyNote") {
      if (clickedElement?.id !== element.id) {
        setClickedElement(false as any)
        handleRightDrawerClose()
        setTimeout(() => setClickedElement(element), 300)
      } else {
        setClickedElement(clickedElement)
        handleRightDrawerOpen()
      }
    }
  }

  const onConnect: OnConnect = (params: Connection) => {
    const { source, target, sourceHandle } = params;

    if (source === target) {
      setShowSnackBarMessage({
        open: true,
        message: "Couldn't connect component with itself!",
        color: "destructive",
        duration: 3000
      });
      return;
    }
    const isSourceConnected = edges.some(
      (edge) => edge.source === source && (edge.sourceHandle ?? null) === (sourceHandle)
    );

    if (isSourceConnected) {
      setShowSnackBarMessage({
        open: true,
        message: "This source is already connected!",
        color: "destructive",
        duration: 3000
      });
      return;
    }

    const listOfNodes = getAllPreviousNodes(source!)
    const isCycle = listOfNodes.includes(target!)

    const newEdge: Connection = {
      ...params,
    };

    setEdges((prevEdges) =>
      addEdge(
        {
          ...newEdge,
          type: isCycle ? "loopBackEdge" : "buttonEdge",
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { stroke: "#afafb5", strokeWidth: 2 },
        },
        prevEdges
      )
    );
  }

  const onPaneClick = () => {
    handleRightDrawerClose()
  }
  const onInit: OnInit<Node, Edge> = useCallback((instance) => {
    setReactFlowInstance(instance)
  }, [])
  return (
    <div className="relative w-full">
      <ReactFlow
        className="h-full flex-1 w-full"
        onNodesChange={applyNodeChangesFunc}
        onEdgesChange={applyEdgeChangesFunc}
        onInit={onInit}
        nodes={nodes}
        edges={edges}
        onNodeClick={onElementClick}
        onPaneClick={onPaneClick}
        onConnect={onConnect}
        minZoom={0.1}
        colorMode={theme ? "dark" : "light"}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineComponent={connectionLine}
      >
        <MiniMap
          className="bg-background"
          nodeStrokeColor={() => "#fff"}
          nodeColor={(n: ColoredNode) => n.data.color ?? "#999"}
          nodeBorderRadius={2}
        />
        <Controls />
        <Background className="bg-canvas" size={1} />
      </ReactFlow>
      <StickyNote />
    </div>
  )
}

export default FlowZone
