// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";

/**
 * Entry point for the React application.
 * - Renders the top-level <app /> component into #root.
 * - Imports global dv CSS reset from index.css.
 */

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
        <App/>
);


// Optional: performance reporting
reportWebVitals();
