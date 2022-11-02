import axios from "axios";
export const addLeaves =
  (leave_reason, start_date, end_date, email, user_id) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "LEAVE_CREATE_REQUEST" });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/leave",
        { leave_reason, start_date, end_date, email, user_id },
        config
      );
      console.log(data);
      dispatch({ type: "LEAVE_CREATE_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "LEAVE_CREATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listLeaves = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "LEAVE_LIST_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/leave`, config);
    console.log(data);

    dispatch({
      type: "LEAVE_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LEAVE_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateLeave =
  (id, status, rejected_reason) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "LEAVES_UPDATE_REQUEST",
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

      const { data } = await axios.patch(
        `/api/leave/${id}`,
        { status, rejected_reason },
        config
      );

      dispatch({
        type: "LEAVES_UPDATE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "LEAVES_UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
