import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",    
    initialState: {
        currentUser: null,
        isFetching: false,
        error:false,
    },
    reducers: {
         loginStart: (state) => {
            state.isFetching = true;
            state.error = false;
         },
         loginSuccess: (state,action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
         },
         loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
         },
         logOut: (state) => {
            state.isFetching = false;
            state.currentUser = null;
            state.isFetching = false;
         },
    }
})

export const {loginStart, loginSuccess, loginFailure, logOut} = userSlice.actions;
export default userSlice.reducer;