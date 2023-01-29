import { createStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";

const appReducer = combineReducers({
    loginReducer
});

export default createStore(appReducer);