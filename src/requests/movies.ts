import axiosInstance, { CommonResType } from '.';
import { CreateMovieType, Movie, MoviesParams } from '../redux/movies/types';

type FetchMoviesType = CommonResType & {
	data?: Movie[];
	meta?: { total: number };
};
export const fetchMovies = async (params: MoviesParams): Promise<FetchMoviesType> => {
	const res = await axiosInstance.get<FetchMoviesType>('movies', { params });

	return res.data;
};

type CreateNewMovieType = CommonResType & { data?: Movie };
export const createNewMovie = async (movie: CreateMovieType): Promise<CreateNewMovieType> => {
	const res = await axiosInstance.post<CreateNewMovieType>('movies', movie);
	return res.data;
};

type ImportMoviesType = CommonResType & { data?: Movie[] };
export const fetchImportMovies = async (formData: FormData): Promise<ImportMoviesType> => {
	const res = await axiosInstance.post<ImportMoviesType>('movies/import', formData);
	return res.data;
};

export const removeMovie = async (id: number | string): Promise<CommonResType> => {
	const res = await axiosInstance.delete<CommonResType>(`movies/${id}`);
	return res.data;
};

type FetchMovieType = CommonResType & { data?: Movie };
export const fetchMovieById = async (id: number | string): Promise<FetchMovieType> => {
	const res = await axiosInstance.get<FetchMovieType>(`movies/${id}`);
	return res.data;
};
