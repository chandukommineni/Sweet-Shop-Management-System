import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/AuthSlice";
import SweetReducer from "./slice/SweetSlice";
export const store=configureStore({
    reducer:{
        auth:AuthReducer,
        sweets:SweetReducer,
    }
})