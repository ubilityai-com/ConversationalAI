import { addEdge, Background, Controls, MarkerType, MiniMap, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ButtonEdge from './components/edgeTypes/button-edge';
import connectionLine from './components/edgeTypes/connection-line';
import { ChoiceNode } from './components/nodes/choice-node';
import { ConditionAgentNode } from './components/nodes/condition-agent-node';
import { EndNode } from './components/nodes/end-node';
import { InputNode } from './components/nodes/input-node';
import { IntegrationNode } from './components/nodes/integration-node';
import { LlmNode } from './components/nodes/llm-node';
import { MessageNode } from './components/nodes/message-node';
import { RouterNode } from './components/nodes/router-node';
import { useFlowStore } from './store/flow-store';

const FlowZone = () => {
  const nodeTypes = {
    Handler: InputNode,
    Message: MessageNode,
    ChoicePrompt: ChoiceNode,
    Router: RouterNode,
    End: EndNode,
    ReactAgent: LlmNode,
    BasicLLM: LlmNode,
    ConditionAgent: ConditionAgentNode,
    QuestionAndAnswer: LlmNode,
    // integration nodes
    Slack: IntegrationNode,
    Gmail: IntegrationNode,
    HttpRequest: IntegrationNode
  };
  const edgeTypes = {
    buttonEdge: ButtonEdge
  }
  const nodes = useFlowStore(state => state.nodes)
  const setNodes = useFlowStore(state => state.setNodes)
  const edges = useFlowStore(state => state.edges)
  const setEdges = useFlowStore(state => state.setEdges)
  const applyNodeChangesFunc = useFlowStore(state => state.applyNodeChangesFunc)
  const applyEdgeChangesFunc = useFlowStore(state => state.applyEdgeChangesFunc)
  const setReactFlowInstance = useFlowStore(state => state.setReactFlowInstance)
  const setClickedElement = useFlowStore(state => state.setClickedElement)
  const clickedElement = useFlowStore(state => state.clickedElement)
  const setIsRightOpen = useFlowStore(state => state.setIsRightOpen)
  const setShowSnackBarMessage = useFlowStore(state => state.setShowSnackBarMessage)
  const setMousePositionManySelectedElementMenu = useFlowStore(state => state.setMousePositionManySelectedElementMenu)
  const setZoomAndMoveValues = useFlowStore(state => state.setZoomAndMoveValues)
  const setIDOnSelectionContextMenu = useFlowStore(state => state.setIDOnSelectionContextMenu)





  const theme = useFlowStore(state => state.theme)


  const onDragOver = (event, node) => {
    event.preventDefault();
  };
  const handleRightDrawerClose = () => {
    setClickedElement(null)
    setIsRightOpen(false)
  }
  const onDrop = (event, node) => {
    event.preventDefault()
    handleRightDrawerClose()
  }

  const handleRightDrawerOpen = () => {
    setIsRightOpen(true)
  }
  const onElementClick = (event, element) => {
    if (element) {
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

    const newEdge = {
      ...params,
      arrowHeadType: "arrowclosed",
      type: "buttonEdge",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#afafb5", strokeWidth: 2 },
    };

    setEdges((prevEdges) => addEdge(newEdge, prevEdges));
  };

  const onNodeDragStop = (event, node) => {
    const elementsIndex = nodes.findIndex((element) => element.id === node.id)

    const newArray = [...nodes]
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      position: { x: node.position.x, y: node.position.y },
    }

    setNodes(newArray)
  }
  const onSelectionDragStop = (event, selectedNodes) => {
    if (selectedNodes) {
      selectedNodes.forEach((node) => {
        const elementsIndex = nodes.findIndex((element) => element.id === node.id)

        const newArray = [...nodes]
        newArray[elementsIndex] = {
          ...newArray[elementsIndex],
          position: { x: node.position.x, y: node.position.y },
        }

        setNodes(newArray)
      })
    }
  }
  const onSelectionContextMenu = (event, selectedNodes) => {
    event.preventDefault()

    setMousePositionManySelectedElementMenu({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 })
    setClickedElement(null)
    setIsRightOpen(false)
  }
  const onMoveEnd = (transform) => {
    if (transform) setZoomAndMoveValues({ x: transform.x, y: transform.y, zoom: transform.zoom })
  }
  const handleNodeContextMenu = (event, node) => {
    event.preventDefault()
    setIDOnSelectionContextMenu(node.id)
  }


  const onPaneClick = () => {
    handleRightDrawerClose()
  };
  return (

    <ReactFlow
      className='h-full flex-1 w-full'
      onNodesChange={applyNodeChangesFunc}
      onEdgesChange={applyEdgeChangesFunc}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onInit={setReactFlowInstance}
      nodes={nodes}
      edges={edges}
      onNodeClick={onElementClick}
      onPaneClick={onPaneClick}
      onConnect={onConnect}
      minZoom={0.1}
      colorMode={theme ? "dark" : "light"}
      onNodeDragStop={onNodeDragStop}
      onSelectionDragStop={onSelectionDragStop}
      onSelectionContextMenu={onSelectionContextMenu}
      onMoveEnd={onMoveEnd}
      onNodeContextMenu={handleNodeContextMenu}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      connectionLineComponent={connectionLine}
    >
      <MiniMap
        className='bg-background'
        nodeStrokeColor={(n) => {//color of border of nodes in mini-map
          // if (n.style?.background) return n.style.background;
          // if (n.type === 'input') return '#0041d0';
          // if (n.type === 'output') return '#ff0072';
          // if (n.type === 'default') return '#1a192b';

          return '#ffffff';
        }}
        nodeColor={(n) => {
          //console.log(n)
          //if (n.style?.background) return n.style.background;
          //if (n.type === 'Card') return 'blue';
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

  );
};

export default FlowZone;
