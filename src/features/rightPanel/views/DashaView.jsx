// src/features/rightPanel/views/DashaView.jsx

import React from "react";
import {getDashaForNakshatra} from "../../../data/dashaData";

/**
 * DashaView
 *
 * Right-panel tab that shows high-level Vimshottari Dasha info
 * based on the currently hovered Nakshatra in the mandala.
 *
 * Props:
 * - hoverSelection: HoverSelection | null  (from MandalaContainer)
 * - chartData: ChartData | null            (from app via MandalaContainer)
 *
 * Current behaviour:
 * - If nothing is hovered → show instructions.
 * - If a Nakshatra segment is hovered → show its Dasha lord + summary.
 * - If something else is hovered → ask user to hover a Nakshatra.
 *
 * Later you can expand this to:
 * - Show actual Mahadasha start/end dates from chartData.
 * - Show Antardasha breakdown.
 * - Link to a full Dasha timeline screen.
 */

const DashaView = ({hoverSelection, chartData}) => {
    // 1. No hover yet
    if (!hoverSelection) {
        return (
            <div className="info-content dasha-view">
                <h2 className="space-title">Vimshottari Dasha</h2>
                <p className="poetic-subtitle">
                    Hover over a Nakshatra in the mandala to see its Dasha ruler.
                </p>
            </div>
        );
    }

    // 2. Hover is not a Nakshatra
    if (hoverSelection.type !== "nakshatra") {
        return (
            <div className="info-content dasha-view">
                <h2 className="space-title">Vimshottari Dasha</h2>
                <p className="poetic-subtitle">
                    Dasha view is based on Nakshatras. Move your cursor to the Nakshatra ring.
                </p>
            </div>
        );
    }

    // 3. Hover is a Nakshatra: get its Dasha lord details
    const nakIndex = hoverSelection.index; // 0–26, code index
    const nakshatraNumber = nakIndex + 1;  // 1–27, astrology style

    const dashaInfo = getDashaForNakshatra(nakIndex);
    if (!dashaInfo) {
        return (
            <div className="info-content dasha-view">
                <h2 className="space-title">Vimshottari Dasha</h2>
                <p className="poetic-subtitle">
                    Unable to resolve Dasha lord for this Nakshatra.
                </p>
            </div>
        );
    }

    const {lord, details} = dashaInfo;

    return (
        <div className="info-content dasha-view">
            <h2 className="space-title">
                Nakshatra #{nakshatraNumber}
            </h2>

            <div className="section-label">Dasha Lord</div>
            <div className="tags-grid">
                <span className="space-tag">{lord}</span>
                {details?.type && <span className="space-tag">{details.type}</span>}
            </div>

            {details?.keywords && details.keywords.length > 0 && (
                <>
                    <div className="section-label">Key Themes</div>
                    <div className="tags-grid">
                        {details.keywords.map((kw) => (
                            <span key={kw} className="space-tag">
                {kw}
              </span>
                        ))}
                    </div>
                </>
            )}

            {details?.summary && (
                <>
                    <div className="section-label">Overview</div>
                    <p className="description">
                        {details.summary}
                    </p>
                </>
            )}

            {/* FUTURE: use real timing data from chartData */}
            {/* Example fields you may add later:
          - chartData.dasha.currentMahadasha
          - chartData.dasha.currentAntardasha
          - start / end dates
      */}
        </div>
    );
};

export default DashaView;
