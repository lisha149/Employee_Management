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
import DepartmentCreate from "../addDepartment";

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
    dispatch(listDepartments());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <form className="flex-container">
      <div className="add_button">
        <a href="/add-department" onClick={DepartmentCreate}>
          <Button variant="primary">Add Department</Button>
        </a>
      </div>
      {/* {errorDelete && <Error>{errorDelete}</Error>} */}
      <table id="departments">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments?.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.title}</td>
              <td>
                <Button
                  href={`/department/${department.id}`}
                  variant="success"
                  style={{ flexDirection: "row", margin: 5 }}
                  //   onClick={UpdateDepartment}
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
                    <Button variant="outlined" onClick={handleClose}>
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
