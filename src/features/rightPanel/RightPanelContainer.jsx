import React, {useState} from "react";
import TabNavigation from "./TabNavigation";
import DetailsView from "./views/DetailsView";
import ElementalBackground from "./components/ElementalBackground";
import "../../styles/rightPanel.css";

const RightPanelContainer = ({hoverSelection, chartData, clickedPlanet, onBack}) => {
    const [activeTab, setActiveTab] = useState("details");

    const getElementType = (planetName) => {
        const elementMap = {
            'Mars': 'air',
            'Sun': 'water',
            'Jupiter': 'fire',
            'Venus': 'earth',
            'Mercury': 'ether',
            'Saturn': 'earth',
            'Moon': 'water',
            'Rahu': 'ether',
            'Ketu': 'ether',
        };
        return elementMap[planetName] || null;
    };

    const elementType = clickedPlanet ? getElementType(clickedPlanet.name) : null;
    const elementClass = elementType ? `element-${elementType}` : '';

    return (
        <div className={`info-panel ${elementClass}`}>
            {/* Animated particle background */}
            {elementType && <ElementalBackground elementType={elementType} />}

            <div className="panel-header">
                <div className="innerbox-1-2">
                    <TabNavigation activeTab={activeTab} onTabChange={setActiveTab}/>
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
