// src/features/mandala/MandalaContainer.jsx

import React, {useMemo, useState} from "react";
import {ACTIVE_CHART_TYPES, RIGHT_PANEL_TABS} from "./mandala.types";
import NakshatraRagaMandala from "./nakshatraRagaMandala";
import RightPanelContainer from "../rightPanel/RightPanelContainer";

/**
 * MandalaContainer
 *
 * Container component for the main "Mandala" screen (Step 2).
 * Responsibilities:
 * - Receive full `chartData` from app (rasi, navamsa, metadata).
 * - Decide which chart type is active (Rasi vs Navamsa).
 * - Derive the planet positions and ascendant degree to feed the canvas.
 * - Hold hover state from the mandala and pass it into the right panel.
 * - Provide a "Back" action to return to the onboarding screen.
 *
 * Presentational components used:
 * - NakshatraRagaMandala: draws the circular mandala on <canvas>.
 * - RightPanelContainer: tabbed views (Details / Dasha / Navamsa).
 */

const MandalaContainer = ({chartData, onBack}) => {
    // Which chart is currently visualized in the mandala: "rasi" | "navamsa"
    const [activeChartType, setActiveChartType] = useState(
        ACTIVE_CHART_TYPES.RASI
    );

    // NEW: Track clicked planet for background change
    const [clickedPlanet, setClickedPlanet] = useState(null);

    // Which tab is currently active on the right panel
    const [activeTab, setActiveTab] = useState(RIGHT_PANEL_TABS.DETAILS);

    // What segment / element in the mandala is currently hovered
    const [hoverSelection, setHoverSelection] = useState(null);

    /**
     * Derive planet positions and ascendant for the currently active chart.
     * This keeps the canvas component "dumb" – it just draws what it receives.
     *
     * Expected `chartData` shape (you will refine with real API):
     * {
     *   rasi: {
     *     ascendantDeg: number,
     *     planets: PlanetPosition[],
     *   },
     *   navamsa?: {
     *     ascendantDeg: number,
     *     planets: PlanetPosition[],
     *   },
     *   meta: { ... }
     * }
     */
    const {ascendantDeg, planetPositions} = useMemo(() => {
        if (!chartData) {
            return {ascendantDeg: 0, planetPositions: []};
        }

        const current =
            activeChartType === ACTIVE_CHART_TYPES.NAVAMSA
                ? chartData.navamsa || chartData.rasi
                : chartData.rasi;

        return {
            ascendantDeg: current?.ascendantDeg ?? 0,
            planetPositions: current?.planets ?? [],
        };
    }, [chartData, activeChartType]);

    return (
        <div className="main-layout">
            {/* Left: Mandala canvas */}
            <div className="mandala-container">
                <div className="mandala-wrapper">
                    <NakshatraRagaMandala
                        ascendantDeg={ascendantDeg}
                        planetPositions={planetPositions}
                        onHoverChange={setHoverSelection}
                        onPlanetClick={setClickedPlanet}
                    />
                </div>
            </div>

            {/* Right: Tabbed info panel */}
            <RightPanelContainer
                chartData={chartData}
                hoverSelection={hoverSelection}
                activeChartType={activeChartType}
                onChartTypeChange={setActiveChartType}
                clickedPlanet={clickedPlanet}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onBack={onBack}
            />
        </div>
    );
};

export default MandalaContainer;
