export const departmentCountReducer = (state = {}, action) => {
  switch (action.type) {
    case "DEPARTMENT_COUNT_SUCCESS":
      return { loading: false, dcount: action.payload };
    case "DEPARTMENT_COUNT_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
