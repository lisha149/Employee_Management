import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "./updateEmployee.css";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "../../../actions/employeeActions";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { listDepartments } from "../../../actions/departmentActions";

const UpdateEmployee = () => {
  const { id } = useParams();
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [department_id, setDeptid] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [dob, setDob] = useState("");
  const [citizenship_number, setCitizenshipNumber] = useState("");
  const [pan_number, setPanNumber] = useState("");
  const [bank_account, setBankAccount] = useState("");
  const [bank_account_number, setBankNumber] = useState("");
  const [gender, setGender] = useState("");
  const [marital_status, setMaritalStatus] = useState("");
  const [profile_pic, setPic] = useState();
  const [picMessage, setPicMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const employeeUpdate = useSelector((state) => state.employeeUpdate);
  const { success, error } = employeeUpdate;

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const fetching = async () => {
        const { data } = await axios.get(`/api/profile/${id}`, config);
        setFirstname(data.first_name);
        setLastname(data.last_name);
        setDeptid(data.department_id);
        setDesignation(data.designation);
        setAddress(data.address);
        setContactNumber(data.contact_number);
        setDob(data.dob);
        setCitizenshipNumber(data.citizenship_number);
        setPanNumber(data.pan_number);
        setBankAccount(data.bank_account);
        setBankNumber(data.bank_account_number);
        setGender(data.gender);
        setMaritalStatus(data.marital_status);
        setPic(data.profile_pic);
      };

      fetching();
      dispatch(listDepartments());
    }
  }, [userInfo, dispatch, id]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "employee");
      data.append("cloud_name", "dxepd50iq");
      fetch("https://api.cloudinary.com/v1_1/dxepd50iq/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(profile_pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEmployee({
        id,
        first_name,
        last_name,
        department_id,
        designation,
        address,
        contact_number,
        dob,
        citizenship_number,
        pan_number,
        bank_account,
        bank_account_number,
        gender,
        marital_status,
        profile_pic,
      })
    );
    toast("Profile Updated Successfully");
  };
  const handleChange = (e) => {
    setDeptid(e.target.value);
    console.log(e.target.value);
  };
  const cancelHandler = () => {
    navigate("/employee");
  };
  return (
    <main>
      <div className="main__container">
        <div className="main_profile_content">
          <div className="profile__card">
            <h3>Update Profile</h3>
            <hr />
            <Row className="profileContainer">
              <Col md={6}>
                {success && (
                  <Error variant="success">Profile Updated Successfully</Error>
                )}
                {success && (
                  <ToastContainer closeButton={true} position="bottom-right" />
                )}
                {error && <Error variant="danger">{error}</Error>}
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      value={first_name}
                      onChange={(e) => setFirstname(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="name">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      value={last_name}
                      onChange={(e) => setLastname(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Department</Form.Label>
                    <select
                      className="form-control"
                      name="department_id"
                      onChange={handleChange}
                      value={department_id}
                    >
                      {departments?.map((department) => (
                        <option value={department.id} key={department.id}>
                          {department.title}
                        </option>
                      ))}
                    </select>
                  </Form.Group>
                  <Form.Group controlId="name">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter designation"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="no">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="no">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter number"
                      value={contact_number}
                      onChange={(e) => setContactNumber(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="no">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter number"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="no">
                    <Form.Label>Citizenship Nmuber</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter citizenship number"
                      value={citizenship_number}
                      onChange={(e) => setCitizenshipNumber(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="no">
                    <Form.Label>Pan Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter pan number"
                      value={pan_number}
                      onChange={(e) => setPanNumber(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="no">
                    <Form.Label>Bank Account</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter bank name"
                      value={bank_account}
                      onChange={(e) => setBankAccount(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="no">
                    <Form.Label>Bank Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter bank account number"
                      value={bank_account_number}
                      onChange={(e) => setBankNumber(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <div>
                    {" "}
                    Gender  {" "}
                    <input
                      type="radio"
                      id="gender"
                      name="gender"
                      value="Male"
                      style={{ marginLeft: 7 }}
                      checked={gender === "Male"}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    <label style={{ marginLeft: 2 }}>Male</label>
                    <input
                      type="radio"
                      id="gender"
                      name="gender"
                      value="Female"
                      style={{ marginLeft: 10 }}
                      checked={gender === "Female"}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    <label style={{ marginLeft: 2 }}>Female</label>
                    <input
                      type="radio"
                      id="gender"
                      name="gender"
                      value="Others"
                      style={{ marginLeft: 10 }}
                      checked={gender === "Others"}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    <label style={{ marginLeft: 2 }}>Others</label>
                    <br />
                  </div>

                  <div>
                    {" "}
                    Marital Status  {" "}
                    <input
                      type="radio"
                      id="married"
                      name="marital_status"
                      value="Married"
                      style={{ marginLeft: 7 }}
                      checked={marital_status === "Married"}
                      onChange={(e) => {
                        setMaritalStatus(e.target.value);
                      }}
                    />
                    <label style={{ marginLeft: 2 }}>Married</label>
                    <input
                      type="radio"
                      id="unmarried"
                      name="marital_status"
                      value="Unmarried"
                      style={{ marginLeft: 10 }}
                      checked={marital_status === "Unmarried"}
                      onChange={(e) => {
                        setMaritalStatus(e.target.value);
                      }}
                    />
                    <label style={{ marginLeft: 2 }}>Unmarried</label>
                    <br />
                  </div>
                  {/* {picMessage && <Error variant="danger">{picMessage}</Error>} */}

                  <Button
                    type="submit"
                    variant="primary"
                    style={{ marginTop: 14 }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="submit"
                    variant="info"
                    style={{ marginTop: 14, marginLeft: 10 }}
                    onClick={cancelHandler}
                  >
                    Cancel
                  </Button>
                </Form>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 100,
                }}
              >
                <Form.Group controlId="pic">
                  <img src={profile_pic} className="profilePic" />
                  <br />

                  <Form.Label>Change Profile Picture</Form.Label>
                  <br />
                  <input
                    type="file"
                    onChange={(e) => {
                      postDetails(e.target.files[0]);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateEmployee;
