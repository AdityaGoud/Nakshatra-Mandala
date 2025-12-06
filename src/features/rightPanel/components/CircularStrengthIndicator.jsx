import React from "react";

/**
 * CircularStrengthIndicator
 * 
 * Displays a circular progress ring showing planet strength as a percentage.
 * Uses SVG for crisp, scalable rendering.
 * 
 * Props:
 * - strength: number (0-100) - The strength percentage to display
 * - size: number (default 120) - Diameter of the circle in pixels
 * - className: string (optional) - Additional CSS classes
 */
const CircularStrengthIndicator = ({ strength = 75, size = 120, className = "" }) => {
    // SVG parameters
    const radius = (size - 12) / 2; // Leave padding for stroke
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (strength / 100) * circumference;

    const center = size / 2;
    const strokeWidth = 6;

    return (
        <div className={`strength-indicator-container ${className}`}>
            <svg width={size} height={size} className="strength-indicator-svg">
                {/* Background circle (dark) */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={strokeWidth}
                />

                {/* Progress circle (gradient) */}
                <defs>
                    <linearGradient
                        id="strengthGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="#7dd3fc" /> {/* Cyan */}
                        <stop offset="100%" stopColor="#a78bfa" /> {/* Purple */}
                    </linearGradient>
                </defs>

                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="url(#strengthGradient)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                        transition: "stroke-dashoffset 0.6s ease",
                        transform: "rotate(-90deg)",
                        transformOrigin: `${center}px ${center}px`,
                    }}
                />

                {/* Center percentage text */}
                <text
                    x={center}
                    y={center}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="strength-percent-text"
                    fill="white"
                    fontSize={size * 0.35}
                    fontWeight="700"
                    fontFamily="Inter, sans-serif"
                >
                    {strength}
                </text>
                <text
                    x={center}
                    y={center + size * 0.22}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="strength-label-text"
                    fill="rgba(255, 255, 255, 0.7)"
                    fontSize={size * 0.12}
                    fontFamily="Inter, sans-serif"
                    letterSpacing="0.5px"
                >
                    STR
                </text>
            </svg>
        </div>
    );
};

export default CircularStrengthIndicator;
