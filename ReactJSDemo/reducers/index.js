import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import moviesReducer from "./moviesReducer";
import dragdropReducer from "./dragdropReducer";

export default combineReducers({
    movies: moviesReducer,
    routing: routerReducer,
    dragdrop: dragdropReducer,
});