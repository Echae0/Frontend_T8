import { createSlice } from '@reduxjs/toolkit';
// src/features/user/userSlice.js

const initialState = {
  userInfoId: null,
  memberId: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userInfoId = action.payload.userInfoId;
      state.memberId = action.payload.memberId;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.userInfoId = null;
      state.memberId = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
