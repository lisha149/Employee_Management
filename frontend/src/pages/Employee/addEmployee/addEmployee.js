import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addEmployees } from "../../../actions/employeeActions";
import { listDepartments } from "../../../actions/departmentActions";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const paperStyle = {
    padding: 20,
    width: 320,
    height: "93vh",
    margin: "40px auto",
  };
  const avatarStyle = { backgroundColor: "##158cba" };
  const btnstyle = { margin: "8px 0", backgroundColor: "##158cba" };

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    designation: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    email: Yup.string().email("Please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
    designation: Yup.string().required("Required"),
  });

  const dispatch = useDispatch();

  const createEmployee = useSelector((state) => state.createEmployee);
  const employee = createEmployee;

  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const navigate = useNavigate();

  const submitHandler = (values) => {
    console.log(values);
    console.log(values.department_id);
    dispatch(addEmployees(values, department_id));
    navigate("/employee");
    window.location.reload();
  };
  const [department_id, setDepartmentId] = useState("");

  const handleChange = (e) => {
    setDepartmentId(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    dispatch(listDepartments());
  }, [dispatch]);

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h3 style={{ margin: 0 }}>Sign Up</h3>
          <Typography variant="caption" gutterBottom>
            Please fill this form to add an employee!
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
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
                    autoComplete="off"
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
                    helperText={<ErrorMessage name="lastname" />}
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
                placeholder="Enter email"
                autoComplete="current-email"
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                fullWidth
                variant="standard"
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                autoComplete="off"
                helperText={<ErrorMessage name="password" />}
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={department_id}
                  onChange={handleChange}
                  label="Department"
                  name="department_id"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {departments?.map((department) => (
                    <MenuItem value={department.id} key={department.id}>
                      {department.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Field
                as={TextField}
                fullWidth
                variant="standard"
                label="Designation"
                name="designation"
                placeholder="Enter Designation"
                autoComplete="current-designation"
                helperText={<ErrorMessage name="designation" />}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={props.isSubmitting}
                color="primary"
                style={btnstyle}
              >
                {props.isSubmitting ? "Loading" : "Register"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Register;
