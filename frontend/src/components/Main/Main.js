import "./Main.css";
import hello from "../../assets/hello.svg";
import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "../../actions/dashboardActions";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
const Main = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dashboard = useSelector((state) => state.dashboard);
  const { data } = dashboard;

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(dashboardActions());
    if (data.popupMessage) {
      toast(`${data.popupMessage}`);
    }
  }, [dispatch, userInfo]);

  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello {userInfo.first_name}</h1>
            <p>Welcome to your dashboard</p>
          </div>
          <br />
          <ToastContainer
            autoClose={10000}
            closeButton={true}
            position="top-center"
          />
        </div>

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}

        <div className="main__cards">
          <div className="card">
            <i
              className="fa fa-user-o fa-2x text-lightblue"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Employees</p>
              <span className="font-bold text-title">{data.employeeCount}</span>
            </div>
          </div>

          <div className="card">
            <i
              className="fa fa-building-o  fa-2x text-red"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Departments</p>

              <span className="font-bold text-title">
                {data.departmentCount}
              </span>
            </div>
          </div>
        </div>

        {/* <!-- MAIN CARDS ENDS HERE --> */}
      </div>
    </main>
  );
};

export default Main;
