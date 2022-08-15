import { Container, useToast } from '@chakra-ui/react';
import React from 'react';
import LoginForm, { LoginFormValues } from '../../components/login-form';
import { register } from '../../requests/auth';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../requests';

const Register = () => {
	const navigate = useNavigate();
	const toast = useToast();

	const onRegister = async (values: LoginFormValues) => {
		const res = await register({ ...values, confirmPassword: values.password });

		if (res.token) {
			setAuthToken(res.token);
			navigate('/');
			return;
		}

		toast({
			position: 'top',
			title: 'Error!',
			description: 'Ops. Someting went wrong.',
			status: 'error',
			duration: 3000,
			isClosable: true,
		});
	};

	return (
		<Container>
			<LoginForm isRegistraion onSubmit={onRegister} />
		</Container>
	);
};

export default Register;
