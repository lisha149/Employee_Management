import "./Main.css";
import hello from "../../assets/hello.svg";
import { useDispatch, useSelector } from "react-redux";
import { countEmployees } from "../../actions/employeeActions";
import { countDepartments } from "../../actions/departmentActions";
import { useNavigate } from "react-router-dom";
// import { login } from "../../actions/userActions";
import axios from "axios";
import { useEffect } from "react";
const Main = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const employeeCount = useSelector((state) => state.employeeCount);
  const { count } = employeeCount;
  const departmentCount = useSelector((state) => state.departmentCount);
  const { dcount } = departmentCount;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(countEmployees());
    dispatch(countDepartments());
    if (!userInfo) {
      navigate("/");
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
              <p className="text-primary-p">Number of Employee</p>
              <span className="font-bold text-title">{count}</span>
            </div>
          </div>

          <div className="card">
            <i
              className="fa fa-building-o  fa-2x text-red"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Department</p>
              <span className="font-bold text-title">{dcount}</span>
            </div>
          </div>

          <div className="card">
            <i
              className="fa fa-birthday-cake fa-2x text-yellow"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Coming up Birthday</p>
              <span className="font-bold text-title">....</span>
            </div>
          </div>
        </div>
        {/* <!-- MAIN CARDS ENDS HERE --> */}
      </div>
    </main>
  );
};

export default Main;
