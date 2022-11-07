import axios from "axios";
export const login = (values) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const loginData = { email: values.email, password: values.password };

    const { data } = await axios.post("/api/login", loginData);

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
};

export const myProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "MY_PROFILE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/profile`, config);
    console.log(data);

    dispatch({ type: "MY_PROFILE_SUCCESS", payload: data });
    localStorage.setItem("userProfileInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "MY_PROFILE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile =
  ({
    address,
    contact_number,
    dob,
    citizenship_number,
    pan_number,
    bank_account,
    bank_account_number,
    gender,
    marital_status,
    profile_pic,
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "USER_PROFILE_UPDATE_REQUEST" });

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
        "/api/profile",
        {
          address,
          contact_number,
          dob,
          citizenship_number,
          pan_number,
          bank_account,
          bank_account_number,
          gender,
          marital_status,
          profile_pic,
        },
        config
      );
      console.log(data);

      dispatch({ type: "USER_PROFILE_UPDATE_SUCCESS", payload: data });
      dispatch({ type: "MY_PROFILE_SUCCESS", payload: data });

      localStorage.setItem("userProfileInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "USER_PROFILE_UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const profileById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "PROFILE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/profile/${id}`, config);
    console.log(data);

    dispatch({ type: "PROFILE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PROFILE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
