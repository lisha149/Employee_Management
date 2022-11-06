export const departmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "DEPARTMENT_CREATE_REQUEST":
      return { loading: true };
    case "DEPARTMENT_CREATE_SUCCESS":
      return { loading: false, department: action.payload };
    case "DEPARTMENT_CREATE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const departmentListReducer = (state = { departments: [] }, action) => {
  switch (action.type) {
    case "DEPARTMENTS_LIST_REQUEST":
      return { loading: true };
    case "DEPARTMENTS_LIST_SUCCESS":
      return { loading: false, departments: action.payload };
    case "DEPARTMENTS_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const departmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "DEPARTMENTS_DELETE_REQUEST":
      return { loading: true };
    case "DEPARTMENTS_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "DEPARTMENTS_DELETE_FAIL":
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
export const departmentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "DEPARTMENTS_UPDATE_REQUEST":
      return { loading: true };
    case "DEPARTMENTS_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "DEPARTMENTS_UPDATE_FAIL":
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
