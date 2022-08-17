import * as Yup from 'yup';

export type FilterFormikValues = { actor: string; title: string };

const TITLE_MIN_LENGTH = 3;
const ACTOR_MIN_LENGTH = 3;

export const validationSchema = Yup.object().shape({
	title: Yup.string().min(TITLE_MIN_LENGTH, 'Too Short!').trim(),
	actor: Yup.string().min(ACTOR_MIN_LENGTH, 'Too Short!').trim(),
});
