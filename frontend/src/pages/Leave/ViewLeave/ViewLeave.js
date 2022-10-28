import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";

const ViewLeave = () => {
  const dispatch = useDispatch();
  const leaveList = useSelector((state) => state.leaveList);
  const { leaves } = leaveList;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  return (
    <form className="flex-container">
      <table id="leaves">
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Reason</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves?.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.reason}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>

              <td>
                <Button>Approve</Button>
                <Button onClick={handleClickOpen}>Delete</Button>
                <Dialog
                  hideBackdrop
                  open={open}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>Reject Leave?</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Are you sure you want to reject?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                      Reject
                    </Button>
                    <Button variant="outlined">Reject</Button>
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

export default ViewLeave;
