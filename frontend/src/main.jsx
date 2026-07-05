import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

// Always send cookies with cross-origin requests (needed for Vercel → Render)
axios.defaults.withCredentials = true;

// Intercept Outgoing Axios Requests to Replace Localhost with Production API URL
const apiBaseUrl = import.meta.env.VITE_API_URL;
if (apiBaseUrl) {
  axios.interceptors.request.use((config) => {
    if (config.url && config.url.startsWith("http://localhost:8080")) {
      config.url = config.url.replace("http://localhost:8080", apiBaseUrl);
    }
    config.withCredentials = true;
    return config;
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
