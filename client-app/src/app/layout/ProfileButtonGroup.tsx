import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getUser, logout } from "../redux/slices/userSlice";

export default function ProfileButtonGroup() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
      {user ? (
        <>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "none",
            }}
          >
            <Typography sx={{ color: "white" }}>{user.userName}</Typography>
          </Button>
          <Button
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "#0e1420",
                color: "white",
              },
            }}
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button
            component={NavLink}
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "#0e1420",
                color: "white",
              },
            }}
            to="/login"
          >
            Login
          </Button>
          <Button sx={{ color: "white" }} component={NavLink} to="/register">
            Register
          </Button>
        </>
      )}
    </Box>
  );
}
