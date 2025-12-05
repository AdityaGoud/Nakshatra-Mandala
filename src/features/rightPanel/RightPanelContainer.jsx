// src/features/rightPanel/RightPanelContainer.jsx
import React, {useState} from "react";
import TabNavigation from "./TabNavigation";
import DetailsView from "./views/DetailsView";

const RightPanelContainer = ({hoverSelection, chartData, onBack}) => {
    const [activeTab, setActiveTab] = useState("details");

    return (
        <div className="info-panel">
            <div className="panel-header">
                {/*<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>*/}
                {/*    <h2 className="space-title" style={{ margin: 0 }}>Details</h2>*/}
                {/*    <button onClick={onBack} className="back-btn">← Back</button>*/}
                {/*</div>*/}
                <TabNavigation activeTab={activeTab} onTabChange={setActiveTab}/>
            </div>

            <div className="panel-content" >
                {activeTab === "details" && (
                    <DetailsView hoverSelection={hoverSelection} chartData={chartData}/>
                )}
            </div>
        </div>
    );
};

export default RightPanelContainer;
