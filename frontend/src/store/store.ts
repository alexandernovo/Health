import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import globalReducer from "./common/global";

export const store = configureStore({
    reducer: {
        userState: userReducer,
        globalState: globalReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;