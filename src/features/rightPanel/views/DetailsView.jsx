// src/features/rightPanel/views/DetailsView.jsx
import React from "react";
import {MELAKARTA_RAGAS, NAKSHATRAS, RASHIS} from "../../../data/mandalaData";
import {getDashaForNakshatra} from "../../../data/dashaData";

const DetailsView = ({hoverSelection, chartData}) => {
    if (!hoverSelection) {
        return (
            <div className="details-view empty-state">
                <p className="poetic-subtitle" style={{textAlign: 'center', marginTop: '2rem'}}>
                    Hover over the mandala to explore the cosmic segments.
                </p>
            </div>
        );
    }

    // PLANET VIEW
    if (hoverSelection.type === "planet") {
        const {name, degree} = hoverSelection;
        const iconSrc = name === 'Jupiter' ? '/jupiter.ico' : `/${name.toLowerCase()}.png`;

        return (
            <div className="details-view planet-layout-redesign">
                {/* PLANET NAME AND DEGREE */}
                <div className="planet-title-section">
                    <h2 className="planet-name-gold">{name} {degree.toFixed(2)}°</h2>
                </div>

                {/* PLANET IMAGE */}
                <div className="planet-image-large">
                    <img src={iconSrc} alt={name}
                         style={{
                            width: '100%', height: '100%', objectFit: 'cover'
                        }}
                    />
                </div>


                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="grid-cell" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        width: '200px',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '8px',
                        minHeight: '50px',
                        flex: 1
                    }}>
                        <div className="cell-label" style={{
                            fontSize: '13px',
                            color: '#93c5fd',
                            fontWeight: '500'
                        }}>
                            House Dignity
                        </div>
                        <div className="cell-value" style={{
                            fontSize: '14px',
                            color: '#fbbf24',
                            fontWeight: '600'
                        }}>
                            ⬆️ Exalted
                        </div>
                    </div>
                    <div className="grid-cell" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '8px',
                        minHeight: '50px',
                        flex: 1
                    }}>
                        <div className="cell-label" style={{
                            fontSize: '13px',
                            color: '#93c5fd',
                            fontWeight: '500'
                        }}>
                            Rashi Dignity
                        </div>
                        <div className="cell-value" style={{
                            fontSize: '14px',
                            color: '#fbbf24',
                            fontWeight: '600'
                        }}>
                            Neutral
                        </div>
                    </div>
                </div>


            </div>
        );
    }

    // RASHI VIEW
    if (hoverSelection.type === "rashi") {
        const {index} = hoverSelection;
        const rashi = RASHIS[index];
        const details = {
            "Sub": "Zodiac Sign",
            "Overview": `${rashi} is a significant rashi in Vedic astrology. Planets here express themselves through its characteristic energies.`
        };

        return (
            <div className="details-view">
                <h2 className="space-title">{rashi}</h2>
                <p className="poetic-subtitle">Zodiac House #{index + 1}</p>
                <div className="section-label">Overview</div>
                <p className="description">{details.Overview}</p>
            </div>
        );
    }

    // NAKSHATRA VIEW
    if (hoverSelection.type === "nakshatra") {
        const {index} = hoverSelection;
        const nakshatra = NAKSHATRAS[index];
        const dashaInfo = getDashaForNakshatra(index);
        const {lord, details} = dashaInfo || {};

        return (
            <div className="details-view">
                <h2 className="space-title">{nakshatra}</h2>
                <p className="poetic-subtitle">Lunar Mansion #{index + 1}</p>

                {lord && (
                    <>
                        <div className="section-label">Dasha Lord</div>
                        <div className="tags-grid">
                            <span className="space-tag">{lord}</span>
                        </div>
                    </>
                )}

                {details?.summary && (
                    <>
                        <div className="section-label">Overview</div>
                        <p className="description">{details.summary}</p>
                    </>
                )}
            </div>
        );
    }

    // RAAGA VIEW
    if (hoverSelection.type === "raaga") {
        const {index} = hoverSelection;
        const raaga = MELAKARTA_RAGAS[index];

        return (
            <div className="details-view">
                <h2 className="space-title">{raaga}</h2>
                <p className="poetic-subtitle">Melakarta #{index + 1}</p>
                <p className="description">A beautiful raga in the Carnatic music tradition.</p>
            </div>
        );
    }

    return (
        <div className="details-view empty-state">
            <p className="poetic-subtitle" style={{textAlign: 'center', marginTop: '2rem'}}>
                Unknown selection type.
            </p>
        </div>
    );
};

export default DetailsView;
