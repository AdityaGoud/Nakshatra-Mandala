// src/features/rightPanel/RightPanelContainer.jsx
import React, {useState, useEffect} from "react";
import TabNavigation from "./TabNavigation";
import DetailsView from "./views/DetailsView";
import ElementalBackground from "./components/ElementalBackground";
import "../../styles/rightPanel.css";
import {logger} from "../../utils/logger";

const RightPanelContainer = ({hoverSelection, chartData, clickedPlanet, activeTab: externalActiveTab, onTabChange}) => {
    const [activeTab, setActiveTab] = useState("details");

    logger.log('INIT', 'Panel mounted', null, 'PANEL');

    useEffect(() => {
        if (hoverSelection) logger.log('HOVER', hoverSelection.type, hoverSelection, 'PANEL');
    }, [hoverSelection]);

    useEffect(() => {
        if (clickedPlanet) logger.log('PLANET', clickedPlanet.name, null, 'PANEL');
    }, [clickedPlanet]);

    const getElementType = (planetName) => {
        const elementMap = {
            'Mars': 'air', 'Sun': 'water', 'Jupiter': 'fire', 'Venus': 'earth',
            'Mercury': 'ether', 'Saturn': 'earth', 'Moon': 'water', 'Rahu': 'ether', 'Ketu': 'ether',
        };
        return elementMap[planetName] || null;
    };

    const elementType = clickedPlanet ? getElementType(clickedPlanet.name) : null;
    const elementClass = elementType ? `element-${elementType}` : '';

    const handleTabChange = (newTab) => {
        logger.log('TAB', `Tab: ${newTab}`, null, 'PANEL');
        setActiveTab(newTab);
        if (onTabChange) onTabChange(newTab);
    };

    return (
        <div className={`info-panel ${elementClass}`}>
            {elementType && <ElementalBackground elementType={elementType} />}

            <div className="panel-header">
                <div className="innerbox-1-2">
                    <TabNavigation activeTab={activeTab} onTabChange={handleTabChange}/>
                </div>
            </div>

            <div className="panel-content">
                {activeTab === "details" && (
                    <DetailsView
                        hoverSelection={hoverSelection}
                        chartData={chartData}
                        clickedPlanet={clickedPlanet}
                    />
                )}
            </div>
        </div>
    );
};

export default RightPanelContainer;
