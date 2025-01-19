import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { setToken } from "./commonSlice";
import {
  User,
  UserLoginValues,
  UserRegisterValues,
} from "../../models/identity/user";
import agent from "../../api/agent";


interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (creds: UserLoginValues, { dispatch }) => {
    const user = await agent.Account.login(creds);
    dispatch(setToken(user.token));
    return user;
  }
);
export const register = createAsyncThunk(
  "user/register",
  async (creds: UserRegisterValues, { dispatch }) => {
    const user = await agent.Account.register(creds);
    dispatch(setToken(user.token));
    return user;
  }
);
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    dispatch(setToken(null));
    dispatch(userSlice.actions.logout());
    return null;
  }
);

export const getUser = createAsyncThunk("user/getUser", async () => {
  return await agent.Account.current();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
