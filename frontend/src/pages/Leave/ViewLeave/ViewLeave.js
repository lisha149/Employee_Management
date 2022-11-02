import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { listLeaves, updateLeave } from "../../../actions/leaveActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewLeave.css";
import UpdateLeave from "../updateLeave/UpdateLeave";

const ViewLeave = () => {
  const status = "Approved";
  const rejected_reason = null;

  const dispatch = useDispatch();
  const leaveList = useSelector((state) => state.leaveList);
  const { leaves } = leaveList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const leaveUpdate = useSelector((state) => state.leaveUpdate);
  const { loading, error, success } = leaveUpdate;
  const navigate = useNavigate();

  const approveHandler = (id) => {
    // e.preventDefault();
    console.log(id);
    dispatch(updateLeave(id, status, rejected_reason));
    toast("Leave request is approved successfully");
    window.location.reload();
  };
  useEffect(() => {
    dispatch(listLeaves());
    // navigate("/leave");
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <form className="flex-container">
      <ToastContainer />
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
                  onClick={() => {
                    approveHandler(`${leave.id}`);
                  }}
                >
                  Approve
                </Button>

                <Button
                  variant="danger"
                  style={{ flexDirection: "row", marginTop: 5, marginLeft: 5 }}
                  href={`/leave/${leave.id}`}
                  onClick={UpdateLeave}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default ViewLeave;
