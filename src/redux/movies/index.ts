import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createNewMovie, fetchImportMovies, fetchMovieById, fetchMovies, removeMovie } from '../../requests/movies';
import { CreateMovieType, FetchCallbacks, Movie, MoviesParams } from './types';
import { AppDispatch } from '../store';

export type MoviesState = {
	movies: Movie[];
	isLoading: boolean;
	currentMovie: Movie | null;
	filters: MoviesParams;
	meta: {
		total: number;
	};
};
export const PER_PAGE = 20;

const initialState: MoviesState = {
	movies: [],
	isLoading: false,
	currentMovie: null,
	filters: { actor: '', title: '' },
	meta: {
		total: 0,
	},
};

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		addMovie: (state: MoviesState, action: PayloadAction<Movie>) => {
			state.movies.push(action.payload);
		},
		remove: (state: MoviesState, action: PayloadAction<number | string>) => {
			state.movies = state.movies.filter(({ id }) => id !== action.payload);
			state.meta.total = state.meta.total - 1;
		},
		addMovies: (state: MoviesState, action: PayloadAction<Movie[]>) => {
			state.movies.push(...action.payload);
		},
		setMovies: (state: MoviesState, action: PayloadAction<Movie[]>) => {
			state.movies = action.payload;
		},
		setIsLoading: (state: MoviesState, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setCurrentMovieId: (state: MoviesState, action: PayloadAction<Movie | null>) => {
			state.currentMovie = action.payload;
		},
		updateFilter: (state: MoviesState, action: PayloadAction<MoviesParams>) => {
			if (!state.filters) {
				return;
			}
			const { limit, offset } = action.payload;
			state.filters = {
				...state.filters,
				...action.payload,
				offset: offset ? +offset : initialState.filters.offset,
				limit: limit ? +limit : initialState.filters.limit,
			};
		},
		clearFilter: (state: MoviesState) => {
			state.filters = initialState.filters;
		},
		setMeta: (state: MoviesState, action: PayloadAction<{ total: number }>) => {
			state.meta = action.payload;
		},
	},
});

export const { addMovie, addMovies, remove, setMovies, setIsLoading, setCurrentMovieId, clearFilter, updateFilter, setMeta } =
	moviesSlice.actions;

export default moviesSlice.reducer;

export const getMovies =
	(params: MoviesParams, { success, error }: FetchCallbacks = {}) =>
	async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));
		const res = await fetchMovies(params);
		dispatch(setIsLoading(false));
		if (res.data) {
			dispatch(setMovies(res.data));
			dispatch(setMeta({ total: res.meta?.total || 0 }));
			success && success();
		} else {
			error && error(res.error);
		}
		return res;
	};

export const createMovie =
	(movie: CreateMovieType, { success, error }: FetchCallbacks = {}) =>
	async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));

		const res = await createNewMovie(movie);
		dispatch(setIsLoading(false));
		if (res.data) {
			dispatch(addMovie(res.data));
			success && success();
		} else {
			error && error(res.error);
		}
	};

export const deleteMovie =
	(id: number | string, { success, error }: FetchCallbacks = {}) =>
	async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));

		const res = await removeMovie(id);
		dispatch(setIsLoading(false));
		if (!res.error) {
			dispatch(remove(id));
			success && success();
		} else {
			error && error(res.error);
		}
	};

export const loadCurrentMovie =
	(id: number | string, { success, error }: FetchCallbacks = {}) =>
	async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));

		const res = await fetchMovieById(id);
		dispatch(setIsLoading(false));
		if (res.data) {
			dispatch(setCurrentMovieId(res.data));
			success && success();
		} else {
			error && error(res.error);
		}
	};

export const importMovies =
	(movies: FormData, { success, error }: FetchCallbacks = {}) =>
	async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));

		const res = await fetchImportMovies(movies);
		dispatch(setIsLoading(false));
		if (res.data) {
			success && success();
		} else {
			error && error(res.error);
		}
	};
