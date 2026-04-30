import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import AppContextProvider from "./context/AppContextProvider.jsx";
import AdminContextProvider from "./context/AdminContextProvider.jsx";
import TutorContextProvider from "./context/TutorContextProvider.jsx"; // ✅ FIXED

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <AdminContextProvider>
        <TutorContextProvider>
          <App />
        </TutorContextProvider>
      </AdminContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);