// src/features/rightPanel/views/NavamsaView.jsx

import React from "react";
import {ACTIVE_CHART_TYPES} from "../../../features/mandala/mandala.types";

/**
 * NavamsaView
 *
 * Right-panel tab focused on the Navamsa (D9) perspective.
 *
 * Current responsibilities:
 * - Explain what Navamsa is conceptually for the user.
 * - Let the user switch the mandala between:
 *    - Rasi chart view
 *    - Navamsa chart view
 *
 * Props:
 * - activeChartType: "rasi" | "navamsa" (from MandalaContainer)
 * - onChartTypeChange: (type) => void  (updates MandalaContainer state)
 * - chartData: ChartData | null
 *
 * Future extensions:
 * - Show Navamsa-specific details (e.g., D9 ascendant, key planets).
 * - Highlight marriage / dharma themes based on chartData.navamsa.
 */

const NavamsaView = ({activeChartType, onChartTypeChange, chartData}) => {
    const hasNavamsa = Boolean(chartData && chartData.navamsa);

    const handleSwitchToNavamsa = () => {
        if (!hasNavamsa) return;
        onChartTypeChange(ACTIVE_CHART_TYPES.NAVAMSA);
    };

    const handleSwitchToRasi = () => {
        onChartTypeChange(ACTIVE_CHART_TYPES.RASI);
    };

    const isNavamsaActive = activeChartType === ACTIVE_CHART_TYPES.NAVAMSA;

    return (
        <div className="info-content navamsa-view">
            <h2 className="space-title">Navamsa (D9)</h2>

            <p className="poetic-subtitle">
                Switch between Rāśi and Navamsa to see how the mandala transforms.
            </p>

            <div className="section-label">Active chart</div>
            <div className="tags-grid">
                <button
                    type="button"
                    className={`space-tag ${!isNavamsaActive ? "active-tag" : ""}`}
                    onClick={handleSwitchToRasi}
                >
                    Rāśi (D1)
                </button>
                <button
                    type="button"
                    className={`space-tag ${isNavamsaActive ? "active-tag" : ""}`}
                    onClick={handleSwitchToNavamsa}
                    disabled={!hasNavamsa}
                >
                    Navamsa (D9)
                </button>
            </div>

            {!hasNavamsa && (
                <>
                    <div className="section-label">Note</div>
                    <p className="description">
                        Navamsa data is not available yet in chartData. Once your backend
                        returns a D9 chart (chartData.navamsa), this tab will let you
                        fully switch the mandala to Navamsa positions.
                    </p>
                </>
            )}

            {hasNavamsa && (
                <>
                    <div className="section-label">What Navamsa Represents</div>
                    <p className="description">
                        The Navamsa (D9) chart refines the strength of planets and sheds
                        light on marriage, dharma, and deeper life patterns. Switching to
                        Navamsa view redraws the mandala using the D9 planetary positions.
                    </p>
                </>
            )}
        </div>
    );
};

export default NavamsaView;
