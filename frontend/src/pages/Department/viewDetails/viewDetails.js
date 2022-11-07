import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { profileById } from "../../../actions/userActions";
import { members } from "../../../actions/departmentActions";
import axios from "axios";
import "./viewDetails.css";

const ViewDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const profileList = useSelector((state) => state.profileList);
  const { profile = {} } = profileList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const department_id = `${userInfo.department_id}`;

  const departmentMember = useSelector((state) => state.departmentMember);
  const { departmentDetails } = departmentMember;

  useEffect(() => {
    dispatch(profileById(id));
  }, [dispatch, id]);

  const [title, setTitle] = useState("");
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const fetching = async () => {
      const { data } = await axios.get(
        `/api/department/${department_id}`,
        config
      );
      setTitle(data.title);
    };
    fetching();
    dispatch(members(department_id));
  }, [dispatch, department_id]);

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

          <div className="card_right">
            <div className="card_title">
              <h4>{title}</h4>
              <div>
                {departmentDetails?.map((value, index) => {
                  return (
                    <div key={index} className="details">
                      <img src={value.profile_pic} alt="" />

                      <div>
                        <div>
                          <span>
                            <b>
                              {value.first_name} {value.last_name}
                            </b>
                          </span>
                          <br />
                          <span>{value.email}</span>
                        </div>
                        <div>
                          <Button
                            type="submit"
                            href={`/profile/${value.id}`}
                            variant="primary"
                            className="btn-sm"
                          >
                            <i class="fa fa-eye" style={{ marginRight: 5 }}></i>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewDetails;
