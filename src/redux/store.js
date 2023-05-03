import { configureStore } from "@reduxjs/toolkit";
import tabSlice from "./slice/tabSlice";
export const store = configureStore({
    reducer: {
        tab: tabSlice
    }
})