import { MoviesParams } from '../redux/movies/types';

export const getCorrectMovieParams = (params: MoviesParams) => {
	const newParams: MoviesParams = {};
	if (params.actor) {
		newParams.actor = params.actor;
	}
	if (params.title) {
		newParams.title = params.title;
	}
	if (params.order) {
		newParams.order = params.order;
	}
	if (params.offset) {
		newParams.offset = +params.offset;
	}
	return newParams;
};
