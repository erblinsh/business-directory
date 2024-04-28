import { createSlice } from "@reduxjs/toolkit";

const initialState = { activeCategoryName: "" }

const activeCategorySlice = createSlice({
    name: "activeCategory",
    initialState,
    reducers: {
        activeCategoryName: (state, action) => {
            state.activeCategoryName = action.payload;
        },
        deactiveCategoryName: (state) => {
            state.activeCategoryName = "";
        }
    }
})

export const { activeCategoryName, deactiveCategoryName } = activeCategorySlice.actions

export default activeCategorySlice.reducer
