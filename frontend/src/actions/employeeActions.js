import axios from "axios";
export const countEmployees = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/employee-count`, config);

    dispatch({
      type: "EMPLOYEE_COUNT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "EMPLOYEE_COUNT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listEmployees = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "EMPLOYEES_LIST_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/employees`, config);
    console.log(data);

    dispatch({
      type: "EMPLOYEES_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "EMPLOYEES_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEmployee = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "EMPLOYEES_DELETE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/employee/${id}`, config);

    dispatch({
      type: "EMPLOYEES_DELETE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "EMPLOYEES_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addEmployees = (values) => async (dispatch, getState) => {
  try {
    dispatch({ type: "EMPLOYEE_CREATE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(values.department_id);
    const registerData = {
      first_name: values.firstname,
      last_name: values.lastname,
      email: values.email,
      password: values.password,
      designation: values.designation,
      department_id: values.department_id,
    };
    const { data } = await axios.post("/api/employee", registerData, config);
    console.log(data);
    dispatch({ type: "EMPLOYEE_CREATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "EMPLOYEE_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEmployee =
  (id, first_name, last_name, email, department_id) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "EMPLOYEES_UPDATE_REQUEST",
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/employee/${id}`,
        { first_name, last_name, email, department_id },
        config
      );

      dispatch({
        type: "EMPLOYEES_UPDATE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "EMPLOYEES_UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const listTeams = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "TEAMS_LIST_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/employee`, config);
    console.log(data);

    dispatch({
      type: "TEAMS_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "TEAMS_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
