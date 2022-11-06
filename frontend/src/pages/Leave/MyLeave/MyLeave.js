import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ownListLeaves } from "../../../actions/leaveActions";
import "./MyLeave.css";

const MyLeave = () => {
  const dispatch = useDispatch();
  const ownLeaveList = useSelector((state) => state.ownLeaveList);
  const { myleaves } = ownLeaveList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(ownListLeaves());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <form className="flex-container">
      <table id="leaves">
        <thead>
          <tr>
            <th>Leave Reason</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Rejected Reason</th>
          </tr>
        </thead>
        <tbody>
          {myleaves?.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.reason}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.status}</td>
              <td>{leave.rejected_reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default MyLeave;
