import { User } from "../identity/user";

export interface Film{
    id: string,
    userId: string,
    user: User,
    title: string,
    genre: string,
    director: string,
    releaseYear: number,
    rating: number,
    description: string,
}
export interface FilmDto{
    id: string,
    userId: string,
    title: string,
    genre: string,
    director: string,
    releaseYear: number,
    rating: number,
    description: string,
}