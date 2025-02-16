import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CursorProvider } from "context/CursorContext";
import DotCursor from "components/DotCursor";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <CursorProvider>
    <DotCursor />
    <App />
  </CursorProvider>
);
