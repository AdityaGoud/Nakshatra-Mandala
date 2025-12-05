// src/data/mandalaData.js

/**
 * mandalaData.js
 *
 * Central, shared definitions for all static mandala-related
 * - Rashis (zodiac signs)
 * - Nakshatras (27 lunar mansions)
 * - Melakarta Ragas (72 parent ragas)
 *
 * This file is the single source of truth for:
 * - Names and ordering
 * - Degrees per segment in the 360° circle
 *
 * All drawing code (canvas) and all UI (right panel views) should import
 * from here instead of redefining arrays locally.
 *
 * NOTE ON INDEXING:
 * - Arrays here are 0-based for code convenience.
 * - Astrologically, you may refer to them as 1-based (e.g. Ashwini = 1).
 * - In UI, whenever you show an ordinal (1, 2, 3...), use index + 1.
 */

/**
 * 12 Rashis (Zodiac signs).
 * Each sign spans exactly 30° in the full 360° zodiac.
 *
 * index 0 → Aries (0°–30°)
 * index 1 → Taurus (30°–60°)
 * ...
 * index 11 → Pisces (330°–360°)
 */
export const RASHIS = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
];

export const RASHI_SEGMENT_SIZE_DEG = 30;

/**
 * 27 Nakshatras.
 * These divide the 360° zodiac into 27 equal parts of 13°20' each
 * (i.e. 13.333... degrees).
 *
 * index 0  → Ashwini
 * index 26 → Revati
 */
export const NAKSHATRAS = [
    "Ashwini",
    "Bharani",
    "Krittika",
    "Rohini",
    "Mrigashira",
    "Ardra",
    "Punarvasu",
    "Pushya",
    "Ashlesha",
    "Magha",
    "P. Phalguni",
    "U. Phalguni",
    "Hasta",
    "Chitra",
    "Swati",
    "Vishakha",
    "Anuradha",
    "Jyeshtha",
    "Mula",
    "P. Ashadha",
    "U. Ashadha",
    "Shravana",
    "Dhanishta",
    "Shatabhisha",
    "P. Bhadra",
    "U. Bhadra",
    "Revati",
];

// 360° / 27 ≈ 13.333... degrees per Nakshatra
export const NAKSHATRA_SEGMENT_SIZE_DEG = 360 / 27;

/**
 * 72 Melakarta Ragas.
 * These are the parent ragas in Carnatic music, arranged in canonical order.
 * In your mandala, each Melakarta can occupy a 5° segment (360° / 72).
 *
 * index 0  → Kanakangi (Melakarta 1)
 * index 71 → Rasikapriya (Melakarta 72)
 */
export const MELAKARTA_RAGAS = [
    "Kanakangi",
    "Ratnangi",
    "Ganamurti",
    "Vanaspati",
    "Manavati",
    "Tanarupi",
    "Senavati",
    "Hanumatodi",
    "Dhenuka",
    "Natakapriya",
    "Kokilapriya",
    "Rupavati",
    "Gayakapriya",
    "Vakulabharanam",
    "Mayamalavagowla",
    "Chakravakam",
    "Suryakantam",
    "Hatakambari",
    "Jhankaradhvani",
    "Natabhairavi",
    "Keeravani",
    "Kharaharapriya",
    "Gourimanohari",
    "Varunapriya",
    "Mararanjani",
    "Charukesi",
    "Sarasangi",
    "Harikambhoji",
    "Dheerasankarabharanam",
    "Naganandini",
    "Yagapriya",
    "Ragavardhani",
    "Gangeyabhushani",
    "Vagadheeswari",
    "Sulini",
    "Chalanata",
    "Salagam",
    "Jalarnavam",
    "Jhalavarali",
    "Navaneetam",
    "Pavani",
    "Raghupriya",
    "Gavambhodi",
    "Bhavapriya",
    "Shubhapantuvarali",
    "Shadvidamargini",
    "Suvarnangi",
    "Divyamani",
    "Dhavalambari",
    "Namanarayani",
    "Kamavardhani",
    "Ramapriya",
    "Gamanashrama",
    "Viswambhari",
    "Shyamalangi",
    "Shanmukhapriya",
    "Simhendramadhyamam",
    "Hemavati",
    "Dharmavati",
    "Neetimati",
    "Kantamani",
    "Rishabhapriya",
    "Latangi",
    "Vachaspati",
    "Mechakalyani",
    "Chitrambari",
    "Sucharitra",
    "Jyotiswarupini",
    "Dhatuvardhani",
    "Nasikabhushani",
    "Kosalam",
    "Rasikapriya",
];

