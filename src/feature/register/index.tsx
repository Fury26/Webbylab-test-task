import React from 'react';
import { Container, useToast } from '@chakra-ui/react';
import LoginForm, { LoginFormValues } from '../../components/login-form';
import { register } from '../../requests/auth';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../requests';
import { getResponseErrors } from '../../helpers/map-errors';
import { FormikHelpers } from 'formik';

const Register = () => {
	const navigate = useNavigate();
	const toast = useToast();

	const onRegister = async (values: LoginFormValues, { setErrors }: FormikHelpers<LoginFormValues>) => {
		const res = await register({ ...values, confirmPassword: values.password });

		if (res.token) {
			setAuthToken(res.token);
			navigate('/');
			return;
		}
		setErrors(getResponseErrors(res.error));
	};

	return (
		<Container>
			<LoginForm isRegistraion onSubmit={onRegister} />
		</Container>
	);
};

export default Register;
