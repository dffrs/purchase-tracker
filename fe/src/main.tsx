import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import { BrowserRouter } from "react-router";
import { ToastProvider } from "./components";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>,
);
