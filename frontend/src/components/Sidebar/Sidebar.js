import * as React from "react";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [activeMenu, setActiveMenu] = useState();
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h3>EMS</h3>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link">
          <i className="fa fa-home"></i>
          <NavLink
            to="/"
            id="dashboard"
            className={
              activeMenu === "dashboard" ? "active_menu_link" : "menu_link"
            }
            onClick={() => {
              setActiveMenu("dashboard");
            }}
          >
            {" "}
            Dashboard
          </NavLink>
        </div>
        {userInfo.is_admin === true ? (
          <div>
            <div className="sidebar__link">
              <i className="fa fa-users"></i>
              <NavLink
                to="/employee"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#a5aaad",
                })}
              >
                Employees
              </NavLink>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-plus"></i>
              <NavLink
                to="/department"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#a5aaad",
                })}
              >
                Departments
              </NavLink>
            </div>
            <h3>Leaves</h3>
            <div className="sidebar__link">
              <i className="fa fa-question"></i>
              <NavLink
                to="/leaves"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#a5aaad",
                })}
              >
                Requests
              </NavLink>
            </div>
          </div>
        ) : (
          <div>
            <h3>TEAM</h3>
            <div className="sidebar__link">
              <i className="fa fa-users"></i>
              <NavLink
                to="/team"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#a5aaad",
                })}
              >
                My Team
              </NavLink>
            </div>
            <h3>LEAVE</h3>
            <div className="sidebar__link">
              <i className="fa fa-files-o"></i>
              <NavLink
                to="/apply-leave"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#a5aaad",
                })}
              >
                Apply for leave
              </NavLink>
            </div>

            <div className="sidebar__link">
              <i className="fa fa-calendar-check-o"></i>
              <NavLink
                to="leave"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#a5aaad",
                })}
              >
                My Leaves
              </NavLink>
            </div>
          </div>
        )}
        <h3>PROFILE</h3>
        <div className="sidebar__link">
          <i className="fa fa-user"></i>
          <NavLink
            to="/profile"
            style={({ isActive }) => ({
              color: isActive ? "white" : "#a5aaad",
            })}
          >
            My Profile
          </NavLink>
        </div>
        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <NavLink to="#" role="button" onClick={handleClickOpen}>
            {" "}
            Log out
          </NavLink>
          <Dialog
            hideBackdrop
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Logout?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to logout?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="outlined" onClick={logoutHandler} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
