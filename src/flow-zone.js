import { addEdge, Background, Controls, MarkerType, MiniMap, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import StickyNote from './components/custom/sticky-note';
import ButtonEdge from './components/edgeTypes/button-edge';
import connectionLine from './components/edgeTypes/connection-line';
import StepLoopBackEdge from './components/edgeTypes/loop-back-edge';
import { ChoiceNode } from './components/nodes/choice-node';
import { ConditionAgentNode } from './components/nodes/condition-agent-node';
import { InputNode } from './components/nodes/input-node';
import { IntegrationNode } from './components/nodes/integration-node';
import { LlmNode } from './components/nodes/llm-node';
import { MessageNode } from './components/nodes/message-node';
import { RouterNode } from './components/nodes/router-node';
import StickyNoteNode from './components/nodes/stickyNote-node';
import { getAllPreviousNodes } from './lib/utils';
import { useFlowStore } from './store/flow-store';

const FlowZone = () => {
  const nodeTypes = {
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
  };
  const edgeTypes = {
    buttonEdge: ButtonEdge,
    loopBackEdge: StepLoopBackEdge
  }
  const nodes = useFlowStore(state => state.nodes)
  const edges = useFlowStore(state => state.edges)
  const setEdges = useFlowStore(state => state.setEdges)
  const applyNodeChangesFunc = useFlowStore(state => state.applyNodeChangesFunc)
  const applyEdgeChangesFunc = useFlowStore(state => state.applyEdgeChangesFunc)
  const setReactFlowInstance = useFlowStore(state => state.setReactFlowInstance)
  const setClickedElement = useFlowStore(state => state.setClickedElement)
  const clickedElement = useFlowStore(state => state.clickedElement)
  const setIsRightOpen = useFlowStore(state => state.setIsRightOpen)
  const setShowSnackBarMessage = useFlowStore(state => state.setShowSnackBarMessage)




  const theme = useFlowStore(state => state.theme)

  const handleRightDrawerClose = () => {
    setClickedElement(null)
    setIsRightOpen(false)
  }


  const handleRightDrawerOpen = () => {
    setIsRightOpen(true)
  }
  const onElementClick = (event, element) => {
    if (element && element.type !== "StickyNote") {
      if (clickedElement?.id !== element.id) {
        setClickedElement(false)
        handleRightDrawerClose()
        setTimeout(() => {
          setClickedElement(element)
        }, 300);
      }
      else {
        setClickedElement(clickedElement)
        handleRightDrawerOpen()
      }
    }
  }
  const handleSnackBarMessageOpen = (message, color, duration) => {
    setShowSnackBarMessage({ open: true, message: message, color: color, duration: duration })
  }
  const onConnect = (params) => {
    const { source, target, sourceHandle } = params;

    if (source === target) {
      handleSnackBarMessageOpen("Couldn't connect component with itself!", "destructive", 3000);
      return;
    }

    const isSourceConnected = edges.some(
      (edge) => edge.source === source && edge.sourceHandle === sourceHandle
    );
    console.log({ isSourceConnected, params });

    if (isSourceConnected) {
      handleSnackBarMessageOpen("This source is already connected!", "destructive", 3000);
      return;
    }
    const litsOfNodes = getAllPreviousNodes(source)
    const isCycle = litsOfNodes.find(id => id === target)
    const newEdge = {
      ...params,
      arrowHeadType: "arrowclosed",
      type: isCycle ? "loopBackEdge" : "buttonEdge",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#afafb5", strokeWidth: 2 },
    };

    setEdges((prevEdges) => addEdge(newEdge, prevEdges));
  };



  const onPaneClick = () => {
    handleRightDrawerClose()
  };
  return (
    <div className="relative h-full w-full">
      <ReactFlow
        className='h-full flex-1 w-full'
        onNodesChange={applyNodeChangesFunc}
        onEdgesChange={applyEdgeChangesFunc}
        onInit={setReactFlowInstance}
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
          className='bg-background'
          nodeStrokeColor={(n) => {
            return '#fff';
          }}
          nodeColor={(n) => {
            return n.data.color;
          }}
          nodeBorderRadius={2}
        />
        <Controls />
        <Background
          className='bg-canvas'
          size={1}
        />
      </ReactFlow>
      <StickyNote />
    </div>
  );
};

export default FlowZone;
