// src/app/routes.js

/**
 * routes.js
 *
 * Central place to describe the "screens" (steps) and high-level navigation
 * for the app. This is NOT using a router library right now; it is just a
 * configuration object that app.jsx can refer to.
 *
 * Why keep this file?
 * - Documents the main flows of the application in one place.
 * - Makes it easier later to plug in React Router or another routing system.
 * - Helps you and future contributors quickly see what "screens" exist.
 *
 * Current flow:
 *  1. onboarding  → Collect DOB / place / time, call astrology API.
 *  2. mandala     → Show Nakshatra–Raga Mandala + right-side panels.
 */

export const APP_STEPS = {
    ONBOARDING: "onboarding",
    MANDALA: "mandala",
};

/**
 * Optional metadata for each step/screen.
 * You can extend this later with:
 * - titles for the browser tab
 * - analytics identifiers
 * - access control, etc.
 */
export const STEP_CONFIG = [
    {
        id: APP_STEPS.ONBOARDING,
        label: "Birth Details",
        description:
            "Collect date, time, and place of birth and compute the base chart.",
    },
    {
        id: APP_STEPS.MANDALA,
        label: "Nakshatra–Raga Mandala",
        description:
            "Visualize Nakshatras, Rashis, Ragas, Dashas, and divisional charts.",
    },
];
