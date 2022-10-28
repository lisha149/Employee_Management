import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateDepartment } from "../../../actions/departmentActions";
import { useNavigate } from "react-router-dom";
import "./updateDepartment.css";
import { useParams } from "react-router-dom";

const UpdateDepartment = () => {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState();

  const dispatch = useDispatch();
  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const departmentUpdate = useSelector((state) => state.departmentUpdate);
  const { loading, error, success } = departmentUpdate;

  const department = departments.find((department) => department.id === id);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/department/${id}`);
      setTitle(data.title);
    };

    fetching();
  }, [id]);

  const navigate = useNavigate();
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateDepartment(id, title));
    if (!title) return;
    resetHandler();
    navigate("/department");
    window.location.reload();
  };
  const resetHandler = () => {
    setTitle("");
  };

  return (
    <div style={{ display: "block", width: 600, padding: 30 }}>
      <h4>Edit department</h4>
      <Card>
        <Form onSubmit={updateHandler}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter firstname"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateDepartment;
