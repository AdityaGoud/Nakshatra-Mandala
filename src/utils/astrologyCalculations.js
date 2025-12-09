import { RASHIS, PLANET_RULES } from "../data/mandalaData";
import { NAKSHATRA_LORDS } from "../data/nakshatraLords";

/**
 * Calculate house number from ascendant
 */
export function calculateHouseNumber(planetDegree, ascendantDegree) {
    let offset = planetDegree - ascendantDegree;
    if (offset < 0) offset += 360;
    return Math.floor(offset / 30) + 1;
}

export const calculateHouseDignity = (planetName, houseNumber) => {
    const houseRules = {
        Sun: { exalted: [10], debilitated: [4], own: [5], friend: [1, 9] },
        Moon: { exalted: [2, 4], debilitated: [8], own: [4], friend: [1, 5, 9] }, // Moon exalted in 2/4 var.
        Mars: { exalted: [10], debilitated: [4], own: [1, 8], friend: [5, 9] },
        Mercury: { exalted: [6], debilitated: [12], own: [3, 6], friend: [1, 5, 9] }, // Merc likes 6th
        Jupiter: { exalted: [4], debilitated: [10], own: [9, 12], friend: [1, 5] },
        Venus: { exalted: [12], debilitated: [6], own: [2, 7], friend: [4] }, // Venus loves 12th
        Saturn: { exalted: [7], debilitated: [1], own: [10, 11], friend: [3, 6, 12] },
        Rahu: { exalted: [3, 6], debilitated: [8, 9, 12], own: [11], friend: [10] },
        Ketu: { exalted: [9, 12], debilitated: [3, 6], own: [8], friend: [4] }
    };

    const rules = houseRules[planetName];
    if (!rules) return "Neutral";

    if (rules.exalted.includes(houseNumber)) return "Exalted";
    if (rules.debilitated.includes(houseNumber)) return "Debilitated";
    if (rules.own.includes(houseNumber)) return "Own House";
    if (rules.friend.includes(houseNumber)) return "Friendly";

    return "Neutral";
};

/**
 * Get Rashi index and name from degree
 */
export function getRashiFromDegree(degree) {
    const index = Math.floor(degree / 30) % 12;
    return { index, name: RASHIS[index] };
}

/**
 * Get Nakshatra index and name from degree
 */
export function getNakshatraFromDegree(degree) {
    const nakSize = 360 / 27;
    const index = Math.floor(degree / nakSize);
    const lord = NAKSHATRA_LORDS[index];
    return { index, lord };
}

/**
 * Calculate which houses a planet rules
 */
export function getHousesRuledByPlanet(planetName, ascendantDegree) {
    const rules = PLANET_RULES[planetName];
    if (!rules || !rules.ownRashi) return [];

    const ascRashiIdx = Math.floor(ascendantDegree / 30);

    return rules.ownRashi.map(signIdx => {
        return ((signIdx - ascRashiIdx + 12) % 12) + 1;
    });
}

/**
 * Calculate planet dignity (exalted, own, debilitated, etc.)
 */
export function calculateDignity(planetName, rashiIndex) {
    const rules = PLANET_RULES[planetName];
    if (!rules) return "Neutral";

    if (rules.exaltedRashi === rashiIndex) return "Exalted";
    if (rules.debilitatedRashi === rashiIndex) return "Debilitated";
    if (rules.ownRashi?.includes(rashiIndex)) return "Own Sign";

    // Check friends/enemies (simplified)
    return "Neutral";
}

/**
 * Find planets in same house
 */
export function getCoOccupants(targetPlanet, allPlanets, ascendantDeg) {
    const targetHouse = calculateHouseNumber(targetPlanet.degree, ascendantDeg);

    return allPlanets.filter(p =>
        p.name !== targetPlanet.name &&
        calculateHouseNumber(p.degree, ascendantDeg) === targetHouse
    );
}
