// src/app/app.jsx
import React, { useState } from "react";
import "../styles/App.css";
import OnboardingContainer from "../features/onboarding/OnboardingContainer";
import MandalaContainer from "../features/mandala/MandalaContainer";

// --- REQUIRED FOR DEV MODE ---
import { createMockChartFromForm } from "../data/mockChartData";

const App = () => {
    // =========================================================
    // 🛠️ DEVELOPMENT_MODE ENABLE (Uncomment this block for Dev)
    // =========================================================

    // Generate normalized mock data instantly
    // const devData = createMockChartFromForm({});
    // // Start directly on 'mandala' screen with data pre-loaded
    // const [currentStep, setCurrentStep] = useState("mandala");
    // const [chartData, setChartData] = useState(devData);

    // =========================================================


    // =========================================================
    // 🌐 LIVE_MODE ENABLE (Uncomment this block for Production)
    // =========================================================

    // Start at onboarding screen with no data
    const [currentStep, setCurrentStep] = useState("onboarding");
    const [chartData, setChartData] = useState(null);
    //
    // =========================================================


    const handleChartReady = (realApiData) => {
        console.log("✅ [App.jsx] Received Chart Data:", realApiData);
        setChartData(realApiData);
        setCurrentStep("mandala");
    };

    const handleRestart = () => {
        setChartData(null);
        setCurrentStep("onboarding");
    };

    return (
        <div className="space-container">
            <div className="space-bg">
                <div className="stars-layer" />
                <div className="nebula-layer" />
                <div className="particles-layer" />
            </div>

            {currentStep === "onboarding" && (
                <OnboardingContainer onChartReady={handleChartReady} />
            )}

            {currentStep === "mandala" && chartData && (
                <MandalaContainer chartData={chartData} onBack={handleRestart} />
            )}
        </div>
    );
};

export default App;
