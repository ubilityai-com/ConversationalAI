import { ConnectionLineComponentProps } from '@xyflow/react';

export default function ConnectionLine({ fromX, fromY, toX, toY }: ConnectionLineComponentProps) {

    return (
        <g>
            <path
                fill="none"
                stroke={"#b5b5b5"}
                strokeWidth={1.5}
                className="animated"
                d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
            />
            <circle
                cx={toX}
                cy={toY}
                fill="#4F46E5"
                r={3}
                stroke={""}
                strokeWidth={1.5}
            />
        </g>
    )
}