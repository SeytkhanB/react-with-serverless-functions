import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SingleProduct } from "./SingleProduct";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:productID" element={<SingleProduct />} />
      </Routes>
    </Router>
  </React.StrictMode>
);