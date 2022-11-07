export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_PROFILE_REQUEST":
      return { loading: true };
    case "USER_PROFILE_SUCCESS":
      return { loading: false, profileInfo: action.payload };
    case "USER_PROFILE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_PROFILE_UPDATE_REQUEST":
      return { loading: true };
    case "USER_PROFILE_UPDATE_SUCCESS":
      return { loading: false, userProfileInfo: action.payload, success: true };
    case "USER_PROFILE_UPDATE_FAIL":
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case "PROFILE_REQUEST":
      return { loading: true };
    case "PROFILE_SUCCESS":
      return { loading: false, profile: action.payload };
    case "PROFILE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
