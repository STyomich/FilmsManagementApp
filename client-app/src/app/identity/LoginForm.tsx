import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux"; 
import { login } from "../redux/slices/userSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", 
        justifyContent: "top", 
        alignItems: "center", 
        minHeight: "100vh", 
        marginTop: "100px", 
        gap: "20px", 
      }}
    >
      <Typography>Login</Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(login(values))
            .then(() => {
              navigate("/");
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
