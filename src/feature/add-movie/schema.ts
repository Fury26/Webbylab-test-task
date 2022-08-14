import * as Yup from 'yup';

export const MIN_YEAR = 1080;
export const MAX_YEAR = 2021;
const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 50;

export const validationSchema = Yup.object().shape({
	title: Yup.string().min(TITLE_MIN_LENGTH, 'Too Short!').max(TITLE_MAX_LENGTH, 'Too Long!').required('Required'),
	format: Yup.string()
		.matches(/VHC|Blu-Ray|DVD/, 'Wrong Type')
		.required('Required'),
	year: Yup.number().max(MAX_YEAR, 'Too far into the future').min(MIN_YEAR, 'Too long ago').required('Required'),
});
