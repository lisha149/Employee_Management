import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
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
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <Link href="#">Dashboard</Link>
        </div>

        <div className="sidebar__link">
          <i class="fa fa-users"></i>
          <Link href="/employee">Add Employee</Link>
        </div>
        <div className="sidebar__link">
          <i class="fa fa-eye"></i>
          <Link href="#">View emplyees</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-plus"></i>
          <Link href="#">Add Department</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-unlock"></i>
          <Link href="#">View Departments</Link>
        </div>
        <h2>LEAVE</h2>
        <div className="sidebar__link">
          <i className="fa fa-question"></i>
          <Link href="#">Requests</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-sign-out"></i>
          <Link href="#">Leave Policy</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-calendar-check-o"></i>
          <Link href="#">Special Days</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-files-o"></i>
          <Link href="#">Apply for leave</Link>
        </div>
        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <Link href="/" onClick={logoutHandler}>
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
