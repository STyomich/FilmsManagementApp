import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import {
  fetchFilmDetails,
  updateFilm,
} from "../../app/redux/slices/filmsSlice";

export default function FilmDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const selectedFilm = useSelector((state: unknown) => state.film.selectedFilm);
  const [filmDetails, setFilmDetails] = useState(selectedFilm);

  useEffect(() => {
    console.log(id);
    dispatch(fetchFilmDetails(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (selectedFilm) {
      setFilmDetails(selectedFilm);
    }
  }, [selectedFilm]);

  if (!selectedFilm) {
    return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Film Details
        </Typography>
        <Typography variant="body1">Loading...</Typography>
      </Box>
    );
  }
  function handleEditMode() {
    setEditMode((editMode) => !editMode);
  }
  function handleUpdateFilm() {
    dispatch(updateFilm(filmDetails));
    setEditMode((editMode) => !editMode);
    
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFilmDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }
  return (
    <>
      {!editMode && (
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            Film Details
          </Typography>
          <Typography variant="h6">Title:</Typography>
          <Typography variant="body1">{selectedFilm.title}</Typography>
          <Typography variant="h6" mt={2}>
            Genre
          </Typography>
          <Typography variant="body1">{selectedFilm.genre}</Typography>
          <Typography variant="h6" mt={2}>
            Director
          </Typography>
          <Typography variant="body1">{selectedFilm.director}</Typography>
          <Typography variant="h6" mt={2}>
            Release year
          </Typography>
          <Typography variant="body1">{selectedFilm.releaseYear}</Typography>
          <Typography variant="h6" mt={2}>
            Rating
          </Typography>
          <Typography variant="body1">{selectedFilm.rating}</Typography>
          <Typography variant="h6" mt={2}>
            Description
          </Typography>
          <Typography variant="body1">{selectedFilm.description}</Typography>
          <Button variant="contained" onClick={handleEditMode}>
            Edit mode
          </Button>
        </Box>
      )}
      {editMode && (
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            Film Details
          </Typography>
          <Typography variant="h6">Title:</Typography>
          <input
            name="title"
            value={filmDetails.title}
            onChange={handleInputChange}
          />
          <Typography variant="h6" mt={2}>
            Genre:
          </Typography>
          <input
            name="genre"
            value={filmDetails.genre}
            onChange={handleInputChange}
          />
          <Typography variant="h6" mt={2}>
            Director:
          </Typography>
          <input
            name="director"
            value={filmDetails.director}
            onChange={handleInputChange}
          />
          <Typography variant="h6" mt={2}>
            Release Year:
          </Typography>
          <input
            name="releaseYear"
            value={filmDetails.releaseYear}
            onChange={handleInputChange}
          />
          <Typography variant="h6" mt={2}>
            Rating:
          </Typography>
          <input
            name="rating"
            value={filmDetails.rating}
            onChange={handleInputChange}
          />
          <Typography variant="h6" mt={2}>
            Description:
          </Typography>
          <input
            name="description"
            value={filmDetails.description}
            onChange={handleInputChange}
          />
          <Box mt={2}>
            <Button variant="contained" onClick={handleEditMode}>
              Discard
            </Button>
            <Button variant="contained" onClick={handleUpdateFilm}>
              Save
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
