import CreateFilm from "../../features/films/CreateFilm";
import FilmDetails from "../../features/films/FilmDetails";
import FilmsList from "../../features/films/FilmsList";
import LoginForm from "../identity/LoginForm";
import RegisterForm from "../identity/RegisterForm";
import App from "../layout/App";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <FilmsList /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/details/:id", element: <FilmDetails /> },
      { path: "/create", element: <CreateFilm /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
