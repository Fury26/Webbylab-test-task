import * as Yup from 'yup';

const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 4;

export const loginValidationSchema = (isRegistration: boolean) => {
	const obj = Yup.object().shape({
		email: Yup.string().email('It is not an email').required('Required'),
		password: Yup.string().required('Required').min(PASSWORD_MIN_LENGTH, 'Too short password'),
	});
	if (isRegistration) {
		obj.shape({
			name: Yup.string().trim().required('Required'),
		});
	}
	return obj;
};
