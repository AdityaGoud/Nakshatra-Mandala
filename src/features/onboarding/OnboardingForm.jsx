// src/features/onboarding/components/OnboardingForm.jsx
import React from "react";
import {logger} from "../../utils/logger";


const OnboardingForm = ({
                            step,
                            values,
                            isSubmitting,
                            error,
                            onChange,
                            onSubmit,
                        }) => {

    const handleInputChange = (field) => (e) => {
        logger.log('INPUT', field, { value: e.target.value }, 'FORM');
        onChange(field, e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        logger.log('SUBMIT', 'Form submit clicked', values, 'FORM');

        if (onSubmit) {
            onSubmit();
        } else {
            logger.log('ERROR', 'onSubmit prop missing', null, 'FORM');
        }
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
                    <label className="form-label">Timezone (e.g. 5.5)</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 5.5 for India"
                        value={values.timezone}
                        onChange={handleInputChange("timezone")}
                    />
                </div>

                {error && <div className="form-error">{error}</div>}

                <button
                    type="submit"
                    className="primary-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Calculating chart..." : "Generate Mandala"}
                </button>

            </form>
        </div>
    );
};

export default OnboardingForm;
