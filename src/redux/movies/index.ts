import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createNewMovie, fetchMovieById, fetchMovies, removeMovie } from '../../requests/movies';
import { CreateMovieType, FetchCallbacks, Movie, MoviesParams } from './types';
import { AppDispatch } from '../store';

export type MoviesState = {
	movies: Movie[];
	isLoading: boolean;
	currentMovie: Movie | null;
	filters: MoviesParams;
};

const initialState: MoviesState = {
	movies: [],
	isLoading: false,
	currentMovie: null,
	filters: { actor: '', title: '' },
};

// export const getMovies = createAsyncThunk('movies/get', async (params: MoviesParams) => {
// 	const res = await fetchMovies(params);
// 	return res;
// });

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		addMovie: (state: MoviesState, action: PayloadAction<Movie>) => {
			state.movies.push(action.payload);
		},
		remove: (state: MoviesState, action: PayloadAction<number | string>) => {
			state.movies = state.movies.filter(({ id }) => id !== action.payload);
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
			state.filters = { ...state.filters, ...action.payload };
		},
		clearFilter: (state: MoviesState) => {
			state.filters = initialState.filters;
		},
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(getMovies.fulfilled, (state: MoviesState, action: PayloadAction<Movie[]>) => {
	// 		state.movies = action.payload;
	// 	});
	// },
});

export const { addMovie, addMovies, remove, setMovies, setIsLoading, setCurrentMovieId, clearFilter, updateFilter } =
	moviesSlice.actions;

export default moviesSlice.reducer;

export const getMovies =
	(params: MoviesParams, { success, error }: FetchCallbacks = {}) =>
	async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));
		const res = await fetchMovies(params);
		dispatch(setIsLoading(false));
		dispatch(setMovies(res));
		return res;
	};

export const createMovie =
	(movie: CreateMovieType, { success, error }: FetchCallbacks = {}) =>
	async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));

		const res = await createNewMovie(movie);
		dispatch(setIsLoading(false));
		if (res) {
			dispatch(addMovie(res));
			success && success();
		} else {
			error && error();
		}
	};

export const deleteMovie =
	(id: number | string, { success, error }: FetchCallbacks = {}) =>
	async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));

		const res = await removeMovie(id);
		dispatch(setIsLoading(false));
		if (res) {
			dispatch(remove(id));
			success && success();
		} else {
			error && error();
		}
	};

export const loadCurrentMovie =
	(id: number | string, { success, error }: FetchCallbacks = {}) =>
	async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true));

		const res = await fetchMovieById(id);
		dispatch(setIsLoading(false));
		if (res) {
			dispatch(setCurrentMovieId(res));
			success && success();
		} else {
			error && error();
		}
	};
