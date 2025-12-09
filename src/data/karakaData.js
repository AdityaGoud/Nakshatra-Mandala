// Chara Karakas based on planet degrees
export const KARAKA_NAMES = [
    "Atmakaraka (AK)",    // Highest degree
    "Amatyakaraka (AmK)", // 2nd highest
    "Bhratrikaraka (BK)", // 3rd
    "Matrikaraka (MK)",   // 4th
    "Putrakaraka (PK)",   // 5th
    "Gnatikaraka (GK)",   // 6th
    "Darakaraka (DK)"     // 7th (lowest)
];

export function calculateKarakas(planets) {
    // Sort planets by degree (excluding Rahu/Ketu)
    const sorted = planets
        .filter(p => !["Rahu", "Ketu"].includes(p.name))
        .map(p => ({
            name: p.name,
            normDegree: p.degree % 30  // Degree within sign
        }))
        .sort((a, b) => b.normDegree - a.normDegree);

    return sorted.map((p, idx) => ({
        planet: p.name,
        karaka: KARAKA_NAMES[idx]
    }));
}
