import { combineReducers } from "redux";
import { authUserLogin } from "./userReducer";
import { authAdminLogin } from "./adminReducer";

export const Reducers = combineReducers({
  authUserLogin,
  authAdminLogin,
});
