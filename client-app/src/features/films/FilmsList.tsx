import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchFilms } from "../../app/redux/slices/filmsSlice";
import { Film } from "../../app/models/entities/film";

export default function FilmsList() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state: unknown) => state.film);
  const { user } = useSelector((state: unknown) => state.user);

  useEffect(() => {
    if (user) dispatch(fetchFilms());
  }, [dispatch]);

  const handleDeleteClick = (id: string) => {
    console.log("Details for:", id);
    // Logic to Delete
  };

  if (status === "loading") {
    return <p>Loading films...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }
  if (!user) {
    return <h1>Please, login to system</h1>;
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Genre</TableCell>
          <TableCell>Director</TableCell>
          <TableCell>Release Year</TableCell>
          <TableCell>Rating</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Operations</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((film: Film) => (
          <TableRow key={film.id}>
            <TableCell>{film.title}</TableCell>
            <TableCell>{film.genre}</TableCell>
            <TableCell>{film.director}</TableCell>
            <TableCell>{film.releaseYear}</TableCell>
            <TableCell>{film.rating}</TableCell>
            <TableCell>{film.description}</TableCell>
            <TableCell>
              {user != null ? (
                <Button
                  variant="contained"
                  component={NavLink}
                  sx={{ marginRight: "5px" }}
                  to={`/details/${film.id}`}
                >
                  Details
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled
                  component={NavLink}
                  sx={{ marginRight: "5px" }}
                  to={`/details/${film.id}`}
                >
                  Details
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
