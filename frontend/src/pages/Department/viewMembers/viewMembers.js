import React, { useState, useEffect } from "react";
import departmentimage from "../../../assets/departmentimage.jpg";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "./viewMember.css";
import { useDispatch, useSelector } from "react-redux";
import { members } from "../../../actions/departmentActions";
import { useParams } from "react-router-dom";
import axios from "axios";
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";
const ViewMembers = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const departmentMember = useSelector((state) => state.departmentMember);
  const { departmentDetails, error, loading } = departmentMember;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
    dispatch(members(id));
  }, [dispatch, id]);

  return (
    <main>
      <div className="main__container">
        <div className="main_member_content">
          {loading && <Loading />}
          {error && <Error variant="error">{error}</Error>}
          <div className="detail_card_left">
            <div className="left_card_title">
              <h4>{title}</h4>
              <div>
                <img src={departmentimage} alt="department" />
              </div>
            </div>
          </div>
          <div className="detail_card_right">
            <div className="right_card_title">
              <div>
                {departmentDetails?.map((value, index) => {
                  return (
                    <div key={index} className="data">
                      <div>
                        <div>
                          <span>
                            {value.first_name} {value.last_name}
                          </span>
                          <br />
                          <span>{value.email}</span>
                        </div>
                        <div>
                          <Button
                            type="submit"
                            href={`/profile/${value.id}`}
                            variant="primary"
                          >
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

export default ViewMembers;
