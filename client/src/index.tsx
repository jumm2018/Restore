import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/index.css";
import App from "./app/layout/App";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>  => useEffect run twice Problem
  <BrowserRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
