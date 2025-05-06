import { getSmoothStepPath, useReactFlow, EdgeProps } from '@xyflow/react'
import { useState, MouseEvent } from 'react'
import "./index.css"
const foreignObjectSize = 40

const ButtonEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd
}: EdgeProps) => {
  const [edgePath, edgeCenterX, edgeCenterY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })

  const reactFlowInstance = useReactFlow()
  const [isVisible, setIsVisible] = useState(false)

  const onEdgeClick = (evt: MouseEvent, edgeId: string) => {
    evt.stopPropagation()
    const edgeToDelete = reactFlowInstance.getEdge(edgeId)
    // You can now use `edgeToDelete` or call `reactFlowInstance.setEdges` to remove it
    console.log('Delete edge:', edgeToDelete)
  }

  return (
    <>
      <path
        id={id}
        style={style}
        className='react-flow__edge-path'
        d={edgePath}
        markerEnd={markerEnd}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />

      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className='edgebutton-foreignobject'
        requiredExtensions='http://www.w3.org/1999/xhtml'
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {isVisible && (
          <div>
            <button
              className='edgebutton'
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={(event) => onEdgeClick(event, id)}
            >
              ×
            </button>
          </div>
        )}
      </foreignObject>
    </>
  )
}

export default ButtonEdge
