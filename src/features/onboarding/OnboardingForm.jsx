// src/features/onboarding/OnboardingForm.jsx

import React from "react";

/**
 * OnboardingForm
 *
 * Presentational/dumb component.
 * Responsibilities:
 * - Render the birth details form UI (inputs, labels, button).
 * - Display loading and error states from props.
 * - Call the provided callbacks when user changes fields or submits.
 *
 * It does NOT:
 * - Manage its own state (values come from props).
 * - Call any APIs directly.
 *
 * Props:
 * - step: string (currently only "single_screen", kept for future multi-step)
 * - values: { name, date, time, place, timezone }
 * - isSubmitting: boolean
 * - error: string | null
 * - onChange: (field, value) => void
 * - onSubmit: () => void
 */

const OnboardingForm = ({
                            step,
                            values,
                            isSubmitting,
                            error,
                            onChange,
                            onSubmit,
                        }) => {
    const handleInputChange = (field) => (e) => {
        onChange(field, e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="panel-header">
            <h1 className="space-title">
                <span className="title-icon">✶</span>
                Birth Details
            </h1>
            <p className="poetic-subtitle">
                Enter your birth data to generate your cosmic mandala.
            </p>

            <form className="onboarding-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label className="form-label">Name (optional)</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Your name"
                        value={values.name}
                        onChange={handleInputChange("name")}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            className="form-input"
                            value={values.date}
                            onChange={handleInputChange("date")}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Time of Birth</label>
                        <input
                            type="time"
                            className="form-input"
                            value={values.time}
                            onChange={handleInputChange("time")}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Place of Birth</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="City, Country"
                        value={values.place}
                        onChange={handleInputChange("place")}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Timezone</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Asia/Kolkata"
                        value={values.timezone}
                        onChange={handleInputChange("timezone")}
                    />
                    {/* FUTURE:
             Replace this simple text input with a proper timezone selector
             or automatically detect timezone from place via backend service. */}
                </div>

                {error && <div className="form-error">{error}</div>}

                <button
                    type="submit"
                    className="primary-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Calculating chart..." : "Generate Mandala"}
                </button>

                {/* FUTURE:
           You can add helper text here about privacy, accuracy, etc. */}
            </form>
        </div>
    );
};

export default OnboardingForm;
