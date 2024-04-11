import {combineReducers} from "redux";
import {fieldReducer} from "./field";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    field: fieldReducer
});

export const store = configureStore({
    reducer: rootReducer
})