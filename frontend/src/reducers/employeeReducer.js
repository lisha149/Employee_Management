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

export const employeeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "EMPLOYEE_CREATE_REQUEST":
      return { loading: true };
    case "EMPLOYEE_CREATE_SUCCESS":
      return { loading: false, employee: action.payload };
    case "EMPLOYEE_CREATE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const employeeListReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case "EMPLOYEES_LIST_REQUEST":
      return { loading: true };
    case "EMPLOYEES_LIST_SUCCESS":
      return { loading: false, employees: action.payload };
    case "EMPLOYEES_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const employeeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "EMPLOYEES_DELETE_REQUEST":
      return { loading: true };
    case "EMPLOYEES_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "EMPLOYEES_DELETE_FAIL":
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
