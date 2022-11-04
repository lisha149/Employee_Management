import "./Navbar.css";
import avatar from "../../assets/avatar.svg";
import { Link } from "@mui/material";

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
      <div className="navbar__right">
        <a href="#">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i className="fa fa-clock-o" aria-hidden="true"></i>
        </a>
        <a href="#" id="p-link">
          <img
            width="30"
            src="https://imagizer.imageshack.com/img921/3072/rqkhIb.jpg"
            alt="avatar"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
