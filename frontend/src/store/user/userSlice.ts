import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    _id: string,
    token: string,
    firstname: string,
    lastname: string,
    username: string,
    isSignedIn: boolean
}

const userInitialState: UserState = {
    _id: "",
    token: "",
    firstname: "",
    lastname: "",
    username: "",
    isSignedIn: false
}

const userSlice = createSlice({
    name: "userState",
    initialState: userInitialState,
    reducers: {
        storeUser: (state, action: PayloadAction<Partial<UserState>>) => {
            return { ...state, ...action.payload };
        },
        removeUser: () => {
            return { ...userInitialState };
        },
        setIsSignedIn: (state, action: PayloadAction<boolean>) => {
            state.isSignedIn = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    }
});

export const { storeUser, removeUser, setIsSignedIn, setToken } = userSlice.actions;
export default userSlice.reducer;
