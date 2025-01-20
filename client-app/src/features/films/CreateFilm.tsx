import { Box, Rating, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFilm, fetchFilms } from "../../app/redux/slices/filmsSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Film } from "../../app/models/entities/film";
import { toast } from "react-toastify";

export default function CreateFilm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector((state: unknown) => state.film);
  const { user } = useSelector((state: unknown) => state.user);
  useEffect(() => {
    if (user) dispatch(fetchFilms());
  }, [dispatch, user]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title can't be blank"),
    genre: Yup.string().required("Genre can't be blank"),
    director: Yup.string().required("Director can't be blank"),
    releaseYear: Yup.string().required("Release year can't be blank"),
    rating: Yup.string().required("Rating can't be blank"),
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "top",
        minHeight: "100vh",
        marginTop: "100px",
      }}
    >
      <Formik
        initialValues={{ title: "", genre: "", director: "", releaseYear: "", rating: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
            const isDuplicate = list.some(
                (film: Film) => film.title === values.title
              );
          
              if (isDuplicate) {
                toast.error("Film with this title already in system.");
                setSubmitting(false);
                return;
              }
          dispatch(createFilm(values))
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
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <label htmlFor="title">Title</label>
              <Field name="title" />
              <ErrorMessage name="title" component="div" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <label htmlFor="genre">Genre</label>
              <Field name="genre" />
              <ErrorMessage name="genre" component="div" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <label htmlFor="director">Director</label>
              <Field name="director" />
              <ErrorMessage name="director" component="div" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <label htmlFor="releaseYear">Release year</label>
              <Field name="releaseYear" />
              <ErrorMessage name="releaseYear" component="div" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <label htmlFor="rating">Rating</label>
              <Field name="rating" />
              <ErrorMessage name="rating" component="div" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <label htmlFor="description">Description</label>
              <Field name="description" />
              <ErrorMessage name="description" component="div" />
            </Box>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
