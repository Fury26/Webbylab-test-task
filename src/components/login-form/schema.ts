import * as Yup from 'yup';
import { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

const PASSWORD_MIN_LENGTH = 4;

export const loginValidationSchema = (isRegistration: boolean) => {
	type Shape = {
		name?: RequiredStringSchema<string | undefined, AnyObject>;
		email: RequiredStringSchema<string | undefined, AnyObject>;
		password: RequiredStringSchema<string | undefined, AnyObject>;
	};
	const shape: Shape = {
		email: Yup.string().email('It is not an email').required('Required'),
		password: Yup.string().required('Required').min(PASSWORD_MIN_LENGTH, 'Too short password'),
	};
	if (isRegistration) {
		shape.name = Yup.string().trim().required('Required');
	}
	const obj = Yup.object().shape(shape);
	return obj;
};
