import { FormControl, FormLabel, Input, FormHelperText, Button, Flex } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';

export type LoginFormValues = {
	name: string;
	email: string;
	password: string;
};

type Props = {
	isRegistraion?: boolean;
	onSubmit: (values: LoginFormValues) => any;
};

const LoginForm: React.FC<Props> = ({ isRegistraion = false, onSubmit }) => {
	const formik = useFormik<LoginFormValues>({
		initialValues: {
			email: '',
			name: '',
			password: '',
		},
		onSubmit: async (values) => {
			await onSubmit(values);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<FormControl width="100%" p={5} borderRadius="1rem">
				<FormLabel>Email address</FormLabel>
				<Input name="email" onChange={formik.handleChange} value={formik.values.email} type="email" />
				{isRegistraion && (
					<>
						<FormLabel>Username</FormLabel>
						<Input name="name" onChange={formik.handleChange} value={formik.values.name} type="text" />
					</>
				)}

				<FormLabel>Password</FormLabel>
				<Input name="password" onChange={formik.handleChange} value={formik.values.password} type="password" />

				<Flex mt={4} gap={4} alignItems="center">
					<Button isLoading={formik.isSubmitting} type="submit">
						{isRegistraion ? 'Register' : 'Login'}
					</Button>
					<Link to={isRegistraion ? '/login' : '/register'}>
						<Button isLoading={formik.isSubmitting} type="submit" variant="link" colorScheme="teal">
							{isRegistraion ? 'I already have an account' : 'Create new account'}
						</Button>
					</Link>
				</Flex>
			</FormControl>
		</form>
	);
};

export default LoginForm;
