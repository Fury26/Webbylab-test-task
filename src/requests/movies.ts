import axiosInstance from '.';
import { CreateMovieType, Movie, MoviesParams } from '../redux/movies/types';

export const fetchMovies = async (params: MoviesParams): Promise<Movie[]> => {
	type ResType = {
		data?: Movie[];
		meta?: { total: number };
		status?: number;
		error?: any;
	};
	const res = await axiosInstance.get<ResType>('movies', { params });

	return res.data?.data || [];
};

export const createNewMovie = async (movie: CreateMovieType): Promise<Movie | null> => {
	type ResType = {
		data?: Movie;
		error?: any;
	};
	const res = await axiosInstance.post<ResType>('movies', movie);
	return res.data.data || null;
};

export const fetchImportMovies = async (formData: FormData): Promise<Movie[] | null> => {
	type ResType = {
		data?: Movie[];
		error?: any;
	};
	const res = await axiosInstance.post<ResType>('movies/import', formData);
	return res.data.data || null;
};

export const removeMovie = async (id: number | string): Promise<boolean> => {
	type ResType = {
		status: number;
	};
	const res = await axiosInstance.delete<ResType>(`movies/${id}`);
	return res.data.status === 1;
};

export const fetchMovieById = async (id: number | string): Promise<Movie | null> => {
	type ResType = {
		status?: number;
		data?: Movie;
		error?: any;
	};
	const res = await axiosInstance.get<ResType>(`movies/${id}`);
	return res.data.data || null;
};
