import { addEdge, Background, Controls, MarkerType, MiniMap, ReactFlow, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { v4 as uuidv4 } from "uuid";
import ButtonEdge from './components/edgeTypes/button-edge';
import connectionLine from './components/edgeTypes/connection-line';
import AgentNode from './components/nodesTypes/AgentNode';
import Chain from './components/nodesTypes/Chain';
import ChoiceNode from './components/nodesTypes/ChoiceNode';
import MessageNode from './components/nodesTypes/Message';
import RPANode from './components/nodesTypes/RPA';
import StartNode from './components/nodesTypes/StartNode';
import SwitchNode from './components/nodesTypes/Switch';
import { setAutomationArray } from './lib/automation-utils';
import { useFlowStore } from './store/flow-store';

const FlowZone = () => {
  const nodeTypes = {
    Handler: StartNode,
    Message: MessageNode,
    ChoicePrompt: ChoiceNode,
    Agent: AgentNode,
    Switch: SwitchNode,
    RPA: RPANode,
    BasicLlm: Chain
  };
  const edgeTypes = {
    buttonEdge: ButtonEdge
  }
  const reactFlowInstance = useReactFlow()
  const nodes = useFlowStore(state => state.nodes)
  const droppedElement = useFlowStore(state => state.droppedElement)
  const setNodes = useFlowStore(state => state.setNodes)
  const edges = useFlowStore(state => state.edges)
  const setEdges = useFlowStore(state => state.setEdges)
  const applyNodeChangesFunc = useFlowStore(state => state.applyNodeChangesFunc)
  const applyEdgeChangesFunc = useFlowStore(state => state.applyEdgeChangesFunc)
  const setReactFlowInstance = useFlowStore(state => state.setReactFlowInstance)
  const setClickedElement = useFlowStore(state => state.setClickedElement)
  const setIsRightOpen = useFlowStore(state => state.setIsRightOpen)
  const setShowSnackBarMessage = useFlowStore(state => state.setShowSnackBarMessage)
  const setMousePositionManySelectedElementMenu = useFlowStore(state => state.setMousePositionManySelectedElementMenu)
  const setZoomAndMoveValues = useFlowStore(state => state.setZoomAndMoveValues)
  const setIDOnSelectionContextMenu = useFlowStore(state => state.setIDOnSelectionContextMenu)
  const setDroppedElement = useFlowStore(state => state.setDroppedElement)
  const limitArray = useFlowStore(state => state.limitArray)
  const scoreArray = useFlowStore(state => state.scoreArray)
  const mousePositionHandleMenu = useFlowStore(state => state.mousePositionHandleMenu)


  // Add new element to the flow
  const addNewElementToFlowZone = (clientX, clientY) => {
    console.log({ droppedElement, nodes });
    if (droppedElement) {
      const position = reactFlowInstance.screenToFlowPosition({ x: clientX, y: clientY });
      const generateID = uuidv4();

      let newElement = {
        id: generateID,
        type: droppedElement.type,
        data: { label: droppedElement.name },
        position,
      };

      let newData = { ...newElement.data };

      if (droppedElement.type !== "Card") {
        let defaults = droppedElement.defaults || {};
        if (defaults.automated) {
          defaults = { ...defaults, rightSideData: { ...defaults.rightSideData, json: setAutomationArray(defaults.rightSideData.json) } }
          console.log({ sss: setAutomationArray(defaults.rightSideData.json) })
        }
        newData = {
          ...newData,
          color: droppedElement.color,
          icon: droppedElement.icon,
          ...defaults,
        };
      } else if (droppedElement.type === "Card") {
        newData = {
          label: "Card",
          name: droppedElement.cardname,
          payload: droppedElement.cardDetails,
          color: "#607D8B",
          icon: "InsertDriveFile",
          variables: droppedElement.variables,
          mousePositionHandleMenu,
        };
      }

      newElement = { ...newElement, data: newData };
      setNodes((prevNodes) => [...prevNodes, newElement]);
      setDroppedElement(null);
    }

  }

  const theme = useFlowStore(state => state.theme)
  console.log({ theme });


  const onDragOver = (event, node) => {
    //console.log('drag over')
    event.preventDefault();
  };
  const handleRightDrawerClose = () => {
    setClickedElement(null)
    setIsRightOpen(false)
  }
  const onDrop = (event, node) => {
    addNewElementToFlowZone(event.clientX, event.clientY)
    event.preventDefault()
    handleRightDrawerClose()
  }

  const handleRightDrawerOpen = () => {
    setIsRightOpen(true)
  }
  const onElementClick = (event, element) => {
    if (element) {
      setClickedElement(element)
      handleRightDrawerOpen()
    }
  }
  const handleSnackBarMessageOpen = (message, color, duration) => {
    setShowSnackBarMessage({ open: true, message: message, color: color, duration: duration })
  }
  const onConnect = (params) => {
    if (params.source === params.target) {
      handleSnackBarMessageOpen("Couldn't connect component with itself !", "#ce3a32", 3000)
    } else {
      const isSource = edges.find(
        (element) => element.source === params.source && element.sourceHandle === params.sourceHandle,
      )

      if (isSource) {
        handleSnackBarMessageOpen("Source already connected !", "#ce3a32", 3000)
      } else {
        const sourceElement = nodes.find((element) => element.id === params.source)
        if (
          sourceElement.type === "ListCard" &&
          !params.sourceHandle.startsWith("h-") &&
          params.sourceHandle !== "0" &&
          sourceElement.data.formData[Number.parseInt(params.sourceHandle) - 1].urlSwitch
        ) {
          handleSnackBarMessageOpen(
            "Source can not be connencted, Please disable URL so you can connect !",
            "#ce3a32",
            4000,
          )
        } else {
          const edgeColor = sourceElement.data.color

          setEdges((prevEdges) =>
            addEdge(
              {
                ...params,
                arrowHeadType: "arrowclosed",
                type: "buttonEdge",
                markerEnd: { type: MarkerType.ArrowClosed },
                style: { stroke: "#afafb5", strokeWidth: 2 },
              },
              prevEdges,
            )
          )

        }
      }
    }
  }
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
