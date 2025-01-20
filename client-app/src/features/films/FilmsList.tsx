import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchFilms } from "../../app/redux/slices/filmsSlice";
import { Film } from "../../app/models/entities/film";
import SearchPanel from "./SearchPanel";

export default function FilmsList() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state: unknown) => state.film);
  const { user } = useSelector((state: unknown) => state.user);
  const [filteredList, setFilteredList] = useState<Film[]>([]);

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  useEffect(() => {
    if (user) dispatch(fetchFilms());
  }, [dispatch, user]);

  if (status === "loading") {
    return <p>Loading films...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }
  if (!user) {
    return <h1>Please, login to system</h1>;
  }
  function handleSearchByTitle(event) {
    const filtered = list.filter((film: Film) =>
      film.title.includes(event.target.value)
    );
    setFilteredList(filtered);
  }
  return (
    <Box display="flex"
    sx={{ margin: 2 }}>
      <Box flex={3} sx={{ overflowX: 'auto' }}>
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
            {filteredList.map((film: Film) => (
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
      </Box>
      <Box>
        <h3>Search by Title</h3>
        <input onChange={handleSearchByTitle}></input>
      </Box>
    </Box>
  );
}
