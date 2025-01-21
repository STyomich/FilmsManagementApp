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
  const { list, status, error } = useSelector((state: any) => state.film); // Adjust typing as needed
  const { user } = useSelector((state: any) => state.user);
  const [filteredList, setFilteredList] = useState<Film[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = event.target.value;
    setSortOrder(selectedOrder);
    sortFilms(filteredList, selectedOrder);
  };

  const sortFilms = (films: Film[], order: string) => {
    const sortedFilms = [...films].sort((a, b) =>
      order === "asc" ? a.rating - b.rating : b.rating - a.rating
    );
    setFilteredList(sortedFilms);
  };

  const handleSearchByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = list.filter((film: Film) =>
      film.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    sortFilms(filtered, sortOrder);
  };

  useEffect(() => {
    if (user) dispatch(fetchFilms());
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

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
    <Box display="flex" sx={{ margin: 2 }}>
      <Box flex={3} sx={{ overflowX: "auto" }}>
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
                  <Button
                    variant="contained"
                    component={NavLink}
                    sx={{ marginRight: "5px" }}
                    to={`/details/${film.id}`}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box>
        <h3>Search by Title</h3>
        <input onChange={handleSearchByTitle} />
        <h3>Sort by Rating</h3>
        <select value={sortOrder} onChange={handleSort}>
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </Box>
    </Box>
  );
}
