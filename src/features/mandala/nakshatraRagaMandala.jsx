// src/features/mandala/nakshatraRagaMandala.jsx
import React, { useEffect, useRef, useState } from "react";

import {
    MELAKARTA_RAGAS,
    MELAKARTA_SEGMENT_SIZE_DEG,
    NAKSHATRA_SEGMENT_SIZE_DEG,
    NAKSHATRAS,
    RASHI_SEGMENT_SIZE_DEG,
    RASHIS,
} from "../../data/mandalaData";
import {logger} from "../../utils/logger";

const COLORS = {
    backgroundInner: "rgba(228,177,11,0.66)",
    backgroundOuter: "rgba(16,80,207,0.14)",
    houseFill: "rgba(255,255,255,0.03)",
    houseStroke: "rgba(255,255,255,0.5)",
    houseText: "#000000",
    rashiFill: "rgba(255,255,255,0.11)",
    rashiStroke: "rgba(155,167,197,0.94)",
    rashiText: "#ffffff",
    rashiDegreeText: "rgb(255,255,255)",
    nakFill: "rgba(215,11,11,0.2)",
    nakText: "#ffffff",
    ragaFill: "rgba(225,9,9,0.24)",
    ragaText: "#ffffff",
    centerTitle: "#ffffff",
    rashiHover: "rgba(255,255,255,0.4)",
    nakHover: "rgba(255,100,100,0.5)",
    ragaHover: "rgba(255,50,50,0.5)",
    planetHover: "rgba(255,255,255,0.4)",
};

