// src/features/rightPanel/views/DetailsView.jsx

import React from "react";
import { MELAKARTA_RAGAS, NAKSHATRAS, RASHIS } from "../../../data/mandalaData";
import { getPlanetDignity, getHouseNumber } from "../../../services/mappings";

const DetailsView = ({ hoverSelection, chartData }) => {
    if (!hoverSelection) {
        return (
            <div className="info-content details-view empty-state">
                <p className="poetic-subtitle">
                    Move your cursor over the mandala to explore Rashis, Nakshatras, Ragas, and Planets.
                </p>
            </div>
        );
    }

    // --- PLANET HOVER (New Grid Layout) ---
    if (hoverSelection.type === "planet") {
        const { name, degree } = hoverSelection;

        // Calculations
        const ascendantDeg = chartData?.rasi?.ascendantDeg || 0;
        const dignity = getPlanetDignity(name, degree);
        const houseNum = getHouseNumber(degree, ascendantDeg);
        const rashiIndex = Math.floor(degree / 30) % 12;
        const rashiName = RASHIS[rashiIndex];

        // Dignity Color
        let statusColor = "#ffffff";
        if (dignity === "Exalted") statusColor = "#4ade80";
        if (dignity === "Debilitated") statusColor = "#f87171";
        if (dignity === "Own Sign") statusColor = "#60a5fa";

        // Image Source Logic
        const iconSrc = name === 'Jupiter' ? '/jupiter.ico' : `/${name.toLowerCase()}.png`;

        return (
            <div className="info-content details-view planet-vertical-layout">

                {/* 1. Header Section (Centered) */}
                <div className="planet-header-section">
                    <h2 className="planet-title">{name}</h2>

                    <div className="planet-icon-container">
                        <img src={iconSrc} alt={name} className="planet-icon-img" />
                    </div>

                    <div className="planet-degree-badge">
                        Longitude: {degree.toFixed(2)}°
                    </div>
                </div>

                {/* 2. Stats Grid (2 Columns) */}
                <div className="planet-stats-grid">

                    {/* Box 1: House */}
                    <div className="stat-box">
                        <span className="stat-label">House</span>
                        <div className="stat-value-box">
                            {houseNum}
                        </div>
                        <span className="stat-subtext">Bhava</span>
                    </div>

                    {/* Box 2: Rashi */}
                    <div className="stat-box">
                        <span className="stat-label">Rashi</span>
                        <div className="stat-value-box text-sm">
                            {rashiName}
                        </div>
                        <span className="stat-subtext">Sign</span>
                    </div>

                    {/* Box 3: Dignity */}
                    <div className="stat-box">
                        <span className="stat-label">Dignity</span>
                        <div className="stat-value-box text-sm" style={{ color: statusColor, fontWeight: 700 }}>
                            {dignity}
                        </div>
                        <span className="stat-subtext">Status</span>
                    </div>

                    {/* Box 4: Relationship (Placeholder) */}
                    <div className="stat-box">
                        <span className="stat-label">Relation</span>
                        <div className="stat-value-box text-sm">
                            Neutral
                        </div>
                        <span className="stat-subtext">With Lord</span>
                    </div>

                </div>

                {/* 3. Description Footer */}
                <div className="planet-description-footer">
                    <p>
                        {name} is placed in the <strong>{houseNum}<sup>th</sup> House</strong> in {rashiName}.
                    </p>
                </div>

            </div>
        );
    }

    // --- EXISTING LOGIC FOR RASHI / NAK / RAGA (Unchanged) ---
    let title = "";
    let subtitle = "";
    let description = "";

    if (hoverSelection.type === "rashi") {
        const index = hoverSelection.index;
        title = RASHIS[index];
        subtitle = `Rashi #${index + 1}`;
        description = "Zodiac sign representing a 30° sector of the sky.";
    } else if (hoverSelection.type === "nakshatra") {
        const index = hoverSelection.index;
        title = NAKSHATRAS[index];
        subtitle = `Nakshatra #${index + 1}`;
        description = "Lunar mansion representing the Moon's daily motion.";
    } else if (hoverSelection.type === "raaga") {
        const index = hoverSelection.index;
        title = MELAKARTA_RAGAS[index];
        subtitle = `Melakarta #${index + 1}`;
        description = "Fundamental musical scale in Carnatic music system.";
    } else {
        return null; // Should be handled by empty state above
    }

    return (
        <div className="info-content details-view">
            <h2 className="space-title">{title}</h2>
            <p className="poetic-subtitle">{subtitle}</p>
            <div className="section-label">Overview</div>
            <p className="description">{description}</p>
        </div>
    );
};

export default DetailsView;
