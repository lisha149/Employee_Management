import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import Login from "./pages/login";
import GetEmployees from "./pages/Employee/viewEmployees/employeesList";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Register from "./pages/Employee/addEmployee";
import UpdateEmployee from "./pages/Employee/updateEmployee/updateEmployee";
import GetDepartments from "./pages/Department/viewDepartment/viewDepartment";
import DepartmentCreate from "./pages/Department/addDepartment";
import UpdateDepartment from "./pages/Department/updateDepartment/updateDepartment";
import ApplyLeave from "./pages/Leave/ApplyLeave/ApplyLeave";
import ViewLeave from "./pages/Leave/ViewLeave/ViewLeave";

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
          <div className="contain">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />{" "}
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <Sidebar />
            <Routes>
              <Route path="/" element={<Main />} exact />
              <Route path="/employee" element={<GetEmployees />} />
              <Route path="/department" element={<GetDepartments />} />
              <Route path="/add-employee" element={<Register />} />
              <Route path="/add-department" element={<DepartmentCreate />} />
              <Route path="/employee/:id" element={<UpdateEmployee />} />
              <Route path="/department/:id" element={<UpdateDepartment />} />
              <Route path="/apply-leave" element={<ApplyLeave />} />
              <Route path="/leave" element={<ViewLeave />} />
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
