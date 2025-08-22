import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Example async thunk to fetch user
export const fetchUser = createAsyncThunk("user/fetchUser", async (email) => {
  const response = await axios.get("/api/users", {
    params: { email },
  });
  return response.data;
});

// Define the initial state
const initialState = {
  user: null,
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

// Create the user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
    clearUser: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
