import { createSlice } from "@reduxjs/toolkit";

const initialState = { pageNumber: 1, postPerPage: 12 }

const paginationSlice = createSlice({
    name: "paginationSlice",
    initialState,
    reducers: { 
        changePaginationPageNumber: (state, action) => {
            state.pageNumber = action.payload;
        }
    }
})

export const { changePaginationPageNumber } = paginationSlice.actions

export default paginationSlice.reducer
