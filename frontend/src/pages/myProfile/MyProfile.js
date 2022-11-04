import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myProfile } from "../../actions/userActions";
import "./MyProfile.css";

const MyProfile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const { userProfileInfo } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(myProfile());
    if (userProfileInfo) {
      navigate("/profile");
    }
  }, [dispatch, navigate]);
  return (
    <Card id="card1" border="light" className=" p-0 mb-4 ms-5">
      <Card.Body className="pb-3">
        <Card.Img
          id="profile-pic"
          src={`${userProfileInfo.profile_pic}`}
          alt="Profile pic"
          className="user-avatar rounded-circle mx-auto mt-n7"
        />
        <Card.Title>
          <h2>
            {userProfileInfo.first_name} {userProfileInfo.last_name}
            <hr />
          </h2>
        </Card.Title>

        <Card.Subtitle className="text-gray fw-normal me-5">
          <h4>{userProfileInfo.designation}</h4>
        </Card.Subtitle>
        <Card.Text className="text-gray mb-4">
          Joined Date: {userProfileInfo.joined_date}
          <br />
          <div>
            <i
              className="fa fa-location-arrow"
              aria-hidden="true"
              style={{ marginRight: 3 }}
            ></i>
            {userProfileInfo.address}
          </div>
          <div>
            <i
              className="fa fa-phone"
              aria-hidden="true"
              style={{ marginRight: 3 }}
            ></i>
            {userProfileInfo.contact_number}
          </div>
        </Card.Text>

        <Button variant="primary" size="sm">
          Change Profile Picture
        </Button>
        <Button variant="primary" size="sm" style={{ marginLeft: 5 }}>
          <i
            className="fa fa-pencil"
            aria-hidden="true"
            style={{ marginRight: 3 }}
          ></i>
          Update profile
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MyProfile;
