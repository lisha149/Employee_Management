import "./Navbar.css";
import { Link } from "@mui/material";
import { useSelector } from "react-redux";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
        <a href="/profile" id="p-link">
          <img width="30" src={userInfo.profile_pic} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
