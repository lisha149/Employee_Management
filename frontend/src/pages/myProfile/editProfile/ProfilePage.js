import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error";

const ProfilePage = () => {
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

  const userProfile = useSelector((state) => state.userProfile);
  const { userProfileInfo } = userProfile;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { loading, error, success } = userProfileUpdate;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setAddress(userProfileInfo.address);
      setContactNumber(userProfileInfo.contact_number);
      setDob(userProfileInfo.dob);
      setCitizenshipNumber(userProfileInfo.citizenship_number);
      setPanNumber(userProfileInfo.pan_number);
      setBankAccount(userProfileInfo.bank_account);
      setBankNumber(userProfileInfo.bank_account_number);
      setGender(userProfileInfo.gender);
      setMaritalStatus(userProfileInfo.marital_status);
      setPic(userProfileInfo.profile_pic);
    }
  }, [userProfileInfo, userInfo]);

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
      updateProfile({
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
  };
  const cancelHandler = () => {
    navigate("/profile");
  };
  return (
    <main>
      <div className="main__container">
        <div className="main_content">
          <div className="card">
            <h3>Update Profile</h3>
            <hr />
            <Row className="profileContainer">
              <Col md={6}>
                <Form onSubmit={submitHandler}>
                  {/* {loading && <Loading />} */}
                  {success && (
                    <Error variant="success">
                      Profile Updated Successfully
                    </Error>
                  )}
                  {error && <Error variant="danger">{error}</Error>}
                  <h4>
                    Update your profile, {userProfileInfo.first_name}{" "}
                    {userProfileInfo.last_name}
                  </h4>
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

export default ProfilePage;
