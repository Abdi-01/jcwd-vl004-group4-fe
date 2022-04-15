import { combineReducers, createStore } from "redux";
import cartReducer from "./reducers/cart";
import userReducer from "./reducers/user";

export default createStore(
  combineReducers({
    cart: cartReducer,
    user: userReducer,
  })
);
