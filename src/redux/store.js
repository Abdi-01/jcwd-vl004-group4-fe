import { combineReducers, createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import {authUserLogin} from "./reducers/userReducer.js";
import {cartReducer} from "./reducers/cartReducer.js";

// const store = createStore(
//   combineReducers({
//     cart: cartReducer,
//     user: userReducer,

//   }), composeWithDevTools()
// );
const store = createStore(combineReducers({
  cart: cartReducer,
  user: authUserLogin

}), composeWithDevTools())


export default store