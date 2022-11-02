import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "../../../actions/employeeActions";
import { useNavigate } from "react-router-dom";
import "./update.css";
import { useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams();
  console.log(id);
  const [first_name, setFirstname] = useState();
  const [last_name, setLastname] = useState();
  const [email, setEmail] = useState();
  const [department_id, setDeptid] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employeeList);
  const { employees } = employeeList;

  const employeeUpdate = useSelector((state) => state.employeeUpdate);
  const { loading, error, success } = employeeUpdate;

  const employee = employees.find((employee) => employee.id === id);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/employee/${id}`);
      setFirstname(data.first_name);
      setLastname(data.last_name);
      setEmail(data.email);
      setDeptid(data.department_id);
      setDate(data.updated_at);
    };

    fetching();
  }, [id, date]);

  const navigate = useNavigate();
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateEmployee(id, first_name, last_name, email, department_id));
    if (!first_name || !last_name || !email || !department_id) return;
    resetHandler();
    navigate("/employee");
    window.location.reload();
  };
  const resetHandler = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
  };

  return (
    <div style={{ display: "block", width: 600, padding: 30 }}>
      <h4>Edit employee</h4>
      <Card>
        <Form onSubmit={updateHandler}>
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter firstname"
              value={first_name}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter lastname"
              value={last_name}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Department ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter department id"
              value={department_id}
              onChange={(e) => setDeptid(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default UpdateEmployee;
