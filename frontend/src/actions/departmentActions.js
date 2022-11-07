import axios from "axios";

export const listDepartments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DEPARTMENTS_LIST_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/department`, config);
    // console.log(data);

    dispatch({
      type: "DEPARTMENTS_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DEPARTMENTS_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDepartment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DEPARTMENTS_DELETE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/department/${id}`, config);

    dispatch({
      type: "DEPARTMENTS_DELETE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DEPARTMENTS_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addDepartments = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: "DEPARTMENT_CREATE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/department", { title }, config);
    // console.log(data);
    dispatch({ type: "DEPARTMENT_CREATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DEPARTMENT_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDepartment = (id, title) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DEPARTMENTS_UPDATE_REQUEST",
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
      `/api/department/${id}`,
      { title },
      config
    );
    // console.log(data);
    dispatch({
      type: "DEPARTMENTS_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DEPARTMENTS_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const members = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DEPARTMENT_MEMBERS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/departments/${id}`, config);

    // console.log(data);
    dispatch({
      type: "DEPARTMENT_MEMBERS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DEPARTMENT_MEMBERS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
