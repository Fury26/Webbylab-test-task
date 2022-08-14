export type Movie = {
	id: string | number;
	title: string;
	year: number;
	format: 'DVD' | 'VHS' | 'Blu-Ray';
	actors?: Actor[];
};

export type CreateMovieType = {
	title: string;
	year: number;
	format: 'DVD' | 'VHS' | 'Blu-Ray';
	actors?: string[];
};

export type Actor = {
	id: number | string;
	name: string;
};

export type MoviesParams = {
	actor?: string;
	title?: string;
	search?: string;
	sort?: string;
	order?: 'ASC' | 'DESC';
	limit?: number;
	offset?: number;
};

export type FetchCallbacks = {
	success?: () => any;
	error?: () => any;
};
