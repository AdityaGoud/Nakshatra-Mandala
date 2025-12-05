// src/data/dashaData.js

/**
 * dashaData.js
 *
 * Central place for all static data related to Dasha systems.
 *
 * What lives here:
 * - Vimshottari Dasha sequence (planet order and durations).
 * - High-level descriptions for each Dasha lord.
 * - Helper lookups used by the Dasha view on the right panel.
 *
 * What does NOT live here:
 * - Actual Dasha period calculations based on birth time.
 *   That dynamic logic should live in `services/astrologyApi.js`
 *   or a separate `services/dashaEngine.js`.
 */

/**
 * Vimshottari Dasha sequence.
 * Order and canonical durations in years.
 * This is the base for computing Mahadasha / Antardasha periods.
 */
export const VIMSHOTTARI_SEQUENCE = [
    {lord: "Ketu", durationYears: 7},
    {lord: "Venus", durationYears: 20},
    {lord: "Sun", durationYears: 6},
    {lord: "Moon", durationYears: 10},
    {lord: "Mars", durationYears: 7},
    {lord: "Rahu", durationYears: 18},
    {lord: "Jupiter", durationYears: 16},
    {lord: "Saturn", durationYears: 19},
    {lord: "Mercury", durationYears: 17},
];

/**
 * Simple descriptive text for each Dasha lord.
 * These can be shown in the UI when a particular Dasha is active.
 * You can expand or refine these texts later.
 */
export const DASHA_LORD_DETAILS = {
    Ketu: {
        name: "Ketu",
        type: "Chaya Graha",
        keywords: ["spiritual", "detachment", "past karma"],
        summary:
            "Ketu periods often highlight detachment, inner searching, and unresolved karmic themes.",
    },
    Venus: {
        name: "Venus",
        type: "Shukra",
        keywords: ["relationships", "comfort", "arts"],
        summary:
            "Venus periods emphasize love, relationships, aesthetics, and material comforts.",
    },
    Sun: {
        name: "Sun",
        type: "Surya",
        keywords: ["authority", "ego", "vitality"],
        summary:
            "Sun periods tend to activate themes of identity, leadership, status, and visibility.",
    },
    Moon: {
        name: "Moon",
        type: "Chandra",
        keywords: ["mind", "emotions", "nourishment"],
        summary:
            "Moon periods relate to emotional life, mental states, family, and inner security.",
    },
    Mars: {
        name: "Mars",
        type: "Mangala",
        keywords: ["action", "courage", "conflict"],
        summary:
            "Mars periods bring initiative, drive, and sometimes conflict or accidents if misdirected.",
    },
    Rahu: {
        name: "Rahu",
        type: "Chaya Graha",
        keywords: ["obsession", "foreign", "sudden"],
        summary:
            "Rahu periods can bring sudden changes, foreign influences, and intense worldly desires.",
    },
    Jupiter: {
        name: "Jupiter",
        type: "Guru",
        keywords: ["growth", "wisdom", "luck"],
        summary:
            "Jupiter periods usually support expansion, learning, teaching, and opportunities.",
    },
    Saturn: {
        name: "Saturn",
        type: "Shani",
        keywords: ["discipline", "delay", "responsibility"],
        summary:
            "Saturn periods test patience and responsibility, but offer long-term consolidation.",
    },
    Mercury: {
        name: "Mercury",
        type: "Budha",
        keywords: ["intellect", "communication", "trade"],
        summary:
            "Mercury periods focus on learning, networking, commerce, and analytical thinking.",
    },
};

/**
 * Helper: Given a Nakshatra index (0–26), return its Dasha lord.
 * This uses the standard Vimshottari mapping starting from Ketu at Ashwini.
 *
 * NOTE:
 * - This is a simple lookup helper for the UI.
 * - Full, precise Dasha computations based on Moon longitude
 *   should be done in a dedicated service file.
 */
export const NAKSHATRA_DASHA_LORDS = [
    "Ketu",   // 0 Ashwini
    "Venus",  // 1 Bharani
    "Sun",    // 2 Krittika
    "Moon",   // 3 Rohini
    "Mars",   // 4 Mrigashira
    "Rahu",   // 5 Ardra
    "Jupiter",// 6 Punarvasu
    "Saturn", // 7 Pushya
    "Mercury",// 8 Ashlesha
    "Ketu",   // 9 Magha
    "Venus",  // 10 P. Phalguni
    "Sun",    // 11 U. Phalguni
    "Moon",   // 12 Hasta
    "Mars",   // 13 Chitra
    "Rahu",   // 14 Swati
    "Jupiter",// 15 Vishakha
    "Saturn", // 16 Anuradha
    "Mercury",// 17 Jyeshtha
    "Ketu",   // 18 Mula
    "Venus",  // 19 P. Ashadha
    "Sun",    // 20 U. Ashadha
    "Moon",   // 21 Shravana
    "Mars",   // 22 Dhanishta
    "Rahu",   // 23 Shatabhisha
    "Jupiter",// 24 P. Bhadra
    "Saturn", // 25 U. Bhadra
    "Mercury" // 26 Revati
];

/**
 * Convenience function: get details for the Dasha lord of a given Nakshatra.
 *
 * @param {number} nakshatraIndex - 0–26, matching your mandala's nakshatra array
 * @returns {{lord: string, details: object} | null}
 */
export function getDashaForNakshatra(nakshatraIndex) {
    if (
        typeof nakshatraIndex !== "number" ||
        nakshatraIndex < 0 ||
        nakshatraIndex >= NAKSHATRA_DASHA_LORDS.length
    ) {
        return null;
    }

    const lord = NAKSHATRA_DASHA_LORDS[nakshatraIndex];
    const details = DASHA_LORD_DETAILS[lord] || null;

    return {lord, details};
}

export function getDashaForNakshatraNumber(nakshatraNumber) {
    // nakshatraNumber: 1–27 (astrology style)
    const index = nakshatraNumber - 1; // convert to 0–26
    if (index < 0 || index >= NAKSHATRA_DASHA_LORDS.length) return null;
    const lord = NAKSHATRA_DASHA_LORDS[index];
    const details = DASHA_LORD_DETAILS[lord] || null;
    return {lord, details};
}

