import { MoviesParams } from '../redux/movies/types';

export const parseUrlQuery = (search: string) => {
	const values = search.substring(1).split('&');
	const obj: { [key: string]: string } = {};
	const objectsArr = values.map((str) => {
		const [key, value] = str.split('=');
		obj[key] = value;
	});

	return obj;
};

export const movieParamsToUrlParams = (p: MoviesParams) => {
	const obj: any = {};
	Object.keys(p).forEach((key) => {
		const k = <keyof MoviesParams>key;
		if (!p[k]) {
			return;
		}
		obj[key] = p[k];
	});

	return obj;
};
