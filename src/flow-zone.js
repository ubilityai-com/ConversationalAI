import { Background, Controls, MiniMap, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ButtonEdge from './components/edgeTypes/button-edge';
import MessageNode from './components/nodesTypes/Message';
import StartNode from './components/nodesTypes/StartNode';
// import handler from './components/handler/handler'
// import message from './components/message/message'
// import listCard from './components/listCard/listCard'
// import webListCard from './components/webListCard/webListCard'
// import confirmPrompt from './components/confirmPrompt/confirmPrompt'
// import card from './components/card/card'
// import rpa from './components/rpa/rpa'
// import rpaList from './components/rpaList/rpaList'
// import end from './components/end/end'
// import knowledgeBase from './components/knowledgeBase/knowledgeBase'
// import datePrompt from './components/datePrompt/datePrompt'
// import numberPrompt from './components/numberPrompt/numberPrompt'
// import choicePrompt from './components/choicePrompt/choicePrompt'

// import ConnectionLine from './edges/connection-line';


const FlowZone = (props) => {

  const onPaneClick = () => {
    props.handleRightDrawerClose()
  };
  //console.log(Trig)
  const nodeTypes = {
    Handler: StartNode,

    // Card: card,
    // RPA: rpa,
    // RPAList: rpaList,
    Message: MessageNode,
    // ConfirmPrompt: confirmPrompt,
    // ListCard: listCard,
    // WebListCard: webListCard,
    // End: end,
    // KnowledgeBase: knowledgeBase,
    // DatePrompt: datePrompt,
    // ChoicePrompt: choicePrompt,
    // NumberPrompt: numberPrompt,

  };
  const edgeTypes = {
    buttonEdge: ButtonEdge
  }
  //const [elements, setElements] = useState([]);
  //const [elementPositionY, setElementPositionY] = useState(0);

  // const onElementsRemove = (elementsToRemove) => setElements((els) => {removeElements(elementsToRemove, els);console.log(els)});
  //const onConnect = (params) => setElements((els) => addEdge(params, els));
  //const onConnect = (params) => setElements(prevElements => addEdge(params, prevElements))
  //const onMoveEnd = (transform) => {/*console.log('zoom/move end', transform)*/;setZoomAndMoveObject({ x: transform.x, y: transform.y, zoom: transform.zoom })}

  // const onDragOver = (event, node) => {/*console.log('drag over', node)*/;event.preventDefault();};
  // const onDrop = (event, node) => {/*console.log('client : ', event.clientX , ' / ' + event.clientY )*/; addItem(event.clientX, event.clientY); event.preventDefault();}
  // );/
  console.log({ props });
  return (<ReactFlow
    className='h-full flex-1 w-full'

    onNodesChange={props.applyNodeChangesFunc}
    onEdgesChange={props.applyEdgeChangesFunc}
    // nodeDragThreshold={3}
    // onPaneContextMenu={onPaneContextMenu}
    // onNodeDragStart={onNodeDragStart}
    // onNodeDragStop={onNodeDragStop}
    // onSelectionDragStart={props.onSelectionDragStart}
    // onSelectionDrag={onSelectionDrag}
    // onSelectionDragStop={onSelectionDragStop}
    // onSelectionContextMenu={props.onSelectionContextMenu}
    // onSelectionChange={props.onSelectionChange}
    // onLoad={onLoad}
    // connectionLineStyle={connectionLineStyle}
    // connectionLineType={connectionLineType}
    // snapToGrid={true}
    // snapGrid={snapGrid}
    // onMoveEnd={onMoveEnd}
    // minZoom={0.1}
    // maxZoom={3}
    /////////////////////////////////////////
    onDragOver={props.onDragOver}
    onDrop={props.onDrop}
    // colorMode='dark'
    // elements={props.allDroppedElements.map(elem => {
    //   return {
    //     ...elem, data: {
    //       ...elem.data, onSelectionContextMenu: props.onSelectionContextMenu,
    //       handleRightClickOnHandleMenuOpenOrClose: props.handleRightClickOnHandleMenuOpenOrClose,
    //       onHandleMenuDeleteSelected: props.onHandleMenuDeleteSelected
    //     }
    //   }
    // })}
    onInit={props.setReactFlowInstance}
    nodes={props.state.nodes}
    edges={props.state.edges}
    onNodeClick={props.onElementClick}
    onPaneClick={onPaneClick}
    //onElementsRemove={props.onElementRemove}
    onConnect={props.onConnect}
    minZoom={0.1}
    colorMode={props.state.darkMode ? "dark" : "light"}
    //onPaneClick={onPaneClick}
    //onPaneScroll={onPaneScroll}
    //onPaneContextMenu={onPaneContextMenu}
    //onNodeDragStart={onNodeDragStart}
    onNodeDragStop={props.onNodeDragStop}
    onSelectionDragStop={props.onSelectionDragStop}
    //onSelectionDragStart={onSelectionDragStart}
    //onSelectionDrag={onSelectionDrag}
    //onSelectionDragStop={onSelectionDragStop}
    onSelectionContextMenu={props.onSelectionContextMenu}
    //onSelectionChange={onSelectionChange}
    onMoveEnd={props.onMoveEnd}
    onNodeContextMenu={props.handleNodeContextMenu}
    //onLoad={props.onLoad}
    //connectionLineStyle={connectionLineStyle}
    //connectionLineType={connectionLineType}
    //snapToGrid={true}
    nodeTypes={nodeTypes}
    edgeTypes={edgeTypes}

  // connectionLineComponent={ConnectionLine}
  //snapGrid={snapGrid}
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
      // style={{ background: "#fafafa" }}
      size={1}
    //gap={16}// Warning: Received NaN for the `x` and `y` attribute. If this is expected, cast the value to a string
    //variant="dots"
    />
    {/* <MiniMap nodeStrokeWidth={3} /> */}

  </ReactFlow>

  );
};

export default FlowZone;
