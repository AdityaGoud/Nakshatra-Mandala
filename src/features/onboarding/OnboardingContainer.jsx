// src/features/onboarding/OnboardingContainer.jsx

import React, {useState} from "react";
import OnboardingForm from "./OnboardingForm";
import {ONBOARDING_STEPS} from "./onboarding.types";
// import { calculateNatalChart } from "../../services/astrologyApi"; // to be implemented

/**
 * OnboardingContainer
 *
 * Smart/container component for Step 1 (birth details screen).
 *
 * Responsibilities:
 * - Hold form values and local UI state (loading, error).
 * - Validate and normalize input (DOB, time, place, etc.).
 * - Call the astrology API layer (when implemented) to compute the chart.
 * - Transform the raw API response into `chartData` shape expected by app.
 * - Call `onChartReady(chartData)` when everything is ready,
 *   so app can move to the Mandala screen.
 *
 * It delegates UI rendering of the form to OnboardingForm (presentational).
 */

const OnboardingContainer = ({onChartReady}) => {
    const [step] = useState(ONBOARDING_STEPS.SINGLE_SCREEN);

    const [values, setValues] = useState({
        name: "",
        date: "",
        time: "",
        place: "",
        timezone: "Asia/Kolkata",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (field, value) => {
        setValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        setError(null);

        // Basic front-end validation
        if (!values.date || !values.time || !values.place) {
            setError("Please fill date, time, and place of birth.");
            return;
        }

        setIsSubmitting(true);

        try {
            // TODO: Replace mock with real API call using services/astrologyApi.js
            // const chartResponse = await calculateNatalChart(values);

            // MOCK: Simple chartData structure for now
            const mockChartData = {
                meta: {
                    name: values.name,
                    dob: values.date,
                    tob: values.time,
                    place: values.place,
                    timezone: values.timezone,
                },
                rasi: {
                    ascendantDeg: 96, // example
                    planets: [
                        {name: "Jupiter", degree: 120},
                        {name: "Mars", degree: 45},
                        {name: "Sun", degree: 200},
                        {name: "Moon", degree: 40},
                        {name: "Saturn", degree: 2},
                        {name: "Mercury", degree: 182},
                        {name: "Ketu", degree: 150},
                        {name: "Rahu", degree: 330},
                        {name: "Venus", degree: 330},
                    ],
                },
                // navamsa: { ... } // to be filled when API is available
            };

            onChartReady(mockChartData);
        } catch (e) {
            console.error(e);
            setError("Unable to calculate chart. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="main-layout">
            {/* Left side can be left empty or used later for intro text / illustration */}
            <div className="mandala-container">
                <div className="mandala-wrapper">
                    {/* Placeholder comment:
             In the future, you could show a subtle static mandala,
             logo, or intro graphic here on the onboarding screen. */}
                </div>
            </div>

            {/* Right side: the actual onboarding form card */}
            <div className="info-panel">
                <OnboardingForm
                    step={step}
                    values={values}
                    isSubmitting={isSubmitting}
                    error={error}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default OnboardingContainer;
