import { configureStore } from "@reduxjs/toolkit";
import {
  employeeCountReducer,
  employeeCreateReducer,
  employeeDeleteReducer,
  employeeUpdateReducer,
  employeeListReducer,
  teamListReducer,
} from "./reducers/employeeReducer";
import {
  departmentCountReducer,
  departmentCreateReducer,
  departmentDeleteReducer,
  departmentListReducer,
  departmentUpdateReducer,
} from "./reducers/departmentReducer";
import { userLoginReducer, userProfileReducer } from "./reducers/userReducers";
import {
  leaveCreateReducer,
  leaveList,
  leaveListReducer,
  leaveUpdateReducer,
} from "./reducers/leaveReducer";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const profileInfoFromStorage = localStorage.getItem("userProfileInfo")
  ? JSON.parse(localStorage.getItem("userProfileInfo"))
  : null;

const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
  userProfile: { userProfileInfo: profileInfoFromStorage },
};

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userProfile: userProfileReducer,
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
    ownLeaveList: leaveList,
    teamList: teamListReducer,
  },
  preloadedState,
});
export default store;
