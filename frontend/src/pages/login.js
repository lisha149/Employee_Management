import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Error from "../components/ErrorMessage";
import * as Yup from "yup";
import axios from "axios";
const Login = () => {
  const [error, setError] = useState(false);
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "80px auto",
  };
  const avatarStyle = { backgroundColor: "##158cba" };
  const btnstyle = { margin: "10px 0", backgroundColor: "##158cba" };
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    const data = { email: values.email, password: values.password };
    await axios.post("/api/login", data).then((res) => {
      console.log(res.data);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    });
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        {error && <Error>{error}</Error>}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              {/* {console.log(props)} */}
              <Field
                as={TextField}
                variant="standard"
                label="Email"
                name="email"
                placeholder="Enter email"
                type="email"
                autoComplete="current-email"
                fullWidth
                required
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                variant="standard"
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                autoComplete="current-password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                style={btnstyle}
                fullWidth
              >
                {props.isSubmitting ? "Loading" : "Login"}
              </Button>
              {/* {console.log(props)} */}
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Login;