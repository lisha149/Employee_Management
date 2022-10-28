import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Card from "react-bootstrap/Card";
import "react-datepicker/dist/react-datepicker.css";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import "./ApplyLeave.css";

const ApplyLeave = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const paperStyle = {
    padding: 20,
    width: 370,
    height: "93vh",
    margin: "40px auto",
  };
  const btnstyle = { margin: "8px 0", backgroundColor: "##158cba" };

  const initialValues = {
    leave_reason: "",
    start_date: "",
    end_date: "",
  };
  const validationSchema = Yup.object().shape({
    leave_reason: Yup.string().required("Required"),
    start_date: Yup.string().required("Required"),
    end_date: Yup.string().required("Required"),
  });
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h3 style={{ margin: 0 }}>Apply Leave</h3>
          <Typography variant="caption" gutterBottom>
            Please fill this form to apply leave
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Card>
                <Field
                  as={TextField}
                  multiline
                  row={1}
                  fullWidth
                  variant="standard"
                  label="Leave Reason"
                  name="leave_reason"
                  placeholder="Kindly explain the reason"
                  autoComplete="off"
                  helperText={<ErrorMessage name="leave_reason" />}
                />
              </Card>
              <div id="start-date">
                <label>Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  formatDate="dd/MM/yyyy"
                  showYearDropdown
                  scrollableMonthYearDropdown
                />
              </div>
              <div id="end-date">
                <label>End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  formatDate="dd/MM/yyyy"
                  showYearDropdown
                  scrollableMonthYearDropdown
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                disabled={props.isSubmitting}
                color="primary"
                style={btnstyle}
              >
                {props.isSubmitting ? "Loading" : "Apply Leave"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default ApplyLeave;
