import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authUserLogin } from "./reducers/userReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";

// const store = createStore(
//   combineReducers({
//     cart: cartReducer,
//     user: userReducer,

//   }), composeWithDevTools()
// );
const store = createStore(combineReducers({
  cart: cartReducer,
  user: authUserLogin

}), composeWithDevTools(applyMiddleware(thunk)))


export default store