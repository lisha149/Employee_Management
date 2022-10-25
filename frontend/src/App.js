import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import Register from "./pages/addEmployee";
import Login from "./pages/login";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector } from "react-redux";

function App() {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <BrowserRouter>
      {userInfo ? (
        <>
          <div className="container">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />{" "}
            <Main />
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <Sidebar />
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
