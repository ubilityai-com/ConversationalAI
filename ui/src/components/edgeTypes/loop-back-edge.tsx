import { BaseEdge, EdgeLabelRenderer, EdgeProps, useReactFlow } from '@xyflow/react';
import { Trash2 } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

interface StepLoopBackEdgeProps extends EdgeProps { }

export default function StepLoopBackEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    markerEnd,
    style = {},
}: StepLoopBackEdgeProps) {
    const { setEdges } = useReactFlow();
    const [hovered, setHovered] = useState(false);

    const H_OFFSET = 50;
    const V_OFFSET = 200;
    const ARC = 15;

    /** 
     * Generate SVG path for loop-back edge
     */
    const path = useMemo(() => {
        const start = `M ${sourceX},${sourceY}`;

        // Rightward horizontal line
        const lineRight = `L ${sourceX + H_OFFSET},${sourceY}`;

        // Curve down-right
        const curveDownRight = `Q ${sourceX + H_OFFSET + ARC},${sourceY} ${sourceX + H_OFFSET + ARC},${sourceY + ARC}`;

        // Vertical line down
        const lineDown = `L ${sourceX + H_OFFSET + ARC},${sourceY + V_OFFSET}`;

        // Curve left-bottom
        const curveLeftBottom = `Q ${sourceX + H_OFFSET + ARC},${sourceY + V_OFFSET + ARC} ${sourceX + H_OFFSET},${sourceY + V_OFFSET + ARC}`;

        // Horizontal line to left side of target
        const lineLeft = `L ${targetX - H_OFFSET},${sourceY + V_OFFSET + ARC}`;

        // Curve up-left
        const curveUpLeft = `Q ${targetX - H_OFFSET - ARC},${sourceY + V_OFFSET + ARC} ${targetX - H_OFFSET - ARC},${sourceY + V_OFFSET - ARC}`;

        // Vertical line up to target level
        const lineUp = `L ${targetX - H_OFFSET - ARC},${targetY + ARC}`;

        // Curve into target
        const curveIntoTarget = `Q ${targetX - H_OFFSET - ARC},${targetY} ${targetX - H_OFFSET},${targetY}`;

        // Final line to target
        const lineToTarget = `L ${targetX},${targetY}`;

        return [
            start,
            lineRight,
            curveDownRight,
            lineDown,
            curveLeftBottom,
            lineLeft,
            curveUpLeft,
            lineUp,
            curveIntoTarget,
            lineToTarget,
        ].join(' ');
    }, [sourceX, sourceY, targetX, targetY]);

    /**
     * Midpoint for rendering buttons/label
     */
    const midPoint = useMemo(
        () => ({
            x: (sourceX + targetX) / 2,
            y: sourceY + V_OFFSET + ARC,
        }),
        [sourceX, targetX, sourceY]
    );

    const handleDelete = useCallback(() => {
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
    }, [id, setEdges]);

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
        <g
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group"
        >
            <BaseEdge
                id={id}
                path={path}
                markerEnd={markerEnd}
                style={edgeStyle}
                interactionWidth={20}
            />

            <EdgeLabelRenderer>
                <div
                    className="absolute flex items-center gap-1.5 nodrag nopan"
                    style={{
                        transform: `translate(-50%, -50%) translate(${midPoint.x}px,${midPoint.y}px)`,
                        pointerEvents: 'all',
                    }}
                >
                    {/* Static arrow in the middle */}
                    <svg
                        width={16}
                        height={16}
                        className={`transition-colors ${hovered ? 'text-primary' : ''}`}
                        style={{ color: hovered ? undefined : style.stroke }}
                    >
                        <polygon points="14,2 4,8 14,14" fill="currentColor" />
                    </svg>

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
    );
}
