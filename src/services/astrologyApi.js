// src/services/astrologyApi.js

const BASE_URL = "https://json.freeastrologyapi.com";
const API_KEY = "rTl8NNaEXT327Weicff8b8yJSf3Teoys5hY5w5o6";

// Helper to clean up response
function normalizeChartResponse(apiData) {
    if (!apiData || !apiData.output) {
        throw new Error("Invalid API response format");
    }

    // FIX: Handle Object vs Array output
    let rawBodies = [];
    if (Array.isArray(apiData.output)) {
        rawBodies = apiData.output;
    } else if (typeof apiData.output === "object") {
        // Convert object values to array
        rawBodies = Object.values(apiData.output);
    }

    // Find Ascendant (Check both 'Ascendant' and maybe 'ASC' if API varies)
    const ascendantObj = rawBodies.find(b => b.name === "Ascendant" || b.localized_name === "Ascendant");
    const ascendantDeg = ascendantObj ? ascendantObj.fullDegree : 0;

    const targetPlanets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

    const formattedPlanets = rawBodies
        .filter(b => targetPlanets.includes(b.name) || targetPlanets.includes(b.localized_name))
        .map(b => ({
            name: b.name || b.localized_name,
            degree: b.fullDegree,
            isRetro: b.isRetro === "true"
        }));

    const result = {
        rasi: { ascendantDeg, planets: formattedPlanets },
        navamsa: { ascendantDeg: 0, planets: [] }
    };

    console.log("✅ [NORMALIZED DATA]:", JSON.stringify(result, null, 2));
    return result;
}

export async function calculateNatalChart(birthInput) {
    // 1. Prepare Payload
    const dateObj = new Date(birthInput.date);
    const [hours, minutes] = birthInput.time.split(":").map(Number);

    const payload = {
        year: dateObj.getFullYear(),
        month: dateObj.getMonth() + 1,
        date: dateObj.getDate(),
        hours: hours,
        minutes: minutes,
        seconds: 0,
        latitude: parseFloat(birthInput.lat),
        longitude: parseFloat(birthInput.lon),
        timezone: parseFloat(birthInput.timezone),
        settings: {
            observation_point: "topocentric",
            ayanamsha: "lahiri",
        },
    };

    // 🚨 LOG REQUEST
    console.log("📤 [API REQUEST PAYLOAD]:", JSON.stringify(payload, null, 2));

    try {
        const response = await fetch(`${BASE_URL}/planets/extended`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("❌ [API ERROR]:", errText);
            throw new Error(`API Error ${response.status}: ${errText}`);
        }

        const rawData = await response.json();

        // 🚨 LOG RAW RESPONSE
        console.log("📥 [API RAW RESPONSE]:", JSON.stringify(rawData, null, 2));

        return normalizeChartResponse(rawData);

    } catch (error) {
        console.error("💥 [SERVICE FAILURE]:", error);
        throw error;
    }
}
