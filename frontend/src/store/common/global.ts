import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
    toast: boolean,
    toastMessage: string,
    toastSuccess: boolean
}

const globalInitialState: GlobalState = {
    toast: false,
    toastMessage: '',
    toastSuccess: false
}

const globalSlice = createSlice({
    name: "globalState",
    initialState: globalInitialState,
    reducers: {
        setToastState: (state, action: PayloadAction<{ toast?: boolean, toastMessage?: string, toastSuccess?: boolean }>) => {
            return { ...state, ...action.payload };
        },
    }
});

export const { setToastState } = globalSlice.actions;
export default globalSlice.reducer;
