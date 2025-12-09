// src/features/rightPanel/components/InfoCard.jsx
import React from "react";

/**
 * InfoCard - Reusable info display card
 */
const InfoCard = ({ label, value }) => {
    return (
        <div className="grid-cell" style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 10px', //10,14
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '8px',
            minHeight: '40',
            flex: 1
        }}>
            <div className="cell-label" style={{
                fontSize: '13px',
                color: '#93c5fd',
                fontWeight: '500'
            }}>
                {label}
            </div>
            <div className="cell-value" style={{
                fontSize: '14px',
                color: '#fbbf24',
                fontWeight: '600'
            }}>
                {value}
            </div>
        </div>
    );
};

export default InfoCard;
