import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  token: string | null;
  appLoaded: boolean;
}

const initialState: CommonState = {
  token: localStorage.getItem("jwt"),
  appLoaded: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("jwt", action.payload);
      } else {
        localStorage.removeItem("jwt");
      }
    },
    setAppLoaded(state) {
      state.appLoaded = true;
    },
  },
});

export const { setToken, setAppLoaded } = commonSlice.actions;

export default commonSlice.reducer;
