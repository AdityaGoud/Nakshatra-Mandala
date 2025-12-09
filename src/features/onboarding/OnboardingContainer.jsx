// src/features/onboarding/OnboardingContainer.jsx
import React, { useState } from "react";

import OnboardingForm from "./OnboardingForm";
import { calculateNatalChart } from "../../services/astrologyApi";
import {logger} from "../../utils/logger";

const OnboardingContainer = ({ onChartReady }) => {
    logger.log('INIT', 'Onboarding mounted', null, 'ONBOARD');

    const [values, setValues] = useState({
        name: "",
        date: new Date().toISOString().split('T')[0],
        time: "12:00",
        place: "Bangalore, India",
        timezone: "5.5",
        lat: 12.9716,
        lon: 77.5946,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (field, value) => {
        logger.log('INPUT', `${field} changed`, { value }, 'ONBOARD');
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        logger.log('SUBMIT', 'Form submitted', values, 'ONBOARD');
        setError(null);
        setIsSubmitting(true);

        try {
            logger.log('API', 'Calling calculateNatalChart', null, 'ONBOARD');
            const chartData = await calculateNatalChart(values);
            logger.log('API', 'Chart received', { planets: chartData?.rasi?.planets?.length }, 'ONBOARD');
            onChartReady(chartData);
        } catch (err) {
            logger.log('ERROR', 'API failed', { error: err.message }, 'ONBOARD');
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="onboarding-container">
            <OnboardingForm
                values={values}
                isSubmitting={isSubmitting}
                error={error}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default OnboardingContainer;
