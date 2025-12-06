// src/features/rightPanel/views/DetailsView.jsx
import React from "react";
import { MELAKARTA_RAGAS, NAKSHATRAS, RASHIS } from "../../../data/mandalaData";
import { getPlanetDignity, getHouseNumber, getNakshatraInfoFromDegree } from "../../../services/mappings";
import { getDashaForNakshatra } from "../../../data/dashaData";
import { calculatePlanetStrength } from "../../../services/astrologyStrengthCalculator";
import HorizontalStrengthBar from "../components/HorizontalStrengthBar";

const DetailsView = ({ hoverSelection, chartData }) => {
    if (!hoverSelection) {
        return (
            <div className="details-view empty-state">
                <p className="poetic-subtitle" style={{textAlign:'center', marginTop:'2rem'}}>
                    Hover over the mandala to explore the cosmic segments.
                </p>
            </div>
        );
    }

    // PLANET VIEW
    if (hoverSelection.type === "planet") {
        const { name, degree } = hoverSelection;
        const ascendantDeg = chartData?.rasi?.ascendantDeg || 0;
        const dignity = getPlanetDignity(name, degree);
        const houseNum = getHouseNumber(degree, ascendantDeg);
        const rashiIndex = Math.floor(degree / 30) % 12;
        const rashiName = RASHIS[rashiIndex];

        // Get Nakshatra info
        const nakshatraInfo = getNakshatraInfoFromDegree(degree);
        const dashaInfo = getDashaForNakshatra(nakshatraInfo.index);
        const nakshatraLord = dashaInfo?.lord || "Unknown";

        // Calculate Pada (quarter) within nakshatra
        const nakshatra_size = 360 / 27; // 13.333 degrees per nakshatra
        const nakshatra_start = (nakshatraInfo.index) * nakshatra_size;
        const degree_in_nakshatra = degree - nakshatra_start;
        const pada = Math.floor((degree_in_nakshatra / nakshatra_size) * 4) + 1;

        // Calculate strength
        const strengthData = calculatePlanetStrength(name, degree, houseNum, dignity);
        const overallStrength = strengthData.overall_strength;

        let statusColor = "#fff";
        let statusLabel = "Neutral";
        if (dignity === "Exalted") {
            statusColor = "#4ade80";
            statusLabel = "Exalted";
        }
        if (dignity === "Debilitated") {
            statusColor = "#f87171";
            statusLabel = "Debilitated";
        }
        if (dignity === "Own Sign") {
            statusColor = "#60a5fa";
            statusLabel = "Own Sign";
        }

        const iconSrc = name === 'Jupiter' ? '/jupiter.ico' : `/${name.toLowerCase()}.png`;

        return (
            <div className="details-view planet-layout">
                {/* PLANET HEADER - Centered image, name, degree */}
                <div className="planet-header-simple">
                    <div className="planet-image-box">
                        <div className="icon-frame-simple">
                            <img
                                src={iconSrc}
                                alt={name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    </div>
                    <div className="planet-header-text-simple">
                        <h2 className="planet-name-simple">{name}</h2>
                        <span className="degree-pill-simple">{degree.toFixed(2)}°</span>
                    </div>
                </div>

                {/* STRENGTH BAR SECTION */}
                <div className="strength-bar-section">
                    <HorizontalStrengthBar strength={overallStrength} />
                </div>

                {/* DETAILED INFORMATION GRID - Table style with rows */}
                <div className="details-table">
                    {/* Row 1: House | House Lord */}
                    <div className="detail-row">
                        <div className="row-item">
                            <div className="row-item-label">House</div>
                            <div className="row-item-value">{houseNum}</div>
                        </div>
                        <div className="row-item">
                            <div className="row-item-label">House Lord</div>
                            <div className="row-item-value pending">API Pending</div>
                        </div>
                    </div>

                    {/* Row 2: House Dignity | Rashi */}
                    <div className="detail-row">
                        <div className="row-item">
                            <div className="row-item-label">House Dignity</div>
                            <div className="row-item-value">{statusLabel}</div>
                        </div>
                        <div className="row-item">
                            <div className="row-item-label">Rashi</div>
                            <div className="row-item-value">{rashiName}</div>
                        </div>
                    </div>

                    {/* Row 3: Rashi Dignity | Ruling Planet */}
                    <div className="detail-row">
                        <div className="row-item">
                            <div className="row-item-label">Rashi Dignity</div>
                            <div className="row-item-value pending">API Pending</div>
                        </div>
                        <div className="row-item">
                            <div className="row-item-label">Ruling Planet</div>
                            <div className="row-item-value pending">API Pending</div>
                        </div>
                    </div>

                    {/* Row 4: Nakshatra | Nakshatra Lord */}
                    <div className="detail-row">
                        <div className="row-item">
                            <div className="row-item-label">Nakshatra</div>
                            <div className="row-item-value">{nakshatraInfo.name} - Pada {pada}</div>
                        </div>
                        <div className="row-item">
                            <div className="row-item-label">Nak. Lord</div>
                            <div className="row-item-value">{nakshatraLord}</div>
                        </div>
                    </div>

                    {/* Row 5: Nak. Lord Rashi | House */}
                    <div className="detail-row">
                        <div className="row-item">
                            <div className="row-item-label">Nak. Lord Rashi</div>
                            <div className="row-item-value pending">API Pending</div>
                        </div>
                        <div className="row-item">
                            <div className="row-item-label">House</div>
                            <div className="row-item-value pending">API Pending</div>
                        </div>
                    </div>

                    {/* Row 6: D9 Rashi | D9 House */}
                    <div className="detail-row">
                        <div className="row-item">
                            <div className="row-item-label">D9 Rashi</div>
                            <div className="row-item-value pending">API Pending</div>
                        </div>
                        <div className="row-item">
                            <div className="row-item-label">D9 House</div>
                            <div className="row-item-value pending">API Pending</div>
                        </div>
                    </div>

                    {/* Row 7: Awastha | Aspects */}
                    <div className="detail-row">
                        <div className="row-item">
                            <div className="row-item-label">Awastha</div>
                            <div className="row-item-value pending">API Pending</div>
                        </div>
                        <div className="row-item">
                            <div className="row-item-label">Aspects</div>
                            <div className="row-item-value pending">API Pending</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // RASHI VIEW
    if (hoverSelection.type === "rashi") {
        const { index } = hoverSelection;
        const rashi = RASHIS[index];
        const details = {
            "Sub": "Zodiac Sign",
            "Overview": `${rashi} is a significant rashi in Vedic astrology. Planets here express themselves through its characteristic energies.`
        };

        return (
            <div className="details-view">
                <h2 className="space-title">{rashi}</h2>
                <p className="poetic-subtitle">Zodiac House #{index + 1}</p>
                <div className="section-label">Overview</div>
                <p className="description">{details.Overview}</p>
            </div>
        );
    }

    // NAKSHATRA VIEW
    if (hoverSelection.type === "nakshatra") {
        const { index } = hoverSelection;
        const nakshatra = NAKSHATRAS[index];
        const dashaInfo = getDashaForNakshatra(index);
        const { lord, details } = dashaInfo || {};

        return (
            <div className="details-view">
                <h2 className="space-title">{nakshatra}</h2>
                <p className="poetic-subtitle">Lunar Mansion #{index + 1}</p>
                
                {lord && (
                    <>
                        <div className="section-label">Dasha Lord</div>
                        <div className="tags-grid">
                            <span className="space-tag">{lord}</span>
                        </div>
                    </>
                )}

                {details?.summary && (
                    <>
                        <div className="section-label">Overview</div>
                        <p className="description">{details.summary}</p>
                    </>
                )}
            </div>
        );
    }

    // RAAGA VIEW
    if (hoverSelection.type === "raaga") {
        const { index } = hoverSelection;
        const raaga = MELAKARTA_RAGAS[index];

        return (
            <div className="details-view">
                <h2 className="space-title">{raaga}</h2>
                <p className="poetic-subtitle">Melakarta #{index + 1}</p>
                <p className="description">A beautiful raga in the Carnatic music tradition.</p>
            </div>
        );
    }

    return (
        <div className="details-view empty-state">
            <p className="poetic-subtitle" style={{textAlign:'center', marginTop:'2rem'}}>
                Unknown selection type.
            </p>
        </div>
    );
};

export default DetailsView;
