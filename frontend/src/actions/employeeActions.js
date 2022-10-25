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
