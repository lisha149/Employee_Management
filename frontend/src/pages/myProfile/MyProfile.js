import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myProfile, updateProfile } from "../../actions/userActions";
import "./MyProfile.css";
import ProfilePage from "./editProfile/ProfilePage";

const MyProfile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const { userProfileInfo } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(myProfile());
    if (!userProfileInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userProfileInfo]);

  return (
    <main>
      <div className="main__container">
        <div className="main__card">
          <Card id="card1" border="light">
            <Card.Body className="pb-3">
              <Card.Img
                id="profile-pic"
                src={`${userProfileInfo.profile_pic}`}
                alt="Profile pic"
                className="user-avatar rounded-circle mx-auto mt-n7"
              />
              <Card.Title>
                <h2>
                  {userInfo.first_name} {userInfo.last_name}
                </h2>
                <hr />
              </Card.Title>

              <Card.Subtitle className="text-gray fw-normal me-5">
                <h4>{userInfo.designation}</h4>
              </Card.Subtitle>
              <Card.Subtitle className="text-gray mb-4">
                <div>
                  <i
                    className="fa fa-sign-in"
                    aria-hidden="true"
                    style={{ marginRight: 3 }}
                  ></i>
                  {userInfo.joined_date}
                </div>
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
                <div>
                  <i
                    className="fa fa-envelope"
                    aria-hidden="true"
                    style={{ marginRight: 3 }}
                  ></i>
                  {userInfo.email}
                </div>
              </Card.Subtitle>

              <Button
                variant="primary"
                size="sm"
                style={{ marginLeft: 5 }}
                href="/profile/update"
                onClick={ProfilePage}
              >
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  style={{ marginRight: 3 }}
                ></i>
                Update profile
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
