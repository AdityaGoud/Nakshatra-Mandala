// src/features/rightPanel/views/DetailsView.jsx
import React, {useEffect} from "react";
// ← FIXED PATH (was ../../../utils/logger)
import {MELAKARTA_RAGAS, NAKSHATRAS, RASHIS} from "../../../data/mandalaData";
import {getDashaForNakshatra} from "../../../data/dashaData";
import InfoCard from "../components/InfoCard";
import {getRemedy} from "../../../data/remedyData";
import {getHouseSignification, getRashiLord} from "../../../data/houseSignifications";
import {
    calculateDignity,
    calculateHouseDignity,
    calculateHouseNumber,
    getHousesRuledByPlanet,
    getNakshatraFromDegree,
    getRashiFromDegree
} from "../../../utils/astrologyCalculations";


import {logger} from "../../../utils/logger";


const DetailsView = ({hoverSelection, chartData, clickedPlanet}) => {
    logger.log('INIT', 'DetailsView mounted', null, 'DETAILS');

    useEffect(() => {
        // 🔍 DEBUG LOG
        logger.log('PROP', 'Props received', {
            hoverSelection: JSON.stringify(hoverSelection),  // ← See exact structure
            clickedPlanet: JSON.stringify(clickedPlanet),
            hoverType: typeof hoverSelection
        }, 'DETAILS');
    }, [hoverSelection, clickedPlanet]);

    const activeSelection = clickedPlanet || hoverSelection;

    // 🔍 DEBUG LOG
    logger.log('ACTIVE', 'activeSelection is', {
        activeSelection: JSON.stringify(activeSelection),
        type: activeSelection?.type,
        hasType: !!activeSelection?.type
    }, 'DETAILS');

    if (!activeSelection || !activeSelection.type) {  // ← Added type check
        logger.log('RENDER', 'Empty state - no valid selection', null, 'DETAILS');
        return (
            <div className="details-view empty-state">
                <p className="poetic-subtitle" style={{textAlign: "center", marginTop: "2rem"}}>
                    Hover over the mandala to explore the cosmic segments. </p>
            </div>
        );
    }

    // === PLANET VIEW ===
    if (activeSelection.type === "planet") {
        const {name, degree} = clickedPlanet || activeSelection;
        const ascendantDeg = chartData?.rasi?.ascendantDeg || 0;
        const iconSrc = name === "Jupiter" ? "/Planets/jupiter.png" : `/Planets/${name.toLowerCase()}.png`;

        const house = calculateHouseNumber(degree, ascendantDeg);
        const rashi = getRashiFromDegree(degree);
        const nakshatra = getNakshatraFromDegree(degree);
        const dignity = calculateDignity(name, rashi.index);
        const houseDignity = calculateHouseDignity(name, house);
        const ruledHouses = getHousesRuledByPlanet(name, ascendantDeg);

        const nakLordPlanet = chartData?.rasi?.planets?.find((p) => p.name === nakshatra.lord);
        const nakLordHouse = nakLordPlanet ? calculateHouseNumber(nakLordPlanet.degree, ascendantDeg) : null;
        const donation = getRemedy(name, rashi.name, "Donation");
        const temple = getRemedy(name, rashi.name, "Temple");

        logger.log('RENDER', 'Planet view', {name, house, rashi: rashi.name}, 'DETAILS');

        return (
            <div className="details-view planet-layout-redesign">
                <div className="planet-title-section">
                    <h2 className="planet-name-gold">{name} {degree.toFixed(2)}°</h2>
                </div>
                <div className="planet-image-large">
                    <img src={iconSrc} alt={name} style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                </div>
                <div className="planet-info-grid">
                    <InfoCard label="In House" value={house}/> <InfoCard label="Rashi" value={rashi.name}/>
                    <InfoCard label="Karaka -   AtmaKaraka"/> <InfoCard label="Rashi" value={rashi.name}/>
                    <InfoCard label="Nakshatra" value={NAKSHATRAS[nakshatra.index]}/>
                    <InfoCard label="Nak Lord" value={nakshatra.lord}/>
                    <InfoCard label="Nak Lord In" value={nakLordHouse ? `${nakLordHouse}th House` : "-"}/>
                    <InfoCard label="Rashi Dignity" value={dignity}/>
                    <InfoCard label="House Dignity" value={houseDignity}/>
                    <InfoCard label="Lord of" value={ruledHouses.length > 0 ? ruledHouses.join(", ") + " Houses" : "-"}/>
                </div>
                {/* Governed By - Full width section */}
                <div style={{
                    gridColumn: "1 / -1",
                    background: "rgba(20, 20, 40, 0.6)",
                    border: "1px solid rgba(255, 215, 0, 0.3)",
                    borderRadius: "8px",
                    padding: "12px 16px"
                }}>
                    <div style={{fontSize: "11px", color: "rgba(255,215,0,0.83)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px"}}>
                        Specific Donations - {donation}.
                    </div>
                    <div style={{fontSize: "11px", color: "rgba(255, 215, 0, 0.7)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px"}}>
                        Energy Align Temple - {temple}.
                    </div>
                    {/*<div style={{fontSize: "13px", color: "#e0e0e0", lineHeight: "1.5"}}>*/}
                    {/*    Specific Donations is {donation} and Energy Recharge/Align Temples - {temple}*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }

    // === RASHI VIEW ===
    // === RASHI VIEW ===
    if (activeSelection.type === "rashi") {
        const {index} = activeSelection;
        const rashiName = RASHIS[index];
        const rashiLord = getRashiLord(rashiName);

        // Calculate which house this rashi falls in
        const ascendantDeg = chartData?.rasi?.ascendantDeg || 0;

        // Use middle of rashi (15 degrees into the sign) for accurate house
        const rashiMidDeg = (index * 30) + 15;
        const houseNumber = calculateHouseNumber(rashiMidDeg, ascendantDeg);

        // Find where the rashi lord planet is
        const lordPlanet = chartData?.rasi?.planets?.find(p => p.name === rashiLord);
        const lordHouse = lordPlanet ? calculateHouseNumber(lordPlanet.degree, ascendantDeg) : null;
        const lordNakshatra = lordPlanet ? getNakshatraFromDegree(lordPlanet.degree) : null;

        // Get house significations
        const significations = getHouseSignification(houseNumber);

        // 🟢 DYNAMIC RASHI IMAGE
        // Assumes images are in public/Planets/aries.png, public/Planets/taurus.png, etc.
        const rashiImage = `/Planets/${rashiName.toLowerCase()}.png`;

        logger.log('RENDER', 'Rashi view', {index, rashiName, house: houseNumber}, 'DETAILS');

        return (
            <div className="details-view planet-layout-redesign">
                <div className="planet-title-section">
                    <h2 className="planet-name-gold">{rashiName}</h2>
                </div>

                <div className="planet-image-large">
                    {/* 🟢 Updated Image Source */} <img src={rashiImage} alt={rashiName} style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }} onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/Planets/sun.png"; // Fallback if image missing
                }}/>
                </div>

                <div className="planet-info-grid">
                    <InfoCard label="In House" value={houseNumber}/> <InfoCard label="Rashi Lord" value={rashiLord}/>
                    <InfoCard label="Lord In House" value={lordHouse ? `${lordHouse}th House` : "-"}/>
                    <InfoCard label="Lord In Nakshatra" value={lordNakshatra ? NAKSHATRAS[lordNakshatra.index] : "-"}/>

                    {/* Governed By - Full width section */}
                    <div style={{
                        gridColumn: "1 / -1",
                        background: "rgba(20, 20, 40, 0.6)",
                        border: "1px solid rgba(255, 215, 0, 0.3)",
                        borderRadius: "8px",
                        padding: "12px 16px"
                    }}>
                        <div style={{
                            fontSize: "11px",
                            color: "rgba(255, 215, 0, 0.7)",
                            marginBottom: "8px",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                        }}>
                            Now {rashiName} Governs
                        </div>
                        <div style={{
                            fontSize: "13px",
                            color: "#e0e0e0",
                            lineHeight: "1.5"
                        }}>
                            {significations}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // === NAKSHATRA VIEW ===
    if (activeSelection.type === "nakshatra") {
        const {index} = activeSelection;
        const nakshatra = NAKSHATRAS[index];
        const dashaInfo = getDashaForNakshatra(index);
        const {lord, details} = dashaInfo || {};

        logger.log('RENDER', 'Nakshatra view', {index, nakshatra}, 'DETAILS');

        return (
            <div className="details-view">
                <h2 className="space-title">{nakshatra}</h2>
                <p className="poetic-subtitle">Lunar Mansion #{index + 1}</p>{lord && (
                <>
                    <div className="section-label">Dasha Lord</div>
                    <div className="tags-grid">
                        <span className="space-tag">{lord}</span>
                    </div>
                </>
            )} {details?.summary && (
                <>
                    <div className="section-label">Overview</div>
                    <p className="description">{details.summary}</p>
                </>
            )}
            </div>
        );
    }

    // === RAAGA VIEW ===
    if (activeSelection.type === "raaga") {
        const {index} = activeSelection;
        const raaga = MELAKARTA_RAGAS[index];
        logger.log('RENDER', 'Raaga view', {index, raaga}, 'DETAILS');

        return (
            <div className="details-view">
                <h2 className="space-title">{raaga}</h2>
                <p className="poetic-subtitle">Melakarta #{index + 1}</p>
                <p className="description">A beautiful raga in the Carnatic music tradition.</p>
            </div>
        );
    }

    logger.log('ERROR', 'Unknown type', {type: activeSelection.type}, 'DETAILS');
    return <div className="details-view empty-state"></div>;
};

export default DetailsView;
