import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const Register = () => {
  const paperStyle = {
    padding: 20,
    width: 320,
    height: "80vh",
    margin: "40px auto",
  };
  const avatarStyle = { backgroundColor: "##158cba" };
  const btnstyle = { margin: "8px 0", backgroundColor: "##158cba" };

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(3, "It's too short").required("Required"),
    lastname: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Please enter valid email").required("Required"),
    password: Yup.string()
      .min(5, "Password minimum length should be 5")
      .required("Required"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h6 style={{ margin: 0 }}>Sign Up</h6>
          <Typography variant="caption" gutterBottom>
            Please fill this form to add an employee!
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    variant="standard"
                    label="First Name"
                    name="firstname"
                    placeholder="Enter first name"
                    helperText={<ErrorMessage name="firstname" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    variant="standard"
                    label="Last Name"
                    name="lastname"
                    placeholder="Enter last name"
                    helperText={<ErrorMessage name="name" />}
                  />
                </Grid>
              </Grid>

              <Field
                as={TextField}
                fullWidth
                variant="standard"
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                fullWidth
                variant="standard"
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                helperText={<ErrorMessage name="password" />}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={props.isSubmitting}
                color="primary"
                style={btnstyle}
                fullWidth
              >
                {props.isSubmitting ? "Loading" : "Sign up"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Register;
