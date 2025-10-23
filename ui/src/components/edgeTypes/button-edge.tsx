import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps
} from '@xyflow/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFlowStore } from '../../store/root-store';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [hovered, setHovered] = useState(false);
  const setEdges = useFlowStore(state => state.setEdges);
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleDelete = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };
  const strokeColor = hovered ? 'hsl(var(--primary))' : (style.stroke as string) || '#2ed573';

  const edgeStyle: React.CSSProperties = {
    ...style,
    pointerEvents: 'auto',
    stroke: strokeColor,
    strokeWidth: hovered ? 3 : 2,
    fill: 'none',
    transition: 'stroke-width 0.2s ease, stroke 0.2s ease',
  };
  return (
    <>
      <g
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group"
      >
        <BaseEdge path={edgePath} style={edgeStyle} markerEnd={markerEnd} interactionWidth={50}
        />
        <EdgeLabelRenderer>
          <div
            className="absolute flex items-center gap-1.5 nodrag nopan"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
          >
            {hovered && (
              <button
                onClick={handleDelete}
                className="rounded-full flex justify-center items-center w-7 h-7 border bg-background text-foreground hover:bg-primary hover:text-white transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        </EdgeLabelRenderer>
      </g>
    </>
  );
}