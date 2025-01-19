import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { register } from "../redux/slices/userSlice";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    userName: Yup.string().required("Username is required"),
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
      <Typography>Register</Typography>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(register(values))
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
              <label htmlFor="userName">Username</label>
              <Field name="userName" type="userName" />
              <ErrorMessage name="userName" component="div" />
            </div>
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
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
