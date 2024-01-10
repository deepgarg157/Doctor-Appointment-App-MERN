import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        getData: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {getData } = userSlice.actions;

export default userSlice.reducer;