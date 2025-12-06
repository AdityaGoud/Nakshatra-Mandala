/**
 * astrologyStrengthCalculator.js
 * 
 * Calculates the overall astrological strength of a planet based on:
 * - Dignity (Exalted, Own Sign, Neutral, Debilitated)
 * - House placement (Kendra, Trikona, etc.)
 * - Position within sign (0-30°)
 */

/**
 * Calculate overall astrological strength of a planet
 * 
 * @param {string} planetName - Planet name (e.g., "Mercury", "Jupiter")
 * @param {number} degree - Planet degree (0-360)
 * @param {number} houseNum - House number (1-12)
 * @param {string} dignity - Dignity status ("Exalted", "Own Sign", "Neutral", "Debilitated")
 * @returns {{
 *   overall_strength: number,
 *   dignity_score: number,
 *   house_score: number,
 *   position_score: number
 * }}
 */
export function calculatePlanetStrength(planetName, degree, houseNum, dignity) {
    // Calculate dignity score (0-100)
    let dignityScore = 50; // default Neutral
    if (dignity === "Exalted") {
        dignityScore = 100;
    } else if (dignity === "Own Sign") {
        dignityScore = 75;
    } else if (dignity === "Debilitated") {
        dignityScore = 25;
    }

    // Calculate house score (0-100)
    // Kendra houses (1, 4, 7, 10): 100%
    // Trikona houses (5, 9): 85%
    // All others: 60%
    let houseScore = 60;
    if ([1, 4, 7, 10].includes(houseNum)) {
        houseScore = 100;
    } else if ([5, 9].includes(houseNum)) {
        houseScore = 85;
    }

    // Calculate position score (0-100)
    // Position within sign (0-30°)
    // Normalize to 0-30 within each rashi
    const normalizedDegree = degree % 30;
    // Map 0-30 to 0-100 (position matters less than dignity/house)
    // But higher degree in sign is generally considered stronger
    const positionScore = (normalizedDegree / 30) * 100;

    // Weighted average (same as plan)
    // Dignity: 40%, House: 30%, Position: 20%, Baseline: 10%
    const overallStrength = Math.round(
        (dignityScore * 0.4) +
        (houseScore * 0.3) +
        (positionScore * 0.2) +
        10
    );

    return {
        overall_strength: Math.min(100, Math.max(0, overallStrength)), // Clamp to 0-100
        dignity_score: dignityScore,
        house_score: houseScore,
        position_score: Math.round(positionScore)
    };
}
