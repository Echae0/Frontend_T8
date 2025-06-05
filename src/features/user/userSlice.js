import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.id = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
