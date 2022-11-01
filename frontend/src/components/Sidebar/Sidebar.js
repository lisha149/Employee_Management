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
          <h1>EMS</h1>
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
          <Link
            href="/"
            id="dashboard"
            className={
              activeMenu === "dashboard" ? "active_menu_link" : "menu_link"
            }
            onClick={() => {
              setActiveMenu("dashboard");
            }}
          >
            Dashboard
          </Link>
        </div>
        {userInfo.is_admin === true ? (
          <div>
            <div className="sidebar__link">
              <i className="fa fa-users"></i>
              <Link href="/employee">Employees</Link>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-plus"></i>
              <Link href="/department">Departments</Link>
            </div>
            <h2>Leaves</h2>
            <div className="sidebar__link">
              <i className="fa fa-question"></i>
              <Link href="#">Requests</Link>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-sign-out"></i>
              <Link href="#">Leaves</Link>
            </div>
          </div>
        ) : (
          <div>
            <h2>TEAM</h2>
            <div className="sidebar__link">
              <i className="fa fa-users"></i>
              <Link href="#">Requests</Link>
            </div>
            <h2>LEAVE</h2>
            <div className="sidebar__link">
              <i className="fa fa-files-o"></i>
              <Link href="/apply-leave">Apply for leave</Link>
            </div>

            <div className="sidebar__link">
              <i className="fa fa-sign-out"></i>
              <Link href="#">Leave Policy</Link>
            </div>
            <div className="sidebar__link">
              <i className="fa fa-calendar-check-o"></i>
              <Link href="#">Special Days</Link>
            </div>
          </div>
        )}

        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="#" role="button" onClick={handleClickOpen}>
            {" "}
            Log out
          </a>
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
