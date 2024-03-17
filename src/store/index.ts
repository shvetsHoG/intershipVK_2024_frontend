import {combineReducers, configureStore} from "@reduxjs/toolkit";
import NameSlice from "./slices/NameSlice.ts";

const rootReducer = combineReducers({
    name: NameSlice
})
export const store = configureStore({
    reducer: rootReducer
})