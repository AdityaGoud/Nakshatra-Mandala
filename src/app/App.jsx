// src/app/app.jsx
import React, {useState} from "react";
import "../styles/App.css";
import OnboardingContainer from "../features/onboarding/OnboardingContainer";
import MandalaContainer from "../features/mandala/MandalaContainer";

/**
 * app
 *
 * Top-level application component.
 * - Controls the high-level "flow" between screens (steps)
 *   Step 1: Onboarding – collect birth details and call API
 *   Step 2: Mandala   – show Nakshatra–Raga Mandala + right panel
 * - Owns the main chartData state (planets, degrees, ascendant, divisional charts, etc.)
 * - Passes data down into feature containers as props.
 */

const App = () => {
    // "onboarding" | "mandala"
    //const [currentStep, setCurrentStep] = useState("onboarding");
    const [currentStep, setCurrentStep] = useState("mandala");
    // All computed chart information lives here.
    // Example shape (you will refine this once API is wired):
    // {
    //   rasi: { planets: [...], ascendant: number, houses: [...] },
    //   navamsa: { planets: [...], ascendant: number, houses: [...] },
    //   meta: { dob, tob, place, timezone, ... }
    // }

    //Remove this below Hardcode data and change the Launch Screen
    const [chartData, setChartData] = useState({
        rasi: {
            ascendantDeg: 96,
            planets: [
                { name: "Sun", degree: 59 },
                { name: "Moon", degree: 120 },
                { name: "Mars", degree: 210 },
                { name: "Jupiter", degree: 15 },
                { name: "Saturn", degree: 135 },
                { name: "Rahu", degree: 125 },
                { name: "Venus", degree: 45 },
                { name: "Ketu", degree: 215 },
                { name: "Mercury", degree: 305 },
            ]
        },
        // Optional: Add navamsa dummy data if testing that tab
        navamsa: {
            ascendantDeg: 20,
            planets: []
        }
    });

    //const [chartData, setChartData] = useState(null);

    const handleChartReady = (computedChartData) => {
        setChartData(computedChartData);
        setCurrentStep("mandala");
    };

    const handleRestart = () => {
        setChartData(null);
        setCurrentStep("onboarding");
    };

    return (
        <div className="space-container">
            {/* 3D Space Background – remains constant across steps */}
            <div className="space-bg">
                <div className="stars-layer"/>
                <div className="nebula-layer"/>
                <div className="particles-layer"/>
            </div>

            {/* Step-based main content */}
            {currentStep === "onboarding" && (
                <OnboardingContainer onChartReady={handleChartReady}/>
            )}

            {currentStep === "mandala" && chartData && (
                <MandalaContainer chartData={chartData} onBack={handleRestart}/>
            )}
        </div>
    );
};

export default App;
