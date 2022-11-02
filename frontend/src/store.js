import { configureStore } from "@reduxjs/toolkit";
import {
  employeeCountReducer,
  employeeCreateReducer,
  employeeDeleteReducer,
  employeeUpdateReducer,
  employeeListReducer,
} from "./reducers/employeeReducer";
import {
  departmentCountReducer,
  departmentCreateReducer,
  departmentDeleteReducer,
  departmentListReducer,
  departmentUpdateReducer,
} from "./reducers/departmentReducer";
import { userLoginReducer } from "./reducers/userReducers";
import {
  leaveCreateReducer,
  leaveListReducer,
  leaveUpdateReducer,
} from "./reducers/leaveReducer";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    employeeCount: employeeCountReducer,
    departmentCount: departmentCountReducer,
    employeeCreate: employeeCreateReducer,
    employeeList: employeeListReducer,
    employeeDelete: employeeDeleteReducer,
    employeeUpdate: employeeUpdateReducer,
    departmentCreate: departmentCreateReducer,
    departmentList: departmentListReducer,
    departmentDelete: departmentDeleteReducer,
    departmentUpdate: departmentUpdateReducer,
    leaveCreate: leaveCreateReducer,
    leaveList: leaveListReducer,
    leaveUpdate: leaveUpdateReducer,
  },
  preloadedState,
});
export default store;
