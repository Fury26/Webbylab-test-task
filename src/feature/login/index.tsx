import { Container, useToast } from '@chakra-ui/react';
import React from 'react';
import LoginForm, { LoginFormValues } from '../../components/login-form';
import { login } from '../../requests/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const toast = useToast();

	const onLogin = async (values: LoginFormValues) => {
		const res = await login(values);
		console.log('res', res);

		if (res.token) {
			localStorage.setItem('token', res.token);
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
			<LoginForm onSubmit={onLogin} />
		</Container>
	);
};

export default Login;
