import React from 'react';
import { Container, useToast } from '@chakra-ui/react';
import LoginForm, { LoginFormValues } from '../../components/login-form';
import { login } from '../../requests/auth';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../requests';
import { FormikHelpers } from 'formik';
import { getResponseErrors } from '../../helpers/map-errors';

const Login = () => {
	const navigate = useNavigate();
	const toast = useToast();

	const onLogin = async (values: LoginFormValues, { setErrors }: FormikHelpers<LoginFormValues>) => {
		const res = await login(values);

		if (res.token) {
			setAuthToken(res.token);
			navigate('/');
			return;
		}

		// const description = res.error?.code === 'AUTHENTICATION_FAILED' ? 'Wrond email or password' : 'Ops. Someting went wrong.';
		setErrors(getResponseErrors<LoginFormValues>(res.error));
		// toast({
		// 	position: 'top',
		// 	title: 'Error!',
		// 	description,
		// 	status: 'error',
		// 	duration: 3000,
		// 	isClosable: true,
		// });
	};

	return (
		<Container>
			<LoginForm onSubmit={onLogin} />
		</Container>
	);
};

export default Login;
