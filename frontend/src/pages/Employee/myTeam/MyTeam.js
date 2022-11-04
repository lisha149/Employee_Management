import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listTeams } from "../../../actions/employeeActions";
import "./MyTeam.css";

const MyTeam = () => {
  const dispatch = useDispatch();
  const teamList = useSelector((state) => state.teamList);
  const { teams } = teamList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listTeams());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <form className="flex-container">
      <table id="teams">
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {teams?.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.first_name}</td>
              <td>{team.last_name}</td>
              <td>{team.email}</td>
              <td>{team.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default MyTeam;
