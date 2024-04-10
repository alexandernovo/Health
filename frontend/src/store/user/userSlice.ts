import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "@datatypes/userType";

const userInitialState: UserModel = {
    id: 0,
    token: "",
    firstname: "",
    lastname: "",
    username: "",
    usertype: 0,
    birthdate: "",
    occupation: "",
    education: "",
    religion: "",
    gender: "",
    isSignedIn: false
}

const userSlice = createSlice({
    name: "userState",
    initialState: userInitialState,
    reducers: {
        storeUser: (state, action: PayloadAction<Partial<UserModel>>) => {
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
