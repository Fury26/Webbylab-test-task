export type Movie = {
	id: string | number;
	title: string;
	releaseYear: number;
	format: 'DVD' | 'VHS' | 'Blu-Ray';
	stars: Actor[];
};

export type Actor = {
	name: string;
};
