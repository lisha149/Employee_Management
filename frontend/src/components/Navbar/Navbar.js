import "./Navbar.css";
import { Link } from "@mui/material";
import { useSelector } from "react-redux";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <Link className="active_link" href="/">
          Employee Management System
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
