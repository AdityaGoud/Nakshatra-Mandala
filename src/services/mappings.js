// src/services/mappings.js

/**
 * mappings.js
 *
 * Helper functions that translate between:
 * - Raw zodiac degrees (0–360)
 * - Higher-level concepts used in your app:
 *   - Rashi index (0–11)
 *   - Nakshatra index (0–26)
 *   - Melakarta raga index (0–71)
 *
 * This file centralizes all "math + mapping" logic, so:
 * - Canvas code stays focused on drawing.
 * - Right-panel components can ask clear questions like:
 *     "Which Nakshatra is this degree in?"
 * - If your mapping conventions change (e.g. rotation or reference),
 *   you only need to update things here.
 */

import {
    MELAKARTA_RAGAS,
    MELAKARTA_SEGMENT_SIZE_DEG,
    NAKSHATRA_SEGMENT_SIZE_DEG,
    NAKSHATRAS,
    RASHI_SEGMENT_SIZE_DEG,
    RASHIS,
    PLANET_RULES,
} from "../data/mandalaData";

/**
 * normalizeDegree
 *
 * Ensures a longitude is always in the range [0, 360).
 */
export function normalizeDegree(deg) {
    if (typeof deg !== "number" || isNaN(deg)) return 0;
    let d = deg % 360;
    if (d < 0) d += 360;
    return d;
}

/**
 * degreeToRashiIndex
 *
 * Given a normalized longitude (0–360), return 0–11.
 */
export function degreeToRashiIndex(degree) {
    const d = normalizeDegree(degree);
    return Math.floor(d / RASHI_SEGMENT_SIZE_DEG);
}

/**
 * degreeToNakshatraIndex
 *
 * Given a normalized longitude (0–360), return 0–26.
 */
export function degreeToNakshatraIndex(degree) {
    const d = normalizeDegree(degree);
    return Math.floor(d / NAKSHATRA_SEGMENT_SIZE_DEG);
}

/**
 * degreeToMelakartaIndex
 *
 * Given a normalized longitude (0–360), return 0–71.
 */
export function degreeToMelakartaIndex(degree) {
    const d = normalizeDegree(degree);
    return Math.floor(d / MELAKARTA_SEGMENT_SIZE_DEG);
}

/**
 * Get richer info objects for a degree.
 * These helpers are useful for right-panel logic when you want to
 * describe where a planet or ascendant lies in the mandala.
 */

export function getRashiInfoFromDegree(degree) {
    const index = degreeToRashiIndex(degree);
    return {
        index,
        name: RASHIS[index],
        number: index + 1, // 1–12 for astrology-style display
    };
}

export function getNakshatraInfoFromDegree(degree) {
    const index = degreeToNakshatraIndex(degree);
    return {
        index,
        name: NAKSHATRAS[index],
        number: index + 1, // 1–27
    };
}

export const getPlanetDignity = (planetName, degree) => {
    const rules = PLANET_RULES[planetName];
    if (!rules) return "Neutral";

    // Calculate Rashi Index (0-11) from degree (0-360)
    // Each Rashi is 30 degrees
    const rashiIndex = Math.floor(degree / 30) % 12;

    if (rashiIndex === rules.exaltedRashi) return "Exalted";
    if (rashiIndex === rules.debilitatedRashi) return "Debilitated";
    if (rules.ownRashi.includes(rashiIndex)) return "Own Sign";

    // Friend/Enemy check requires knowing the Lord of the Rashi the planet is in.
    // For now, we'll return a simple "Neutral" or extend this logic later.
    // A simpler placeholder for "Rashi Wise" status:
    return "Neutral";
};

/**
 * Calculates which House the planet is in relative to Ascendant.
 * Returns 1 through 12.
 */
export const getHouseNumber = (planetDegree, ascendantDegree) => {
    // House 1 starts at Ascendant degree (Equal House System for simplicity)
    // Or House 1 is the entire Rashi of Ascendant (Whole Sign System)

    // Let's use Whole Sign for standard Vedic feel:
    const ascRashi = Math.floor(ascendantDegree / 30);
    const planetRashi = Math.floor(planetDegree / 30);

    let house = (planetRashi - ascRashi) + 1;
    if (house <= 0) house += 12;

    return house;
};

export function getMelakartaInfoFromDegree(degree) {
    const index = degreeToMelakartaIndex(degree);
    return {
        index,
        name: MELAKARTA_RAGAS[index],
        number: index + 1, // 1–72
    };
}

/**
 * planetToSegmentInfo
 *
 * Given a PlanetPosition { name, degree }, return a combined
 * view of where it falls in Rashi and Nakshatra.
 * This can be used later for more advanced right-panel views.
 */
export function planetToSegmentInfo(planet) {
    const d = normalizeDegree(planet.degree);
    return {
        planetName: planet.name,
        degree: d,
        rashi: getRashiInfoFromDegree(d),
        nakshatra: getNakshatraInfoFromDegree(d),
        raga: getMelakartaInfoFromDegree(d), // optional, more symbolic
    };
}