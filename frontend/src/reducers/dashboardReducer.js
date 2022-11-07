export const dashboardReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "DASHBOARD_REQUEST_SUCCESS":
      return { loading: false, data: action.payload };
    case "DASHBOARD_REQUEST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
