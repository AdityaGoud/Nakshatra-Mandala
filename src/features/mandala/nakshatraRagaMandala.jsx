// src/features/mandala/NakshatraRagaMandala.jsx

import React, { useEffect, useRef, useState } from "react";
import {
    MELAKARTA_RAGAS,
    MELAKARTA_SEGMENT_SIZE_DEG,
    NAKSHATRA_SEGMENT_SIZE_DEG,
    NAKSHATRAS,
    RASHI_SEGMENT_SIZE_DEG,
    RASHIS,
} from "../../data/mandalaData";

/**
 * NakshatraRagaMandala
 * Direction: ANTICLOCKWISE
 * Features: Planet Hover Support, Click-to-Lock Selection, Planet Click Detection
 * Optimization: Separated Draw Logic from Event Logic to prevent listener thrashing
 */

const COLORS = {
    backgroundInner: "rgba(228,177,11,0.66)",
    backgroundOuter: "rgba(16,80,207,0.14)",

    rashiFill: "rgba(255,255,255,0.11)",
    rashiStroke: "rgba(155,167,197,0.94)",
    rashiText: "#ffffff",
    rashiDegreeText: "rgb(255,255,255)",

    nakFill: "rgba(215,11,11,0.2)",
    nakText: "#ffffff",

    ragaFill: "rgba(225,9,9,0.24)",
    ragaText: "#ffffff",

    centerTitle: "#ffffff",

    // Hover colors
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

    // State for UI
    const [hoveredSegment, setHoveredSegment] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [planetImages, setPlanetImages] = useState({});

    // Refs for Event Handlers (to avoid stale closures without re-binding listeners)
    const renderedPlanetsRef = useRef([]); // Stores coordinate data for hit testing
    const isLockedRef = useRef(isLocked);  // specific ref to access lock state in listeners

    // Sync Ref with State
    useEffect(() => {
        isLockedRef.current = isLocked;
    }, [isLocked]);

    // 1. Preload Images
    useEffect(() => {
        const imagesToLoad = {
            jupiter: "/jupiter.ico",
            mars: "/mars.png",
            sun: "/sun.png",
            moon: "/moon.png",
            mercury: "/mercury.png",
            saturn: "/saturn.png",
            venus: "/venus.png",
            rahu: "/rahu.png",
            ketu: "/ketu.png",
        };

        const loadedImages = {};
        let loadCount = 0;
        const keys = Object.keys(imagesToLoad);

        keys.forEach((key) => {
            const img = new Image();
            img.src = imagesToLoad[key];
            img.onload = () => {
                loadedImages[key] = img;
                loadCount++;
                if (loadCount === keys.length) {
                    setPlanetImages(loadedImages);
                }
            };
        });
    }, []);

    // 2. Draw Logic (Runs when data or hover state changes)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const draw = () => {
            // Reset hit targets for this frame
            renderedPlanetsRef.current = [];

            const dpr = window.devicePixelRatio || 1;
            const parent = canvas.parentElement;
            const maxSize = 800;
            const parentWidth = parent ? parent.clientWidth : maxSize;
            const logicalSize = Math.min(parentWidth, maxSize);

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
            const rOuterRashi = base * 0.9;
            const rInnerRashi = base * 0.8;
            const rOuterNak = rInnerRashi;
            const rInnerNak = base * 0.7;
            const rOuterRaga = rInnerNak;
            const rInnerRaga = base * 0.61;

            const rotationDegree = ascendantDeg;
            const rotationOffset = 360 - rotationDegree;

            // Anticlockwise Helper
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

            // --- RASHI RING ---
            ctx.strokeStyle = COLORS.rashiStroke;
            ctx.lineWidth = 1.2;
            for (let i = 0; i < RASHIS.length; i++) {
                const startAngle = deg2rad(i * RASHI_SEGMENT_SIZE_DEG);
                const endAngle = deg2rad((i + 1) * RASHI_SEGMENT_SIZE_DEG);

                ctx.beginPath();
                ctx.arc(centerX, centerY, rOuterRashi, startAngle, endAngle, true);
                ctx.arc(centerX, centerY, rInnerRashi, endAngle, startAngle, false);
                ctx.closePath();

                const isHovered = hoveredSegment?.type === "rashi" && hoveredSegment?.index === i;
                ctx.fillStyle = isHovered ? COLORS.rashiHover : COLORS.rashiFill;
                ctx.fill();
                ctx.stroke();

                // Text
                const midAngle = deg2rad(i * RASHI_SEGMENT_SIZE_DEG + RASHI_SEGMENT_SIZE_DEG / 2);
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

                // Degrees
                const degAngle = deg2rad(i * RASHI_SEGMENT_SIZE_DEG);
                const degX = centerX + (rOuterRashi + logicalSize * 0.015) * Math.cos(degAngle);
                const degY = centerY + (rOuterRashi + logicalSize * 0.015) * Math.sin(degAngle);
                ctx.fillStyle = COLORS.rashiDegreeText;
                ctx.font = "10px system-ui, -apple-system";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`${i * RASHI_SEGMENT_SIZE_DEG}°`, degX, degY);
            }

            // --- NAKSHATRA RING ---
            ctx.lineWidth = 1;
            for (let i = 0; i < NAKSHATRAS.length; i++) {
                const startAngle = deg2rad(i * NAKSHATRA_SEGMENT_SIZE_DEG);
                const endAngle = deg2rad((i + 1) * NAKSHATRA_SEGMENT_SIZE_DEG);

                ctx.beginPath();
                ctx.arc(centerX, centerY, rOuterNak, startAngle, endAngle, true);
                ctx.arc(centerX, centerY, rInnerNak, endAngle, startAngle, false);
                ctx.closePath();

                const isHovered = hoveredSegment?.type === "nakshatra" && hoveredSegment?.index === i;
                ctx.fillStyle = isHovered ? COLORS.nakHover : COLORS.nakFill;
                ctx.fill();
                ctx.stroke();

                const midAngle = deg2rad(i * NAKSHATRA_SEGMENT_SIZE_DEG + NAKSHATRA_SEGMENT_SIZE_DEG / 2);
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

            // --- RAGA RING ---
            ctx.lineWidth = 0.8;
            for (let i = 0; i < MELAKARTA_RAGAS.length; i++) {
                const startAngle = deg2rad(i * MELAKARTA_SEGMENT_SIZE_DEG);
                const endAngle = deg2rad((i + 1) * MELAKARTA_SEGMENT_SIZE_DEG);

                ctx.beginPath();
                ctx.arc(centerX, centerY, rOuterRaga, startAngle, endAngle, true);
                ctx.arc(centerX, centerY, rInnerRaga, endAngle, startAngle, false);
                ctx.closePath();

                const isHovered = hoveredSegment?.type === "raaga" && hoveredSegment?.index === i;
                ctx.fillStyle = isHovered ? COLORS.ragaHover : COLORS.ragaFill;
                ctx.fill();
                ctx.stroke();

                if (i % 2 === 0) {
                    const midAngle = deg2rad(i * MELAKARTA_SEGMENT_SIZE_DEG + MELAKARTA_SEGMENT_SIZE_DEG / 2);
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

            // --- PLANETS ---
            planetPositions.forEach((planet) => {
                const planetAngle = deg2rad(planet.degree);
                const planetRadius = rOuterNak + logicalSize * 0.01;
                const planetX = centerX + planetRadius * Math.cos(planetAngle);
                const planetY = centerY + planetRadius * Math.sin(planetAngle);
                const iconSize = 60;
                const hitRadius = 26;

                // Save hit data to Ref for event listeners
                renderedPlanetsRef.current.push({
                    name: planet.name,
                    degree: planet.degree,
                    x: planetX,
                    y: planetY,
                    radius: hitRadius
                });

                const isHovered = hoveredSegment?.type === "planet" && hoveredSegment?.name === planet.name;

                // Glow
                if (isHovered) {
                    ctx.beginPath();
                    ctx.arc(planetX, planetY, hitRadius + 5, 0, Math.PI * 2);
                    ctx.fillStyle = COLORS.planetHover;
                    ctx.fill();
                }

                const key = planet.name.toLowerCase();
                const img = planetImages[key];
                if (img) {
                    ctx.drawImage(img, planetX - iconSize / 2, planetY - iconSize / 2, iconSize, iconSize);
                } else {
                    ctx.beginPath();
                    ctx.arc(planetX, planetY, 6, 0, Math.PI * 2);
                    ctx.fillStyle = "#ffffff";
                    ctx.fill();
                }
            });

            // --- TITLES ---
            ctx.fillStyle = COLORS.centerTitle;
            ctx.font = "bold 18px system-ui, -apple-system";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Nakshatra – Raga", centerX, centerY - 12);
            ctx.fillText("Mandala", centerX, centerY + 12);

            ctx.fillStyle = COLORS.rashiDegreeText;
            ctx.font = "bold 14px system-ui, -apple-system";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`Asc : ${Math.round(ascendantDeg)}°`, centerX, 30);

            ctx.restore();
        };

        draw();

        // Redraw on resize
        const handleResize = () => draw();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [ascendantDeg, planetPositions, hoveredSegment, planetImages]);


    // 3. Event Logic (Separated to prevent thrashing)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // HIT TESTING LOGIC
        const getHitData = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const logicalSize = Math.min(rect.width, 800);

            const centerX = logicalSize / 2;
            const centerY = logicalSize / 2;

            const base = logicalSize / 2;
            const rOuterRashi = base * 0.9;
            const rInnerRashi = base * 0.8;
            const rInnerNak = base * 0.7;
            const rInnerRaga = base * 0.61;

            const rotationDegree = ascendantDeg;
            const rotationOffset = 360 - rotationDegree;

            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // 1. Check Planets (Using Ref data populated by Draw)
            for (const p of renderedPlanetsRef.current) {
                const pdx = mouseX - p.x;
                const pdy = mouseY - p.y;
                if (Math.sqrt(pdx * pdx + pdy * pdy) <= p.radius) {
                    return { type: "planet", name: p.name, degree: p.degree };
                }
            }

            // 2. Check Rings
            let canvasAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
            let angle = -canvasAngleDeg - 90 - rotationOffset;

            angle = angle % 360;
            if (angle < 0) angle += 360;

            if (distance >= rInnerRashi && distance <= rOuterRashi) {
                const rashiIndex = Math.floor(angle / RASHI_SEGMENT_SIZE_DEG);
                return { type: "rashi", index: rashiIndex % RASHIS.length };
            } else if (distance >= rInnerNak && distance <= rInnerRashi) {
                const nakIndex = Math.floor(angle / NAKSHATRA_SEGMENT_SIZE_DEG);
                return { type: "nakshatra", index: nakIndex % NAKSHATRAS.length };
            } else if (distance >= rInnerRaga && distance <= rInnerNak) {
                const ragaIndex = Math.floor(angle / MELAKARTA_SEGMENT_SIZE_DEG);
                return { type: "raaga", index: ragaIndex % MELAKARTA_RAGAS.length };
            }

            return null;
        };

        const handleMouseMove = (e) => {
            // Use Ref to check lock state without re-binding listener
            if (isLockedRef.current) return;

            const newHovered = getHitData(e);
            setHoveredSegment(newHovered);
            if (onHoverChange) onHoverChange(newHovered);
        };

        const handleClick = (e) => {
            const currentLock = isLockedRef.current;
            const clickedItem = getHitData(e);

            // Check if a planet was clicked and trigger callback
            if (clickedItem?.type === "planet" && onPlanetClick) {
                onPlanetClick({
                    name: clickedItem.name,
                    degree: clickedItem.degree
                });
            }

            if (currentLock) {
                // UNLOCK
                setIsLocked(false);
                // Immediately update selection to what's under cursor
                setHoveredSegment(clickedItem);
                if (onHoverChange) onHoverChange(clickedItem);
            } else {
                // LOCK
                setIsLocked(true);
                // Keep current selection frozen
            }
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

    return <canvas ref={canvasRef} style={{ cursor: "pointer" }} />;
};

export default NakshatraRagaMandala;
