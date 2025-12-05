// src/services/astrologyApi.js

/**
 * astrologyApi.js
 *
 * API layer for all astrology-related backend calls.
 *
 * This file isolates network logic from your React components, so:
 * - Components (OnboardingContainer, MandalaContainer, etc.) only call
 *   simple functions like `calculateNatalChart(birthInput)`.
 * - If you later change the backend URL, authentication, or response
 *   format, you only update this file instead of hunting through the UI.
 *
 * NOTE:
 * - Right now this file contains a mocked implementation so that your
 *   app can run without a real backend.
 * - Replace the mock with a real `fetch`/`axios` POST call when your
 *   API is ready.
 */

const BASE_URL = "http://localhost:4000";
// Version1: update when backend is ready

/**
 * normalizeChartResponse
 *
 * Helper to convert the raw backend response into the `chartData` shape
 * used by app and MandalaContainer.
 *
 * Expected output shape:
 * {
 *   meta: { dob, tob, place, timezone, ... },
 *   rasi: {
 *     ascendantDeg: number,
 *     planets: PlanetPosition[],
 *   },
 *   navamsa?: {
 *     ascendantDeg: number,
 *     planets: PlanetPosition[],
 *   }
 * }
 *
 * @param {any} apiData - raw response from backend
 * @returns {any} chartData compatible object
 */
function normalizeChartResponse(apiData) {
    // version1: adapt this mapping once you know the actual backend format.

    // Example of a minimal mapping:
    return {
        meta: {
            dob: apiData?.dob,
            tob: apiData?.tob,
            place: apiData?.place,
            timezone: apiData?.timezone,
        },
        rasi: {
            ascendantDeg: apiData?.rasi?.asc || 96,
            planets: apiData?.rasi?.planets || [],
        },
        navamsa: apiData?.navamsa
            ? {
                ascendantDeg: apiData.navamsa.asc,
                planets: apiData.navamsa.planets,
            }
            : undefined,
    };
}

/**
 * calculateNatalChart
 *
 * Main function to be used by OnboardingContainer.
 * Takes birth input and returns `chartData`.
 *
 * @param {Object} birthInput
 * {
 *   date: "1990-04-15",
 *   time: "14:37",
 *   place: "Hyderabad, India",
 *   timezone: "Asia/Kolkata",
 *   name?: string,
 * }
 *
 * @returns {Promise<any>} chartData
 */
export async function calculateNatalChart(birthInput) {
    // ----- MOCK IMPLEMENTATION -----
    // For now, return the same mock your OnboardingContainer uses,
    // but from here instead of hardcoding it in the component.
    //
    // Replace this block with a real API call when backend is ready.

    // Example real call (commented out until backend exists):
    //
    // const response = await fetch(`${BASE_URL}/api/chart/natal`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(birthInput),
    // });
    //
    // if (!response.ok) {
    //   throw new Error("Failed to calculate natal chart");
    // }
    //
    // const apiData = await response.json();
    // return normalizeChartResponse(apiData);

    // MOCK DATA:
    const mockApiData = {
        dob: birthInput.date,
        tob: birthInput.time,
        place: birthInput.place,
        timezone: birthInput.timezone,
        rasi: {
            asc: 96,
            planets: [
                {name: "Jupiter", degree: 120},
                {name: "Mars", degree: 45},
                {name: "Sun", degree: 200},
                {name: "Moon", degree: 40},
                {name: "Saturn", degree: 2},
                {name: "Mercury", degree: 182},
                {name: "Ketu", degree: 150},
                {name: "Rahu", degree: 330},
            ],
        },
        // navamsa: { asc: 210, planets: [...] } // add later
    };

    return normalizeChartResponse(mockApiData);
}

/**
 * FUTURE FUNCTIONS
 *
 * You can add more functions here as your backend grows, for example:
 *
 * - calculateDivisionalChart(birthInput, type)
 *   → returns a specific divisional chart (D9, D10, etc.)
 *
 * - lookupTimezone(place)
 *   → if your backend can convert a place string to coordinates + timezone
 *
 * - getTransitData(currentDateTime, place)
 *   → for future transit overlays on the mandala
 *
 * Keep them all in this file (or split into multiple files inside /services)
 * so that all network-related logic is cleanly separated from React components.
 */
