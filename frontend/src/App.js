import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/login";
// import LoginPage from "./pages/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
