import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../slices/commonSlice";
import filmReducer from "../slices/filmsSlice";
import userReducer from "../slices/userSlice";
const store = configureStore({
  reducer: {
    common: commonReducer,
    user: userReducer,
    film: filmReducer

  },
});

export default store;
