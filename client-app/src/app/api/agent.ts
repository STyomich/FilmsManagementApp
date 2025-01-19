import axios, { AxiosResponse } from "axios";
import {
  User,
  UserLoginValues,
  UserRegisterValues,
} from "../models/identity/user";
import store from "../redux/stores";
import { Film, FilmDto } from "../models/entities/film";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.common.token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: NonNullable<unknown>) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: NonNullable<unknown>) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Films = {
  list: () => requests.get<Film[]>("/films"),
  create: (film: FilmDto) => requests.post<void>("/films", film),
  put: (film: FilmDto, id: string) => requests.put<void>(`/films/${id}`, film),
  details: (id: string) => requests.get<Film>(`/films/${id}`),
  delete: (id: string) => requests.del<void>(`/films/${id}`),
};

const Account = {
  current: () => requests.get<User>("/users"),
  login: (userLoginValues: UserLoginValues) =>
    requests.post<User>("/users/login", userLoginValues),
  register: (userRegisterValues: UserRegisterValues) =>
    requests.post<User>("/users/register", userRegisterValues),
};

const agent = {
  Films,
  Account,
};

export default agent;
