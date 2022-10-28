import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {
//   listEmployees,
//   deleteEmployee,
// } from "../../../actions/employeeActions";
import "./Team.css";

const Team = () => {
  const dispatch = useDispatch();
  //   const employeeList = useSelector((state) => state.employeeList);
  //   const { employees } = employeeList;

  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;

  //   const employeeDelete = useSelector((state) => state.employeeDelete);
  //   const { error: errorDelete, success: successDelete } = employeeDelete;

  const deleteHandler = (id) => {
    dispatch(deleteEmployee(id));
    window.location.reload();
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listEmployees());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  return (
    <form className="flex-container">
      {/* <div className="add_button">
        <a href="/add-team">
          <Button variant="contained" onClick={Register}>
            Add Team Member
          </Button>
        </a>
      </div> */}
      <table id="teams">
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default Team;
