import React, { useState, Fragment } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import Login from "./pages/login";
import GetEmployees from "./pages/Employee/viewEmployees/employeesList";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Register from "./pages/Employee/addEmployee/addEmployee";
import UpdateEmployee from "./pages/Employee/updateEmployee/updateEmployee";
import GetDepartments from "./pages/Department/viewDepartment/viewDepartment";
import DepartmentCreate from "./pages/Department/addDepartment/addDepartment";
import UpdateDepartment from "./pages/Department/updateDepartment/updateDepartment";
import ApplyLeave from "./pages/Leave/ApplyLeave/ApplyLeave";
import ViewLeave from "./pages/Leave/ViewLeave/ViewLeave";
import UpdateLeave from "./pages/Leave/updateLeave/UpdateLeave";
import MyLeave from "./pages/Leave/MyLeave/MyLeave";
import MyTeam from "./pages/Employee/myTeam/MyTeam";
import ProfilePage from "./pages/myProfile/editProfile/ProfilePage";
import MyProfile from "./pages/myProfile/MyProfile";
import ViewMembers from "./pages/Department/viewMembers/viewMembers";
import ViewDetails from "./pages/Department/viewDetails/viewDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ProtectedRoute from "./route/protectedRoute";
function App() {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <BrowserRouter>
      <Fragment>
        {userInfo ? (
          <>
            <div className="contain">
              <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />{" "}
              <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
              <Sidebar />
              <Routes>
                <Route path="/" element={<Main />} exact />

                <Route element={<ProtectedRoute />}>
                  <Route path="/add-employee" element={<Register />} />
                  <Route path="/employee" element={<GetEmployees />} />
                  <Route path="/department" element={<GetDepartments />} />
                  <Route
                    path="/add-department"
                    element={<DepartmentCreate />}
                  />
                  <Route path="/employee/:id" element={<UpdateEmployee />} />
                  <Route
                    path="/department/:id"
                    element={<UpdateDepartment />}
                  />
                  <Route path="/leave/:id" element={<UpdateLeave />} />
                  <Route path="/leaves" element={<ViewLeave />} />
                </Route>

                <Route path="/departments/:id" element={<ViewMembers />} />
                <Route path="/apply-leave" element={<ApplyLeave />} />
                <Route path="/leave" element={<MyLeave />} />
                <Route path="/team" element={<MyTeam />} />
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/profile/update" element={<ProfilePage />} />
                <Route path="/profile/:id" element={<ViewDetails />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