// 360° / 72 = 5° per Melakarta segment in the inner ring
export const MELAKARTA_SEGMENT_SIZE_DEG = 5;

/**
 * Helper: convert a 0-based Melakarta index (0–71) to its 1-based number (1–72).
 * Use this for displaying "Melakarta #X" in the UI.
 */
export function getMelakartaNumberFromIndex(index) {
    return index + 1;
}

export const PLANET_RULES = {
    Sun: {
        exaltedRashi: 0, // Aries
        debilitatedRashi: 6, // Libra
        ownRashi: [4], // Leo
        friends: ["Moon", "Mars", "Jupiter"],
        enemies: ["Venus", "Saturn"],
        neutral: ["Mercury"],
    },
    Moon: {
        exaltedRashi: 1, // Taurus
        debilitatedRashi: 7, // Scorpio
        ownRashi: [3], // Cancer
        friends: ["Sun", "Mercury"],
        enemies: [],
        neutral: ["Mars", "Jupiter", "Venus", "Saturn"],
    },
    Mars: {
        exaltedRashi: 9, // Capricorn
        debilitatedRashi: 3, // Cancer
        ownRashi: [0, 7], // Aries, Scorpio
        friends: ["Sun", "Moon", "Jupiter"],
        enemies: ["Mercury"],
        neutral: ["Venus", "Saturn"],
    },
    Mercury: {
        exaltedRashi: 5, // Virgo
        debilitatedRashi: 11, // Pisces
        ownRashi: [2, 5], // Gemini, Virgo
        friends: ["Sun", "Venus"],
        enemies: ["Moon"],
        neutral: ["Mars", "Jupiter", "Saturn"],
    },
    Jupiter: {
        exaltedRashi: 3, // Cancer
        debilitatedRashi: 9, // Capricorn
        ownRashi: [8, 11], // Sagittarius, Pisces
        friends: ["Sun", "Moon", "Mars"],
        enemies: ["Mercury", "Venus"],
        neutral: ["Saturn"],
    },
    Venus: {
        exaltedRashi: 11, // Pisces
        debilitatedRashi: 5, // Virgo
        ownRashi: [1, 6], // Taurus, Libra
        friends: ["Mercury", "Saturn"],
        enemies: ["Sun", "Moon"],
        neutral: ["Mars", "Jupiter"],
    },
    Saturn: {
        exaltedRashi: 6, // Libra
        debilitatedRashi: 0, // Aries
        ownRashi: [9, 10], // Capricorn, Aquarius
        friends: ["Mercury", "Venus"],
        enemies: ["Sun", "Moon", "Mars"],
        neutral: ["Jupiter"],
    },
    Rahu: {
        // Simplified rules (often debated)
        exaltedRashi: 1, // Taurus (varies by tradition)
        debilitatedRashi: 7, // Scorpio
        ownRashi: [],
        friends: ["Mercury", "Venus", "Saturn"],
        enemies: ["Sun", "Moon", "Mars"],
        neutral: ["Jupiter"],
    },
    Ketu: {
        // Simplified rules
        exaltedRashi: 7, // Scorpio
        debilitatedRashi: 1, // Taurus
        ownRashi: [],
        friends: ["Mars", "Jupiter"],
        enemies: ["Mercury", "Venus", "Saturn"],
        neutral: ["Sun", "Moon"],
    },
};

/**
 * Helper: given a zodiac longitude in degrees (0–360),
 * return the 0-based Nakshatra index and its name.
 *
 * This can be used later when you get Moon longitude from the API and
 * want to highlight its Nakshatra or show Dasha lord info.
 *
 * @param {number} longitudeDeg - 0 ≤ longitude < 360
 * @returns {{ index: number, name: string } | null}
 */
export function getNakshatraFromLongitude(longitudeDeg) {
    if (typeof longitudeDeg !== "number") return null;

    let deg = longitudeDeg % 360;
    if (deg < 0) deg += 360;

    const index = Math.floor(deg / NAKSHATRA_SEGMENT_SIZE_DEG);
    return {
        index,
        name: NAKSHATRAS[index],
    };
}
