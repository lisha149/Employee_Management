export const leaveListReducer = (state = { leaves: [] }, action) => {
  switch (action.type) {
    case "LEAVE_LIST_REQUEST":
      return { loading: true };
    case "LEAVE_LIST_SUCCESS":
      return { loading: false, leaves: action.payload };
    case "LEAVE_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const leaveCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "LEAVE_CREATE_REQUEST":
      return { loading: true };
    case "LEAVE_CREATE_SUCCESS":
      return { loading: false, leave: action.payload };
    case "LEAVE_CREATE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const leaveUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "LEAVES_UPDATE_REQUEST":
      return { loading: true };
    case "LEAVES_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "LEAVES_UPDATE_FAIL":
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
