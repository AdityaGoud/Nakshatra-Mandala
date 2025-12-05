// src/features/mandala/mandala.types.js

/**
 * mandala.types.js
 *
 * Shared type-like definitions (in plain JS) for the Mandala feature.
 * This file does not contain logic; it documents the shape of data
 * exchanged between:
 * - app.jsx
 * - MandalaContainer.jsx
 * - NakshatraRagaMandala.jsx (canvas)
 * - RightPanelContainer and its views
 *
 * If you later migrate to TypeScript, these comments can be turned
 * into real interfaces/types almost 1:1.
 */

/**
 * ChartData
 * ---------
 * High-level structure stored in app state and passed into MandalaContainer.
 *
 * Example shape (all fields optional until your API is finalized):
 *
 * {
 *   meta: {
 *     dob: string,        // ISO date or "DD-MM-YYYY"
 *     tob: string,        // time of birth, e.g. "14:37"
 *     place: string,      // city/town
 *     timezone: string,   // e.g. "Asia/Kolkata"
 *   },
 *   rasi: {
 *     ascendantDeg: number,   // 0–360 ecliptic longitude of Lagna
 *     planets: PlanetPosition[],
 *   },
 *   navamsa: {
 *     ascendantDeg: number,
 *     planets: PlanetPosition[],
 *   },
 *   // future: other divisional charts (D10, D7, etc.)
 * }
 */

/**
 * PlanetPosition
 * --------------
 * Represents a single planet’s position on the zodiac circle.
 *
 * {
 *   name: string,        // "Sun" | "Moon" | "Mars" | "Mercury" | ...
 *   degree: number,      // 0–360, longitude within zodiac
 *   speed?: number,      // optional, if you ever need motion
 *   retrograde?: boolean // optional, true if planet is retrograde
 * }
 */

/**
 * HoverSelection
 * --------------
 * Used to describe what the user is currently hovering in the mandala.
 * This is produced by NakshatraRagaMandala.jsx and consumed by the
 * right panel views.
 *
 * Possible shapes:
 *
 * Rashi segment:
 * {
 *   type: "rashi",
 *   index: number,    // 0–11
 * }
 *
 * Nakshatra segment:
 * {
 *   type: "nakshatra",
 *   index: number,    // 0–26
 * }
 *
 * Raga segment:
 * {
 *   type: "raaga",
 *   index: number,    // 0–71
 * }
 *
 * You may later extend this to include:
 * - exact degree under the cursor
 * - which planet (if any) is near the cursor, etc.
 */

/**
 * ActiveChartType
 * ---------------
 * Indicates which chart is currently being visualized in the mandala.
 * For example:
 *
 * "rasi"    → base chart
 * "navamsa" → D9 chart
 *
 * You can extend this enum-like set if you add more divisional charts.
 */
export const ACTIVE_CHART_TYPES = {
    RASI: "rasi",
    NAVAMSA: "navamsa",
};

/**
 * RightPanelTab
 * -------------
 * Identifiers for tabs in the right-hand panel.
 *
 * "details" → contextual info based on hover (Rashi/Nakshatra/Raga)
 * "dasha"   → Dasha-related info (Mahadasha lord, etc.)
 * "navamsa" → Navamsa-specific info + controls to switch chart type
 *
 * Add new keys here when introducing more tabs like "transits", "ashtakavarga", etc.
 */
export const RIGHT_PANEL_TABS = {
    DETAILS: "details",
    DASHA: "dasha",
    NAVAMSA: "navamsa",
};
