import axios from "axios";
export const countDepartments = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/department-count`, config);

    dispatch({
      type: "DEPARTMENT_COUNT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DEPARTMENT_COUNT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