const NakshatraRagaMandala = ({
                                  ascendantDeg = 96,
                                  planetPositions = [],
                                  onHoverChange,
                                  onPlanetClick
                              }) => {
    const canvasRef = useRef(null);
    const [hoveredSegment, setHoveredSegment] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [planetImages, setPlanetImages] = useState({});
    const renderedPlanetsRef = useRef([]);
    const isLockedRef = useRef(isLocked);

    logger.log('INIT', 'Canvas mounted', { planets: planetPositions.length }, 'CANVAS');

    useEffect(() => {
        isLockedRef.current = isLocked;
    }, [isLocked]);

    // 1. Preload Images
    useEffect(() => {
        const imagesToLoad = {
            jupiter: "/Planets/jupiter.png",
            mars: "/Planets/mars.png",
            sun: "/Planets/sun.png",
            moon: "/Planets/moon.png",
            mercury: "/Planets/mercury.png",
            saturn: "/Planets/saturn.png",
            venus: "/Planets/venus.png",
            rahu: "/Planets/rahu.png",
            ketu: "/Planets/ketu.png",
        };

        const loadedImages = {};
        const keys = Object.keys(imagesToLoad);
        let count = 0;

        const checkDone = () => {
            count++;
            if (count === keys.length) {
                setPlanetImages(loadedImages);
            }
        };

        keys.forEach((key) => {
            const img = new Image();
            img.src = imagesToLoad[key];
            img.onload = () => {
                loadedImages[key] = img;
                checkDone();
            };
            img.onerror = () => {
                console.warn(`❌ Failed to load image: ${key} (${imagesToLoad[key]})`);
                checkDone();
            };
        });
    }, []);

    // 2. Draw Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const draw = () => {
            try {
                renderedPlanetsRef.current = [];

                const dpr = window.devicePixelRatio || 1;
                const parent = canvas.parentElement;
                if (!parent) return;

                const maxSize = 800;
                const parentWidth = parent.clientWidth;
                const logicalSize = Math.min(parentWidth, maxSize);
                if (logicalSize === 0) return;

                canvas.width = logicalSize * dpr;
                canvas.height = logicalSize * dpr;
                canvas.style.width = `${logicalSize}px`;
                canvas.style.height = `${logicalSize}px`;

                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);

                const centerX = logicalSize / 2;
                const centerY = logicalSize / 2;
                const base = logicalSize / 2;

                const rOuterHouse = base * 0.95;
                const rInnerHouse = base * 0.90;
                const rOuterRashi = base * 0.90;
                const rInnerRashi = base * 0.78;
                const rOuterNak = rInnerRashi;
                const rInnerNak = base * 0.68;
                const rOuterRaga = rInnerNak;
                const rInnerRaga = base * 0.59;

                const rotationDegree = ascendantDeg;
                const rotationOffset = 360 - rotationDegree;
                const deg2rad = (deg) => ((-deg - 90 - rotationOffset) * Math.PI) / 180;

                ctx.clearRect(0, 0, logicalSize, logicalSize);

                // Background
                const radial = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, base);
                radial.addColorStop(0, COLORS.backgroundInner);
                radial.addColorStop(1, COLORS.backgroundOuter);
                ctx.fillStyle = radial;
                ctx.fillRect(0, 0, logicalSize, logicalSize);

                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.translate(-centerX, -centerY);

                // === HOUSE RING ===
                ctx.strokeStyle = COLORS.houseStroke;
                ctx.lineWidth = 1.5;

                // NEW: Rashi colors for house segment backgrounds
                const RASHI_COLORS = [
                    "rgb(241,9,9)", // 1st House - Aries - Red
                    "rgba(78, 205, 196)",  // 2nd House - Taurus - Teal
                    "rgba(255, 230, 109)", // 3rd House - Gemini - Yellow
                    "rgba(168, 230, 207)", // 4th House - Cancer - Light Green
                    "rgba(255, 179, 71)",  // 5th House - Leo - Orange
                    "rgba(149, 184, 209)", // 6th House - Virgo - Light Blue
                    "rgba(244, 166, 215)", // 7th House - Libra - Pink
                    "rgba(181, 101, 167)", // 8th House - Scorpio - Purple
                    "rgba(232, 180, 184)", // 9th House - Sagittarius - Rose
                    "rgba(139, 115, 85)",  // 10th House - Capricorn - Brown
                    "rgba(135, 206, 235)", // 11th House - Aquarius - Sky Blue
                    "rgba(176, 224, 230)"  // 12th House - Pisces - Powder Blue
                ];

                for (let i = 0; i < 12; i++) {
                    const houseStartDeg = 285 - (i * 30);
                    const houseEndDeg = 285 - ((i + 1) * 30);
                    const houseMidDeg = 285 - (i * 30 + 15);

                    const startAngle = (houseStartDeg * Math.PI) / 180;
                    const endAngle = (houseEndDeg * Math.PI) / 180;
                    const midAngle = (houseMidDeg * Math.PI) / 180;

                    // 🟢 CHANGED: Use rashi color for segment background
                    ctx.fillStyle = RASHI_COLORS[i];

                    ctx.beginPath();
                    ctx.arc(centerX, centerY, rOuterHouse, startAngle, endAngle, true);
                    ctx.arc(centerX, centerY, rInnerHouse, endAngle, startAngle, false);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    const textR = (rInnerHouse + rOuterHouse) / 2;
                    const x = centerX + textR * Math.cos(midAngle);
                    const y = centerY + textR * Math.sin(midAngle);

                    ctx.save();
                    ctx.translate(x, y);

                    let textAngle = midAngle + Math.PI / 2;
                    if (houseMidDeg > 90 && houseMidDeg < 270) {
                        textAngle += Math.PI;
                    }

                    ctx.rotate(textAngle);

                    // 🟢 Keep text color as is (or use white for visibility)
                    ctx.fillStyle = COLORS.houseText;

                    ctx.font = "bold 11px system-ui, -apple-system";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";

                    const ordinal =
                        i === 0 ? "1st" :
                            i === 1 ? "2nd" :
                                i === 2 ? "3rd" : `${i + 1}th`;

                    ctx.fillText(`${ordinal} House`, 0, 0);
                    ctx.restore();
                }


                // === RASHI RING ===
                ctx.strokeStyle = COLORS.rashiStroke;
                ctx.lineWidth = 1.2;
                for (let i = 0; i < RASHIS.length; i++) {
                    const startAngle = deg2rad(i * RASHI_SEGMENT_SIZE_DEG);
                    const endAngle = deg2rad((i + 1) * RASHI_SEGMENT_SIZE_DEG);

                    ctx.beginPath();
                    ctx.arc(centerX, centerY, rOuterRashi, startAngle, endAngle, true);
                    ctx.arc(centerX, centerY, rInnerRashi, endAngle, startAngle, false);
                    ctx.closePath();

                    const isHovered =
                        hoveredSegment?.type === "rashi" &&
                        hoveredSegment?.index === i;

                    ctx.fillStyle = isHovered ? COLORS.rashiHover : COLORS.rashiFill;
                    ctx.fill();
                    ctx.stroke();

                    const midAngle = deg2rad(
                        i * RASHI_SEGMENT_SIZE_DEG + RASHI_SEGMENT_SIZE_DEG / 2
                    );
                    const textR = (rInnerRashi + rOuterRashi) / 2;
                    const x = centerX + textR * Math.cos(midAngle);
                    const y = centerY + textR * Math.sin(midAngle);

                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(midAngle + Math.PI / 2);
                    ctx.fillStyle = COLORS.rashiText;
                    ctx.font = "bold 14px system-ui, -apple-system";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(RASHIS[i], 0, 0);
                    ctx.restore();
                }

                // === NAKSHATRA RING ===
                ctx.lineWidth = 1;
                for (let i = 0; i < NAKSHATRAS.length; i++) {
                    const startAngle = deg2rad(i * NAKSHATRA_SEGMENT_SIZE_DEG);
                    const endAngle = deg2rad((i + 1) * NAKSHATRA_SEGMENT_SIZE_DEG);

                    ctx.beginPath();
                    ctx.arc(centerX, centerY, rOuterNak, startAngle, endAngle, true);
                    ctx.arc(centerX, centerY, rInnerNak, endAngle, startAngle, false);
                    ctx.closePath();

                    const isHovered =
                        hoveredSegment?.type === "nakshatra" &&
                        hoveredSegment?.index === i;

                    ctx.fillStyle = isHovered ? COLORS.nakHover : COLORS.nakFill;
                    ctx.fill();
                    ctx.stroke();

                    const midAngle = deg2rad(
                        i * NAKSHATRA_SEGMENT_SIZE_DEG + NAKSHATRA_SEGMENT_SIZE_DEG / 2
                    );
                    const textR = (rInnerNak + rOuterNak) / 2;
                    const x = centerX + textR * Math.cos(midAngle);
                    const y = centerY + textR * Math.sin(midAngle);

                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(midAngle + Math.PI / 2);
                    ctx.fillStyle = COLORS.nakText;
                    ctx.font = "9px system-ui, -apple-system";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(NAKSHATRAS[i], 0, 0);
                    ctx.restore();
                }

                // === RAGA RING ===
                ctx.lineWidth = 0.8;
                for (let i = 0; i < MELAKARTA_RAGAS.length; i++) {
                    const startAngle = deg2rad(i * MELAKARTA_SEGMENT_SIZE_DEG);
                    const endAngle = deg2rad((i + 1) * MELAKARTA_SEGMENT_SIZE_DEG);

                    ctx.beginPath();
                    ctx.arc(centerX, centerY, rOuterRaga, startAngle, endAngle, true);
                    ctx.arc(centerX, centerY, rInnerRaga, endAngle, startAngle, false);
                    ctx.closePath();

                    const isHovered =
                        hoveredSegment?.type === "raaga" &&
                        hoveredSegment?.index === i;

                    ctx.fillStyle = isHovered ? COLORS.ragaHover : COLORS.ragaFill;
                    ctx.fill();
                    ctx.stroke();

                    if (i % 2 === 0) {
                        const midAngle = deg2rad(
                            i * MELAKARTA_SEGMENT_SIZE_DEG +
                            MELAKARTA_SEGMENT_SIZE_DEG / 2
                        );
                        const textR = (rInnerRaga + rOuterRaga) / 2;
                        const x = centerX + textR * Math.cos(midAngle);
                        const y = centerY + textR * Math.sin(midAngle);

                        ctx.save();
                        ctx.translate(x, y);
                        ctx.rotate(midAngle + Math.PI / 2);
                        ctx.fillStyle = COLORS.ragaText;
                        ctx.font = "7px system-ui, -apple-system";
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(String(i + 1), 0, 0);
                        ctx.restore();
                    }
                }

                // === PLANETS ===
                planetPositions.forEach((planet) => {
                    const planetAngle = deg2rad(planet.degree);
                    const planetRadius = (rOuterRashi + rInnerRashi) / 2;
                    const planetX = centerX + planetRadius * Math.cos(planetAngle);
                    const planetY = centerY + planetRadius * Math.sin(planetAngle);
                    const iconSize = 40;
                    const hitRadius = 18;

                    renderedPlanetsRef.current.push({
                        name: planet.name,
                        degree: planet.degree,
                        x: planetX,
                        y: planetY,
                        radius: hitRadius
                    });

                    const isHovered =
                        hoveredSegment?.type === "planet" &&
                        hoveredSegment?.name === planet.name;

                    ctx.beginPath();
                    ctx.arc(planetX, planetY, iconSize / 2, 0, Math.PI * 2);

                    ctx.fillStyle = isHovered
                        ? COLORS.planetHover
                        : "rgba(0, 0, 0, 0.6)";
                    ctx.fill();

                    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    const key = planet.name.toLowerCase();
                    const img = planetImages[key];

                    if (img) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(planetX, planetY, iconSize / 2 - 2, 0, Math.PI * 2);
                        ctx.clip();
                        ctx.drawImage(
                            img,
                            planetX - iconSize / 2,
                            planetY - iconSize / 2,
                            iconSize,
                            iconSize
                        );
                        ctx.restore();
                    } else {
                        ctx.beginPath();
                        ctx.arc(planetX, planetY, 4, 0, Math.PI * 2);
                        ctx.fillStyle = "#ffffff";
                        ctx.fill();
                    }
                });

                // === TITLES ===
                ctx.fillStyle = COLORS.centerTitle;
                ctx.font = "bold 18px system-ui, -apple-system";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("Nakshatra – Raga", centerX, centerY - 12);
                ctx.fillText("Mandala", centerX, centerY + 12);

                ctx.restore();
            } catch (error) {
                console.error("CRITICAL ERROR IN DRAW:", error);
            }
        };

        draw();
        const handleResize = () => draw();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [ascendantDeg, planetPositions, hoveredSegment, planetImages]);

    // 3. Event Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const getHitData = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const logicalSize = Math.min(rect.width, 800);

            const centerX = logicalSize / 2;
            const centerY = logicalSize / 2;
            const base = logicalSize / 2;

            const rOuterHouse = base * 0.95;
            const rInnerHouse = base * 0.90;
            const rOuterRashi = base * 0.90;
            const rInnerRashi = base * 0.78;
            const rOuterNak = rInnerRashi;
            const rInnerNak = base * 0.68;
            const rOuterRaga = rInnerNak;
            const rInnerRaga = base * 0.59;

            const rotationDegree = ascendantDeg;
            const rotationOffset = 360 - rotationDegree;

            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Planets first
            for (const p of renderedPlanetsRef.current) {
                const pdx = mouseX - p.x;
                const pdy = mouseY - p.y;
                if (Math.sqrt(pdx * pdx + pdy * pdy) <= p.radius) {
                    return { type: "planet", name: p.name, degree: p.degree };
                }
            }

            let canvasAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
            if (canvasAngleDeg < 0) canvasAngleDeg += 360;

            let houseAngle = 285 - canvasAngleDeg;
            while (houseAngle < 0) houseAngle += 360;
            while (houseAngle >= 360) houseAngle -= 360;

            let mandalaAngle = -canvasAngleDeg - 90 - rotationOffset;
            while (mandalaAngle < 0) mandalaAngle += 360;
            while (mandalaAngle >= 360) mandalaAngle -= 360;

            if (distance >= rInnerHouse && distance <= rOuterHouse) {
                const houseIndex = Math.floor(houseAngle / 30);
                if (houseIndex >= 0 && houseIndex < 12) {
                    return { type: "house", index: houseIndex };
                }
            } else if (distance >= rInnerRashi && distance <= rOuterRashi) {
                const rashiIndex = Math.floor(mandalaAngle / RASHI_SEGMENT_SIZE_DEG);
                if (rashiIndex >= 0 && rashiIndex < 12) {
                    logger.log('HIT', 'Rashi detected', { index: rashiIndex }, 'CANVAS');
                    return { type: "rashi", index: rashiIndex };
                }
            } else if (distance >= rInnerNak && distance <= rOuterNak) {
                const nakIndex = Math.floor(mandalaAngle / NAKSHATRA_SEGMENT_SIZE_DEG);
                if (nakIndex >= 0 && nakIndex < 27) {
                    return { type: "nakshatra", index: nakIndex };
                }
            } else if (distance >= rInnerRaga && distance <= rOuterRaga) {
                const ragaIndex = Math.floor(mandalaAngle / MELAKARTA_SEGMENT_SIZE_DEG);
                if (ragaIndex >= 0 && ragaIndex < 72) {
                    return { type: "raaga", index: ragaIndex };
                }
            }

            return null;
        };

        const handleMouseMove = (e) => {
            if (isLockedRef.current) return;
            const newHovered = getHitData(e);
            setHoveredSegment(newHovered);
            if (onHoverChange) onHoverChange(newHovered);
        };

        const handleClick = (e) => {
            const clickedItem = getHitData(e);
            logger.log('CLICK', clickedItem?.type || 'empty', clickedItem, 'CANVAS');

            // 🟢 Handle planet clicks
            if (clickedItem?.type === "planet") {
                if (onPlanetClick) {
                    onPlanetClick({
                        type: "planet",
                        name: clickedItem.name,
                        degree: clickedItem.degree
                    });
                }
            } else {
                // 🟢 Clear planet when clicking anything else
                if (onPlanetClick) {
                    onPlanetClick(null);
                }
            }

            // Toggle lock
            const currentlyLocked = isLockedRef.current;
            if (currentlyLocked) {
                setIsLocked(false);
                isLockedRef.current = false;
            } else {
                setIsLocked(true);
                isLockedRef.current = true;
            }

            // Update hover
            setHoveredSegment(clickedItem);
            if (onHoverChange) onHoverChange(clickedItem);
        };

        const handleMouseLeave = () => {
            if (isLockedRef.current) return;
            setHoveredSegment(null);
            if (onHoverChange) onHoverChange(null);
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("click", handleClick);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("click", handleClick);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [ascendantDeg, onHoverChange, onPlanetClick]);

    return <canvas ref={canvasRef} style={{ cursor: "pointer", border: "3px solid yellow" }} />;
};

export default NakshatraRagaMandala;
