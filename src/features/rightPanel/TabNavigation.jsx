// src/features/rightPanel/TabNavigation.jsx
import React from "react";
import { RIGHT_PANEL_TABS } from "../mandala/mandala.types";
import {logger} from "../../utils/logger";

const TabNavigation = ({ activeTab, onTabChange }) => {
    const tabs = [
        { key: RIGHT_PANEL_TABS.DETAILS, label: "Details" },
        { key: RIGHT_PANEL_TABS.DASHA, label: "Dasha" },
        { key: RIGHT_PANEL_TABS.NAVAMSA, label: "Divisional" },
    ];

    const handleTabClick = (tabKey) => {
        logger.log('TAB', `Tab clicked: ${tabKey}`, { from: activeTab, to: tabKey }, 'TAB_NAV');
        onTabChange(tabKey);
    };

    return (
        <div className="tab-nav">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    className={`tab-btn ${activeTab === tab.key ? "tab-btn-active" : ""}`}
                    onClick={() => handleTabClick(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;
