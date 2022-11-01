import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Button } from "react-bootstrap";
import { listLeaves } from "../../../actions/leaveActions";
import "./ViewLeave.css";

const ViewLeave = () => {
  const dispatch = useDispatch();
  const leaveList = useSelector((state) => state.leaveList);
  const { leaves } = leaveList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listLeaves());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <form className="flex-container">
      <table id="leaves">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Reason</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Rejected Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves?.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.id}</td>
              <td>{leave.user_id}</td>
              <td>{leave.reason}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.status}</td>
              <td>{leave.rejected_reason}</td>
              <td>
                <Button
                  variant="success"
                  style={{ flexDirection: "row", marginTop: 5 }}
                >
                  Approve
                </Button>

                <Button
                  variant="danger"
                  style={{ flexDirection: "row", marginTop: 5 }}
                  onClick={handleClickOpen}
                >
                  Reject
                </Button>
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
                      Cancel
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
