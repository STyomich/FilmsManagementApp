import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { getUser } from "../redux/slices/userSlice";
import { setAppLoaded } from "../redux/slices/commonSlice";
import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  const { token, appLoaded } = useSelector((state: any) => state.common);
  const userStatus = useSelector((state: any) => state.user.status);

  useEffect(() => {
    if (token) {
      dispatch(getUser()).finally(() => dispatch(setAppLoaded()));
    } else {
      dispatch(setAppLoaded());
    }
  }, [dispatch, token]);

  if (!appLoaded || userStatus === "loading") {
    return <Typography>Loading</Typography>;
  }
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;