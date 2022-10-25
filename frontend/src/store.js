import { configureStore } from "@reduxjs/toolkit";
import { employeeCountReducer } from "./reducers/employeeReducer";
import { departmentCountReducer } from "./reducers/departmentReducer";
import { userLoginReducer } from "./reducers/userReducers";

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
  },
  preloadedState,
});
export default store;
