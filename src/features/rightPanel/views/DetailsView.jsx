// src/features/rightPanel/views/DetailsView.jsx
import React from "react";
import { MELAKARTA_RAGAS, NAKSHATRAS, RASHIS } from "../../../data/mandalaData";
import { getPlanetDignity, getHouseNumber, getNakshatraInfoFromDegree } from "../../../services/mappings";
import { getDashaForNakshatra } from "../../../data/dashaData";

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

        let statusColor = "#fff";
        if (dignity === "Exalted") statusColor = "#4ade80";
        if (dignity === "Debilitated") statusColor = "#f87171";
        if (dignity === "Own Sign") statusColor = "#60a5fa";

        const iconSrc = name === 'Jupiter' ? '/jupiter.ico' : `/${name.toLowerCase()}.png`;

        return (
            <div className="details-view planet-layout">
                {/* Top Header with Planet Name and Icon */}
                <div className="planet-header">
                    <div className="planet-info-top">
                        <h2 className="planet-name">{name}</h2>
                        <span className="degree-pill">{degree.toFixed(2)}°</span>
                    </div>
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
                </div>

                {/* PRIMARY STATS GRID - House, Rashi, Dignity, Navamsa */}
                <div className="stats-grid">
                    <div className="stat-card stat-primary">
                        <span className="label">House</span>
                        <div className="value">{houseNum}</div>
                        <span className="sub">Position</span>
                    </div>

                    <div className="stat-card stat-primary">
                        <span className="label">Rashi</span>
                        <div className="value text-sm">{rashiName}</div>
                        <span className="sub">Sign</span>
                    </div>

                    <div className="stat-card stat-primary">
                        <span className="label">Dignity</span>
                        <div className="value text-sm" style={{color: statusColor}}>{dignity}</div>
                        <span className="sub">Status</span>
                    </div>

                    <div className="stat-card stat-primary">
                        <span className="label">Navamsa</span>
                        <div className="value text-sm">N/A</div>
                        <span className="sub">D-9 Rashi</span>
                    </div>
                </div>

                {/* NAKSHATRA SECTION */}
                <div className="section-divider"></div>
                <div className="section-header">
                    <div className="section-title">Nakshatra Details</div>
                </div>

                <div className="nakshatra-info">
                    <div className="nakshatra-name-box">
                        <span className="nakshatra-label">Lunar Mansion</span>
                        <h3 className="nakshatra-name">{nakshatraInfo.name}</h3>
                        <span className="nakshatra-number">#{nakshatraInfo.number}</span>
                    </div>
                </div>

                <div className="lord-card">
                    <span className="lord-label">Nakshatra Lord</span>
                    <div className="lord-badge">{nakshatraLord}</div>
                </div>

                {/* ADVANCED DETAILS SECTION */}
                <div className="section-divider"></div>
                <div className="advanced-grid">
                    <div className="detail-box">
                        <span className="detail-label">Awastha</span>
                        <div className="detail-value">API Pending</div>
                        <span className="detail-sub">State</span>
                    </div>

                    <div className="detail-box">
                        <span className="detail-label">Sthan</span>
                        <div className="detail-value">API Pending</div>
                        <span className="detail-sub">Placement</span>
                    </div>

                    <div className="detail-box">
                        <span className="detail-label">Aspects</span>
                        <div className="detail-value">-</div>
                        <span className="detail-sub">Grahas</span>
                    </div>
                </div>

                {/* INTERPRETATION SUMMARY */}
                <div className="planet-desc">
                    <strong>{name}</strong> resides in <strong>{houseNum}<sup>th</sup> House</strong> ({rashiName})
                    within <strong>{nakshatraInfo.name}</strong> Nakshatra,
                    ruled by <strong>{nakshatraLord}</strong>.
                    Currently <strong>{dignity}</strong>.
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
