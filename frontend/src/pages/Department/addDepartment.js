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
import { useDispatch, useSelector } from "react-redux";
import { addDepartments } from "../../actions/departmentActions";
import { useNavigate } from "react-router-dom";

const DepartmentCreate = () => {
  const paperStyle = {
    padding: 20,
    width: 320,
    height: "80vh",
    margin: "40px auto",
  };
  const avatarStyle = { backgroundColor: "##158cba" };
  const btnstyle = { margin: "8px 0", backgroundColor: "##158cba" };

  const initialValues = {
    title: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
  });

  const dispatch = useDispatch();

  const createDepartment = useSelector((state) => state.createDepartment);
  const department = createDepartment;

  const navigate = useNavigate();
  const submitHandler = (values) => {
    console.log(values);
    dispatch(addDepartments(values));
    navigate("/department");
    window.location.reload();
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h3 style={{ margin: 0 }}>Department</h3>
          <Typography variant="caption" gutterBottom>
            Please fill this form to add department!
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                variant="standard"
                label="Title"
                name="firstname"
                placeholder="Title"
                autoComplete="off"
                helperText={<ErrorMessage name="firstname" />}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={props.isSubmitting}
                color="primary"
                style={btnstyle}
              >
                {props.isSubmitting ? "Loading" : "Add"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default DepartmentCreate;
