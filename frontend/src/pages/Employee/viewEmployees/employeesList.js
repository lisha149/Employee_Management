import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  listEmployees,
  deleteEmployee,
} from "../../../actions/employeeActions";
import "./employeeList.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Button } from "react-bootstrap";
import Error from "../../../components/Error";
import Register from "../addEmployee";
import UpdateEmployee from "../updateEmployee/updateEmployee";

const GetEmployees = () => {
  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employeeList);
  const { employees } = employeeList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const employeeDelete = useSelector((state) => state.employeeDelete);
  const { error: errorDelete, success: successDelete } = employeeDelete;

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
      <div className="add_button">
        <a href="/add-employee">
          <Button variant="primary" onClick={Register}>
            Add Employee
          </Button>
        </a>
      </div>
      {errorDelete && <Error>{errorDelete}</Error>}
      <table id="employees">
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>
                <Button
                  href={`/employee/${employee.id}`}
                  variant="success"
                  style={{ flexDirection: "row", margin: 5 }}
                  onClick={UpdateEmployee}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  style={{ flexDirection: "row", margin: 5 }}
                  onClick={handleClickOpen}
                >
                  Delete
                </Button>
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
                      Are you sure you want to delete?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => deleteHandler(employee.id)}
                      autoFocus
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default GetEmployees;
