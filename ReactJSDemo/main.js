import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/index";

import App from "./components/App";
import AppHello from "./components/AppHello";

import "./css/bootstrap.min.css";

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app"),
);