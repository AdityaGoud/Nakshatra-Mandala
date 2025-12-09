// Maps Nakshatra index (0-26) to Dasha lord
export const NAKSHATRA_LORDS = [
    "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu",
    "Jupiter", "Saturn", "Mercury", // Repeats 3 times
    "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu",
    "Jupiter", "Saturn", "Mercury",
    "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu",
    "Jupiter", "Saturn", "Mercury"
];

export function getNakshatraLord(nakshatraIndex) {
    return NAKSHATRA_LORDS[nakshatraIndex];
}
