// src/features/onboarding/onboarding.types.js

/**
 * onboarding.types.js
 *
 * Type-like documentation for the Onboarding (Step 1) feature.
 * This file does not contain any logic; it only describes, in comments
 * and constants, the shapes of data used by:
 *
 * - OnboardingContainer.jsx  (smart component: handles submit + API call)
 * - OnboardingForm.jsx       (dumb component: renders fields + buttons)
 * - services/astrologyApi.js (actual request/response with backend)
 *
 * Later, if you move to TypeScript, you can convert these comments into
 * real interfaces and reuse the same structure.
 */

/**
 * BirthInput
 * ----------
 * Data collected from the user on the first screen.
 *
 * Example:
 * {
 *   name: "Aditya",
 *   date: "1990-04-15",          // ISO format recommended
 *   time: "14:37",               // 24h format
 *   place: "Hyderabad, India",   // free text or structured place selection
 *   timezone: "Asia/Kolkata",    // IANA timezone id
 *   coordinateLat?: number,      // optional: decimal degrees
 *   coordinateLon?: number       // optional: decimal degrees
 * }
 *
 * Only a subset is mandatory depending on what the backend needs.
 */

/**
 * OnboardingState
 * ---------------
 * Internal UI state for the onboarding screen.
 *
 * {
 *   values: BirthInput,
 *   isSubmitting: boolean,   // true while API call is in progress
 *   error: string | null,    // last error message, if any
 * }
 */

/**
 * API: calculateNatalChart
 * ------------------------
 * Request payload shape (from onboarding to the backend service).
 *
 * {
 *   dob: string,          // e.g. "1990-04-15"
 *   tob: string,          // e.g. "14:37"
 *   place: string,
 *   timezone: string,
 *   lat?: number,
 *   lon?: number
 * }
 *
 * Response is expected to be normalized into the `ChartData` shape
 * described in `src/features/mandala/mandala.types.js`:
 *
 * {
 *   meta: { ...birth data... },
 *   rasi: { ascendantDeg, planets: [...] },
 *   navamsa?: { ascendantDeg, planets: [...] },
 *   // future: other divisional charts
 * }
 */

/**
 * ONBOARDING_STEPS
 * ----------------
 * If later you want to split the birth form into sub-steps
 * (e.g. Step 1: personal details, Step 2: place/time),
 * you can define step identifiers here and orchestrate them
 * inside OnboardingContainer.
 */
export const ONBOARDING_STEPS = {
    SINGLE_SCREEN: "single_screen", // current design: one screen form
    // FUTURE: "basic_details": "basic_details",
    // FUTURE: "location_time": "location_time",
};
