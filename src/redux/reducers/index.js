import { combineReducers } from "redux";
import { authUserLogin } from "./userReducer";
import { authAdminLogin } from "./adminReducer";
import {cartReducer} from './cartReducer'

export const Reducers = combineReducers({
  authUserLogin,
  authAdminLogin,
  cartReducer
});

