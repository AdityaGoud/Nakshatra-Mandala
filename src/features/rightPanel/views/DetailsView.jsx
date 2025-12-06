// src/features/rightPanel/views/DetailsView.jsx
import React from "react";
import { MELAKARTA_RAGAS, NAKSHATRAS, RASHIS } from "../../../data/mandalaData";
import { getPlanetDignity, getHouseNumber, getNakshatraInfoFromDegree } from "../../../services/mappings";
import { getDashaForNakshatra } from "../../../data/dashaData";
import { calculatePlanetStrength } from "../../../services/astrologyStrengthCalculator";
import CircularStrengthIndicator from "../components/CircularStrengthIndicator";

const DetailsView = ({ hoverSelection, chartData }) => {
    if (!hoverSelection) {
        return (
            <div className="details-view empty-state">
                <p className="poetic-subtitle" style={{textAlign:'center', marginTop:'2rem'}}>
                    Hover over the mandala to explore the cosmic segments.
                </p>
            </div>
        );
    }

    // PLANET VIEW
    if (hoverSelection.type === "planet") {
        const { name, degree } = hoverSelection;
        const ascendantDeg = chartData?.rasi?.ascendantDeg || 0;
        const dignity = getPlanetDignity(name, degree);
        const houseNum = getHouseNumber(degree, ascendantDeg);
        const rashiIndex = Math.floor(degree / 30) % 12;
        const rashiName = RASHIS[rashiIndex];

        // Get Nakshatra info
        const nakshatraInfo = getNakshatraInfoFromDegree(degree);
        const dashaInfo = getDashaForNakshatra(nakshatraInfo.index);
        const nakshatraLord = dashaInfo?.lord || "Unknown";

        // Calculate strength
        const strengthData = calculatePlanetStrength(name, degree, houseNum, dignity);
        const overallStrength = strengthData.overall_strength;

        let statusColor = "#fff";
        if (dignity === "Exalted") statusColor = "#4ade80";
        if (dignity === "Debilitated") statusColor = "#f87171";
        if (dignity === "Own Sign") statusColor = "#60a5fa";

        const iconSrc = name === 'Jupiter' ? '/jupiter.ico' : `/${name.toLowerCase()}.png`;

        return (
            <div className="details-view planet-layout">
                {/* HEADER SECTION: Planet Image + Strength Ring */}
                <div className="planet-header-with-strength">
                    <div className="planet-image-section">
                        <div className="icon-frame">
                            <img
                                src={iconSrc}
                                alt={name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                        {/* Strength Ring Overlay */}
                        <div className="strength-ring-overlay">
                            <CircularStrengthIndicator strength={overallStrength} size={100} />
                        </div>
                    </div>

                    <div className="planet-header-text">
                        <h2 className="planet-name">{name}</h2>
                        <span className="degree-pill">{degree.toFixed(2)}°</span>
                    </div>
                </div>

                {/* PRIMARY DETAILS ROW 1: House, Rashi, Dignity, Nakshatra */}
                <div className="details-card-grid details-row-1">
                    <div className="detail-card detail-card--primary detail-card--house">
                        <div className="card-icon">🏠</div>
                        <div className="card-content">
                            <div className="card-value">{houseNum}</div>
                            <div className="card-label">House</div>
                        </div>
                    </div>

                    <div className="detail-card detail-card--primary detail-card--rashi">
                        <div className="card-icon">♒</div>
                        <div className="card-content">
                            <div className="card-value">{rashiName}</div>
                            <div className="card-label">Rashi</div>
                        </div>
                    </div>

                    <div className="detail-card detail-card--primary detail-card--dignity">
                        <div className="card-icon">⭐</div>
                        <div className="card-content">
                            <div className="card-value" style={{color: statusColor}}>{dignity}</div>
                            <div className="card-label">Dignity</div>
                        </div>
                    </div>

                    <div className="detail-card detail-card--primary detail-card--nakshatra">
                        <div className="card-icon">🌙</div>
                        <div className="card-content">
                            <div className="card-value">{nakshatraInfo.name.split(" ")[0]}</div>
                            <div className="card-label">Nakshatra</div>
                        </div>
                    </div>
                </div>

                {/* SECONDARY DETAILS ROW 2: Lord, Navamsa, Awastha, Sthan */}
                <div className="details-card-grid details-row-2">
                    <div className="detail-card detail-card--secondary detail-card--lord">
                        <div className="card-icon">👑</div>
                        <div className="card-content">
                            <div className="card-value">{nakshatraLord}</div>
                            <div className="card-label">Nak. Lord</div>
                        </div>
                    </div>

                    <div className="detail-card detail-card--secondary detail-card--navamsa">
                        <div className="card-icon">◇</div>
                        <div className="card-content">
                            <div className="card-value">N/A</div>
                            <div className="card-label">Navamsa</div>
                        </div>
                    </div>

                    <div className="detail-card detail-card--secondary detail-card--awastha">
                        <div className="card-icon">🔥</div>
                        <div className="card-content">
                            <div className="card-value">Pending</div>
                            <div className="card-label">Awastha</div>
                        </div>
                    </div>

                    <div className="detail-card detail-card--secondary detail-card--sthan">
                        <div className="card-icon">📍</div>
                        <div className="card-content">
                            <div className="card-value">Pending</div>
                            <div className="card-label">Sthan</div>
                        </div>
                    </div>
                </div>

                {/* INTERPRETATION SUMMARY */}
                <div className="interpretation-box">
                    <div className="interpretation-title">Snapshot</div>
                    <p className="interpretation-text">
                        <strong>{name}</strong> in <strong>{houseNum}<sup>th</sup> House</strong>
                        ({rashiName}) • <strong>{nakshatraInfo.name}</strong>
                        ruled by <strong>{nakshatraLord}</strong> • <strong>{dignity}</strong>
                        with <strong>{overallStrength}%</strong> strength
                    </p>
                </div>
            </div>
        );
    }

    // OTHER VIEWS (Rashi/Nak/Raga)
    let title = "", sub = "", desc = "";
    if (hoverSelection.type === "rashi") {
        title = RASHIS[hoverSelection.index]; sub = `Rashi #${hoverSelection.index+1}`; desc = "Zodiac Sign";
    } else if (hoverSelection.type === "nakshatra") {
        title = NAKSHATRAS[hoverSelection.index]; sub = `Nakshatra #${hoverSelection.index+1}`; desc = "Lunar Mansion";
    } else if (hoverSelection.type === "raaga") {
        title = MELAKARTA_RAGAS[hoverSelection.index]; sub = `Melakarta #${hoverSelection.index+1}`; desc = "Parent Raga";
    }

    return (
        <div className="details-view">
            <h2 className="space-title" style={{fontSize:'1.6rem'}}>{title}</h2>
            <p className="poetic-subtitle">{sub}</p>
            <div className="section-label" style={{marginTop:'1rem'}}>Overview</div>
            <p className="description">{desc}</p>
        </div>
    );
};

export default DetailsView;
