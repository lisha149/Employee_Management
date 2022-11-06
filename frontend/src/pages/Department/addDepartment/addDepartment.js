import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addDepartments } from "../../../actions/departmentActions";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error";
import "./addDepartment.css";

const DepartmentCreate = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const departmentCreate = useSelector((state) => state.departmentCreate);
  const { error, department } = departmentCreate;

  const resetHandler = () => {
    setTitle("");
  };

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addDepartments(title));
    resetHandler();
    // navigate("/department");
    // window.location.reload();
  };
  useEffect(() => {}, []);
  return (
    <main>
      <div className="main_container">
        <div className="department_content">
          <Card id="card_department" border="light">
            {error && <Error variant="danger">{error}</Error>}
            <Card.Header>Add Department</Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    placeholder="Enter the title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ flexDirection: "row", marginTop: 10 }}
                  onClick={submitHandler}
                >
                  Add
                </Button>
                <Button
                  className="mx-2"
                  onClick={resetHandler}
                  variant="danger"
                  style={{ flexDirection: "row", marginTop: 10 }}
                >
                  Clear
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default DepartmentCreate;
