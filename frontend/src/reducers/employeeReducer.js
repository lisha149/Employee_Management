export const employeeCountReducer = (state = {}, action) => {
  switch (action.type) {
    case "EMPLOYEE_COUNT_SUCCESS":
      return { loading: false, count: action.payload };
    case "EMPLOYEE_COUNT_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
