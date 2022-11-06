import axios from "axios";
export const dashboardActions = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/dashboard`, config);
    console.log(data);

    dispatch({
      type: "DASHBOARD_REQUEST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DASHBOARD_REQUEST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
