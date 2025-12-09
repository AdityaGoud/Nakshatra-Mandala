// src/features/mandala/MandalaContainer.jsx
import React, { useMemo, useState, useEffect } from "react";
import { ACTIVE_CHART_TYPES, RIGHT_PANEL_TABS } from "./mandala.types";
import NakshatraRagaMandala from "./nakshatraRagaMandala";
import RightPanelContainer from "../rightPanel/RightPanelContainer";
import {logger} from "../../utils/logger";
import SaturnBackground from '../../data/SaturnBackgroung.png'

// When your component mounts or renders:
// Set the CSS variable on a parent element, maybe document.documentElement or the component container ref
document.documentElement.style.setProperty('--saturn-bg-image', `url(${SaturnBackground})`);


const MandalaContainer = ({ chartData, onBack }) => {
    const [activeChartType, setActiveChartType] = useState(ACTIVE_CHART_TYPES.RASI);
    const [clickedPlanet, setClickedPlanet] = useState(null);
    const [activeTab, setActiveTab] = useState(RIGHT_PANEL_TABS.DETAILS);
    const [hoverSelection, setHoverSelection] = useState(null);

    logger.log('INIT', 'MandalaContainer mounted', null, 'MANDALA');

    // Track state changes
    useEffect(() => {
        if (hoverSelection) logger.log('HOVER', hoverSelection.type, hoverSelection, 'MANDALA');
    }, [hoverSelection]);

    useEffect(() => {
        if (clickedPlanet) logger.log('PLANET', clickedPlanet.name, null, 'MANDALA');
    }, [clickedPlanet]);

    const { ascendantDeg, planetPositions } = useMemo(() => {
        if (!chartData) {
            logger.log('DATA', 'No chartData', null, 'MANDALA');
            return { ascendantDeg: 0, planetPositions: [] };
        }

        const current = activeChartType === ACTIVE_CHART_TYPES.NAVAMSA
            ? chartData.navamsa || chartData.rasi
            : chartData.rasi;

        const result = {
            ascendantDeg: current?.ascendantDeg ?? 0,
            planetPositions: current?.planets ?? [],
        };

        logger.log('CALC', `Chart: ${activeChartType}`, {
            ascendantDeg: result.ascendantDeg,
            planetCount: result.planetPositions.length
        }, 'MANDALA');

        return result;
    }, [chartData, activeChartType]);

    const handleChartTypeChange = (type) => {
        logger.log('CHART', `Type: ${type}`, null, 'MANDALA');
        setActiveChartType(type);
    };

    const handleTabChange = (tab) => {
        logger.log('TAB', `Tab: ${tab}`, null, 'MANDALA');
        setActiveTab(tab);
    };

    logger.log('RENDER', 'Mandala rendering', {
        hover: hoverSelection?.type,
        planet: clickedPlanet?.name
    }, 'MANDALA');

    return (

        <div className="main-layout">
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

            <RightPanelContainer
                chartData={chartData}
                hoverSelection={hoverSelection}
                activeChartType={activeChartType}
                onChartTypeChange={handleChartTypeChange}
                clickedPlanet={clickedPlanet}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onBack={onBack}
            />
        </div>
    );
};

export default MandalaContainer;
