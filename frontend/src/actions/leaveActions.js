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
        "/api/employee/apply-leave",
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
