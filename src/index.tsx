import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./fonts/Montserrat-Bold.ttf";
import "./fonts/Montserrat-Regular.ttf";
import "./fonts/RampartOne-Regular.ttf";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
