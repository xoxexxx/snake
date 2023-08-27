import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import { SnakeGame } from "./app";
import { CurrentProvider } from "./hook/useContext";
import { CurrentItemProvider } from "./hook/useScoreItem";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <CurrentItemProvider>
    <CurrentProvider>
      <SnakeGame />
    </CurrentProvider>
  </CurrentItemProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
