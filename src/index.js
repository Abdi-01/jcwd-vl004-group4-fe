import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { Reducers } from "./redux/reducers";

const storeReducer = createStore(Reducers);

ReactDOM.render(
  <Provider store={storeReducer}>
    <App />
  </Provider>,
  document.getElementById("root")
);
