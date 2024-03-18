import {configureStore} from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";

const store = configureStore({
    reducer: {
        login: loginSlice
    },
    devTools:
        process.env.NODE_ENV !== 'production',
})

export default store