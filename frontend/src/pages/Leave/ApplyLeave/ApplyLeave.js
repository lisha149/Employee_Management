import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, Form } from "react-bootstrap";
import "./ApplyLeave.css";
import { addLeaves } from "../../../actions/leaveActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error";

const ApplyLeave = () => {
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const email = `${userInfo.email}`;
  const user_id = `${userInfo.id}`;

  const resetHandler = () => {
    setReason("");
  };

  const dispatch = useDispatch();

  const leaveCreate = useSelector((state) => state.leaveCreate);
  const { error, leave, success } = leaveCreate;
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addLeaves(reason, startDate, endDate, email, user_id));
    resetHandler();
  };
  useEffect(() => {}, []);

  return (
    <main>
      <div className="main_container">
        <div className="leave_content">
          <Card id="card2" border="light">
            {error && <Error variant="danger">{error}</Error>}
            {success && (
              <Error variant="primary">Leave applied successfully</Error>
            )}
            <Card.Header>Apply leave</Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="content">
                  <Form.Label>Start Date</Form.Label>

                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    showYearDropdown
                    scrollableMonthYearDropdown
                  />
                </Form.Group>
                <Form.Group controlId="content">
                  <Form.Label>End Date</Form.Label>

                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    // filterDate={(date) =>
                    //   date.getDay() !== 6 && date.getDay() !== 0
                    // }
                    showYearDropdown
                    scrollableMonthYearDropdown
                  />
                </Form.Group>
                <Form.Group controlId="reason">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={reason}
                    rows={5}
                    placeholder="Please kindly explain the reason"
                    onChange={(e) => setReason(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ flexDirection: "row", marginTop: 10 }}
                  onClick={submitHandler}
                >
                  Apply
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
            <Card.Footer className="text-muted">
              Applying on - {new Date().toLocaleDateString()}
            </Card.Footer>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ApplyLeave;
