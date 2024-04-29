import { createSlice } from "@reduxjs/toolkit";

const emptyUserState = {
  isLoggedIn: localStorage.getItem('user') ? true : false,
  username: "",
  name: "",
  password: "",
  role: localStorage.getItem('user-role') ? JSON.parse(localStorage.getItem('user-role')) : ""
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: emptyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.isLoggedIn = true
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.role = localStorage.getItem('user-role') ? JSON.parse(localStorage.getItem('user-role')) : ""
    },
    setRegisterUser: (state, action) => {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.password = action.payload.password;
      state.role = action.payload.role;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.name = "";
      state.password = "";
      state.role = "";
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    }
  },
});

export const { setLoggedInUser, setRegisterUser, setLogout, setUserRole } = userAuthSlice.actions;

export default userAuthSlice.reducer
