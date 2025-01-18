import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import DetailPage from "./pages/Detailpage";

function App() {
  // trying a simple change with git flow
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:barcode" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
