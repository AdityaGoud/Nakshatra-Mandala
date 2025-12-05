// src/features/rightPanel/views/DetailsView.jsx
import React from "react";
import { MELAKARTA_RAGAS, NAKSHATRAS, RASHIS } from "../../../data/mandalaData";
import { getPlanetDignity, getHouseNumber } from "../../../services/mappings";

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

        let statusColor = "#fff";
        if (dignity === "Exalted") statusColor = "#4ade80";
        if (dignity === "Debilitated") statusColor = "#f87171";
        if (dignity === "Own Sign") statusColor = "#60a5fa";

        const iconSrc = name === 'Jupiter' ? '/jupiter.ico' : `/${name.toLowerCase()}.png`;

        return (
            <div className="details-view planet-layout">
                {/* Top Header with Fixed Image */}
                <div className="planet-header">
                    <div className="planet-info-top">
                        <h2 className="planet-name">{name}</h2>
                        <span className="degree-pill">{degree.toFixed(2)}°</span>
                    </div>
                    <div className="icon-frame" style={{
                        maxWidth: '600px',  // Set your desired max width
                        overflow: 'hidden'
                    }}>
                        <img
                            src={iconSrc}
                            alt={name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'  // Key property: fits image without cropping
                            }}
                        />
                    </div>
                </div>

                {/* Grid Stats */}
                <div className="stats-grid">
                    {/* 1. HOUSE: Changed structure slightly for horizontal box look */}
                    <div className="stat-card house-card-row">
                        <div className="house-box-label">House</div>
                        <div className="house-box-value">{houseNum}</div>
                    </div>

                    {/* 2. Other cards remain the same... */}
                    <div className="stat-card">
                        <span className="label">Rashi</span>
                        <div className="value text-sm">{rashiName}</div>
                        <span className="sub">Sign</span>
                    </div>
                    <div className="stat-card">
                        <span className="label">Dignity</span>
                        <div className="value text-sm" style={{color: statusColor}}>{dignity}</div>
                        <span className="sub">Status</span>
                    </div>
                    <div className="stat-card">
                        <span className="label">Relation</span>
                        <div className="value text-sm">Neutral</div>
                        <span className="sub">Nature</span>
                    </div>
                </div>

                {/* Description */}
                <div className="planet-desc">
                    {name} is in the <strong>{houseNum}<sup>th</sup> House</strong> ({rashiName}).
                    It is currently {dignity}.
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
