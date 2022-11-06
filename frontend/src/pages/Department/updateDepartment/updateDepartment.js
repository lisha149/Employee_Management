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
import Error from "../../../components/Error";

const UpdateDepartment = () => {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const departmentUpdate = useSelector((state) => state.departmentUpdate);
  const { loading, error, success } = departmentUpdate;

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const fetching = async () => {
      const { data } = await axios.get(`/api/department/${id}`, config);
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
    <main>
      <div className="main_container">
        <div className="department__content">
          <Card id="card___department" border="light">
            {error && <Error variant="danger">{error}</Error>}
            <Card.Header>Edit Department</Card.Header>
            <Card.Body>
              <Form onSubmit={updateHandler}>
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
                  onClick={updateHandler}
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

export default UpdateDepartment;
