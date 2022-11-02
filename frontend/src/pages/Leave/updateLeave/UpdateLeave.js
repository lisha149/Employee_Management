import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import { updateLeave, listLeaves } from "../../../actions/leaveActions";
import { useNavigate } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { useParams } from "react-router-dom";
import "./UpdateLeave.css";

const UpdateLeave = () => {
  const { id } = useParams();

  const status = "Rejected";
  const [rejected_reason, setRejectedReason] = useState("");

  const dispatch = useDispatch();
  const leaveList = useSelector((state) => state.leaveList);
  const { leaves } = leaveList;

  const leaveUpdate = useSelector((state) => state.leaveUpdate);
  const { loading, error, success } = leaveUpdate;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    navigate("/leave");
  };

  useEffect(() => {
    dispatch(listLeaves());
  }, [dispatch]);

  const navigate = useNavigate();
  const rejectHandler = (e) => {
    e.preventDefault();
    if (!rejected_reason) return;
    console.log(id);
    dispatch(updateLeave(id, status, rejected_reason));
    navigate("/leave");
    // dispatch(listLeaves());
  };
  return (
    <div className="createReasonContainer">
      <Card>
        <Form>
          <Form.Group controlId="reason">
            <Form.Label>Rejected Reason: </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Please briefly explain the reason"
              value={rejected_reason}
              rows={10}
              onChange={(e) => setRejectedReason(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            variant="danger"
            style={{ flexDirection: "row", marginTop: 5 }}
            onClick={handleClickOpen}
          >
            Reject
          </Button>
          <Button
            variant="primary"
            style={{ flexDirection: "row", marginTop: 5, marginLeft: 5 }}
            onClick={handleCancel}
          >
            Cancel
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
              <Button variant="outlined" onClick={rejectHandler}>
                Reject
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateLeave;
