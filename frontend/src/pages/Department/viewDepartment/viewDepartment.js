import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  listDepartments,
  deleteDepartment,
} from "../../../actions/departmentActions";
import "./viewDepartment.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Button } from "react-bootstrap";
import DepartmentCreate from "../addDepartment/addDepartment";
import Error from "../../../components/Error";

const GetDepartments = () => {
  const dispatch = useDispatch();
  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const departmentDelete = useSelector((state) => state.departmentDelete);
  const { error: errorDelete, success: successDelete } = departmentDelete;

  const deleteHandler = (id) => {
    dispatch(deleteDepartment(id));
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
    dispatch(listDepartments());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <form className="flex-container">
      {errorDelete && <Error variant="danger">{errorDelete}</Error>}
      <div className="add_button">
        <a href="/add-department" onClick={DepartmentCreate}>
          <Button variant="primary">Add Department</Button>
        </a>
      </div>
      <table id="departments">
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments?.map((department) => (
            <tr key={department.id}>
              <td>{department.title}</td>
              <td>
                <Button
                  href={`/departments/${department.id}`}
                  variant="info"
                  style={{ flexDirection: "row", margin: 5 }}
                >
                  View Members
                </Button>
                <Button
                  href={`/department/${department.id}`}
                  variant="success"
                  style={{ flexDirection: "row", margin: 5 }}
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
                  <DialogTitle>Delete?</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Are you sure you want to delete?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button variant="info" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(department.id)}
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

export default GetDepartments;
