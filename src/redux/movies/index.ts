import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Movie } from 'redux/movies/types';

export type MoviesState = {
	movies: Movie[];
};

const initialState: MoviesState = {
	movies: [],
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
		},
		addMovies: (state: MoviesState, action: PayloadAction<Movie[]>) => {
			state.movies.push(...action.payload);
		},
	},
});

export const { addMovie, addMovies, remove } = moviesSlice.actions;

export default moviesSlice.reducer;
