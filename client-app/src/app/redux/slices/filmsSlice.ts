import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Film } from "../../models/entities/film";

interface FilmState {
  list: Film[];
  selectedFilm: Film | null;
}

const initialState: FilmState = {
  list: [],
  selectedFilm: null,
};

export const fetchFilms = createAsyncThunk(
  "films/fetchFilms",
  async () => {
    return await agent.Films.list();
  }
);

export const createFilm = createAsyncThunk(
  "films/createFilm",
  async (film: Film, { rejectWithValue }) => {
    try {
      await agent.Films.create(film);
      return film;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create film");
    }
  }
);
export const updateFilm = createAsyncThunk(
  "films/updateFilm",
  async (film: Film, { rejectWithValue }) => {
    try {
      await agent.Films.put(film, film.id);
      return film;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create film");
    }
  }
);

export const fetchFilmDetails = createAsyncThunk(
  "films/fetchFilmDetails",
  async (id: string, { dispatch }) => {
    const film = await agent.Films.details(id);
    dispatch(filmsSlice.actions.selectFilm(film));
    return film;
  }
);

export const deleteFilm = createAsyncThunk(
  "films/deleteFilm",
  async (id: string) => {
    await agent.Films.delete(id);
    return id;
  }
);

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    clearSelectedFilm(state) {
      state.selectedFilm = null;
    },
    selectFilm(state, action) {
      state.selectedFilm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch List
      .addCase(
        fetchFilms.fulfilled,
        (state, action: PayloadAction<Film[]>) => {
          state.list = action.payload;
        }
      )
      // Create Film
      .addCase(
        createFilm.fulfilled,
        (state, action: PayloadAction<Film>) => {
          state.list.push(action.payload);
        }
      )
      .addCase(
        updateFilm.fulfilled,
        (state, action: PayloadAction<Film>) => {
          const index = state.list.findIndex(
            (film) => film.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload; // Update the film at the found index
            state.selectedFilm = action.payload; // Update the film at the found index
          }
        }
      )
      // Fetch Details
      .addCase(
        fetchFilmDetails.fulfilled,
        (state, action: PayloadAction<Film | null>) => {
          state.selectedFilm = action.payload || null;
        }
      )
      // Delete Film
      .addCase(
        deleteFilm.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.list = state.list.filter(
            (film) => film.id !== action.payload
          );
        }
      );
  },
});

export const { clearSelectedFilm, selectFilm } = filmsSlice.actions;

export default filmsSlice.reducer;
