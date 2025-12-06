import React from "react";

/**
 * HorizontalStrengthBar
 * 
 * Displays a horizontal progress bar showing planet strength as a percentage.
 * 
 * Props:
 * - strength: number (0-100) - The strength percentage to display
 * - className: string (optional) - Additional CSS classes
 */
const HorizontalStrengthBar = ({ strength = 70, className = "" }) => {
    const clampedStrength = Math.min(100, Math.max(0, strength));

    return (
        <div className={`strength-bar-container ${className}`}>
            <div className="strength-bar-background">
                <div 
                    className="strength-bar-fill"
                    style={{
                        width: `${clampedStrength}%`
                    }}
                ></div>
            </div>
            <div className="strength-bar-label">
                Strength: <span className="strength-percentage">{clampedStrength}%</span>
            </div>
        </div>
    );
};

export default HorizontalStrengthBar;
