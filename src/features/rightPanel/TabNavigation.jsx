// src/features/rightPanel/TabNavigation.jsx

import React from "react";
import {RIGHT_PANEL_TABS} from "../mandala/mandala.types";

/**
 * TabNavigation
 *
 * Simple tab button row for the right-hand panel.
 *
 * Props:
 * - activeTab: one of RIGHT_PANEL_TABS keys
 * - onTabChange: (tabKey) => void
 *
 * It does NOT manage its own state – the parent (RightPanelContainer)
 * decides which tab is active and passes it down.
 */

const TabNavigation = ({activeTab, onTabChange}) => {
    const tabs = [
        {key: RIGHT_PANEL_TABS.DETAILS, label: "Details"},
        {key: RIGHT_PANEL_TABS.DASHA, label: "Dasha"},
        {key: RIGHT_PANEL_TABS.NAVAMSA, label: "Navamsa"},
    ];

    return (
        <div className="tab-nav">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    className={`tab-btn ${activeTab === tab.key ? "tab-btn-active" : ""}`}
                    onClick={() => onTabChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;
