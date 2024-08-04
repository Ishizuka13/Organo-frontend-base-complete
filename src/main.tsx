import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { OrganoContextProvider } from "./Context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OrganoContextProvider>
      <App />
    </OrganoContextProvider>
  </React.StrictMode>
);
