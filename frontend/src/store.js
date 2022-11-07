import { configureStore } from "@reduxjs/toolkit";
import { dashboardReducer } from "./reducers/dashboardReducer";
import {
  employeeCreateReducer,
  employeeDeleteReducer,
  employeeUpdateReducer,
  employeeListReducer,
  teamListReducer,
} from "./reducers/employeeReducer";
import {
  departmentCreateReducer,
  departmentDeleteReducer,
  departmentListReducer,
  departmentMemberReducer,
  departmentUpdateReducer,
} from "./reducers/departmentReducer";
import {
  profileReducer,
  userLoginReducer,
  userProfileReducer,
  userProfileUpdateReducer,
} from "./reducers/userReducers";
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
    userProfileUpdate: userProfileUpdateReducer,
    dashboard: dashboardReducer,
    employeeCreate: employeeCreateReducer,
    employeeList: employeeListReducer,
    employeeDelete: employeeDeleteReducer,
    employeeUpdate: employeeUpdateReducer,
    departmentCreate: departmentCreateReducer,
    departmentList: departmentListReducer,
    departmentDelete: departmentDeleteReducer,
    departmentUpdate: departmentUpdateReducer,
    departmentMember: departmentMemberReducer,
    leaveCreate: leaveCreateReducer,
    leaveList: leaveListReducer,
    leaveUpdate: leaveUpdateReducer,
    ownLeaveList: leaveList,
    teamList: teamListReducer,
    profileList: profileReducer,
  },
  preloadedState,
});
export default store;
