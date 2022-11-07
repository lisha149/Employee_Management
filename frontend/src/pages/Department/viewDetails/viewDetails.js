import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { profileById } from "../../../actions/userActions";
import "./viewDetails.css";

const ViewDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const profileList = useSelector((state) => state.profileList);
  const { profile = {} } = profileList;

  useEffect(() => {
    dispatch(profileById(id));
  }, [dispatch, id]);

  return (
    <main>
      <div className="main__container">
        <div className="main__profile__card">
          <Card id="card5" border="light">
            <Card.Body className="pb-3">
              <Card.Img
                id="profile-pic"
                src={profile.profile_pic}
                alt="Profile pic"
                className="user-avatar rounded-circle mx-auto mt-n7"
              />
              <Card.Title>
                <h2>
                  {profile.first_name} {profile.last_name}
                </h2>
                <hr />
              </Card.Title>

              <Card.Subtitle className="text-gray fw-normal me-5">
                <h4>{profile.designation}</h4>
              </Card.Subtitle>
              <Card.Subtitle className="text-gray fw-normal mb-4">
                <div>
                  <i
                    className="fa fa-sign-in"
                    aria-hidden="true"
                    style={{ marginRight: 3 }}
                  ></i>
                  {profile.joined_date}
                </div>
                <div>
                  <i
                    className="fa fa-location-arrow"
                    aria-hidden="true"
                    style={{ marginRight: 3 }}
                  ></i>
                  {profile.address}
                </div>
                <div>
                  <i
                    className="fa fa-phone"
                    aria-hidden="true"
                    style={{ marginRight: 3 }}
                  ></i>
                  {profile.contact_number}
                </div>
                <div>
                  <i
                    className="fa fa-envelope"
                    aria-hidden="true"
                    style={{ marginRight: 3 }}
                  ></i>
                  {profile.email}
                </div>
                <div>
                  <i
                    className="fa fa-birthday-cake"
                    aria-hidden="true"
                    style={{ marginRight: 3 }}
                  ></i>
                  {profile.dob}
                </div>
                <div>
                  <i
                    className="fa fa-male"
                    aria-hidden="true"
                    style={{ marginRight: 3 }}
                  ></i>
                  {profile.gender}
                </div>
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ViewDetails;
