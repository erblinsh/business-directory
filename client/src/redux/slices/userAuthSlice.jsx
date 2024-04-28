import { createSlice } from "@reduxjs/toolkit";

const emptyUserState = {
  isLoggedIn: localStorage.getItem('user') ? true : false,
  username: "",
  name: "",
  password: "",
  role: ""
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: emptyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.isLoggedIn = true
      state.username = action.payload.username;
      state.name = action.payload.name;
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
    }
  },
});

export const { setLoggedInUser, setRegisterUser, setLogout } = userAuthSlice.actions;

export default userAuthSlice.reducer
