import React from "react";
import { cn } from "../../lib/utils/utils";

interface CircularLoaderProps {
    size?: number; // in px
    thickness?: number; // stroke width
    className?: string;
    color?: string;
}

export const CircularLoader: React.FC<CircularLoaderProps> = ({
    size = 40,
    thickness = 4,
    color,
    className,
}) => {
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <svg
            className={cn("animate-spin text-primary", className)}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
        >
            <circle
                className="opacity-25"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={thickness}
                fill="none"
            />
            <circle
                className="opacity-75"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={thickness}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * 0.75}
            />
        </svg>
    );
};
