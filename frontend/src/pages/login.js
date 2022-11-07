import React, { useEffect } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Error from "../components/Error";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, myProfile } from "../actions/userActions";

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "80px auto",
  };
  const avatarStyle = { backgroundColor: "##158cba" };
  const btnstyle = { margin: "10px 0" };
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;
  const userProfile = useSelector((state) => state.userProfile);
  const { userProfileInfo } = userProfile;

  const submitHandler = (values) => {
    dispatch(login(values));
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      dispatch(myProfile());
      navigate("/");
    }
  }, [navigate, userInfo, userProfileInfo]);

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2 style={{ color: "##158cba" }}>Login</h2>
        </Grid>
        {error && <Error variant="danger">{error}</Error>}
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          <Form>
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
              style={btnstyle}
              fullWidth
            >
              Login
            </Button>
          </Form>
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Login;
