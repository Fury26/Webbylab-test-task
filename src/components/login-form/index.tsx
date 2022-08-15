import { FormControl, FormLabel, Input, Button, Flex, FormErrorMessage } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { loginValidationSchema } from './schema';

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
		validationSchema: loginValidationSchema,
		onSubmit: async (values) => {
			await onSubmit(values);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<FormControl width="100%" p={5} borderRadius="1rem">
				<FormControl isInvalid={!!formik.errors.email && !!formik.values.email}>
					<FormLabel>Email address</FormLabel>
					<Input
						autoComplete="email"
						name="email"
						onChange={formik.handleChange}
						value={formik.values.email}
						type="email"
					/>
					<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
				</FormControl>

				{isRegistraion && (
					<>
						<FormControl isInvalid={!!formik.errors.name && !!formik.values.name}>
							<FormLabel>Username</FormLabel>
							<Input
								autoComplete="username"
								name="name"
								onChange={formik.handleChange}
								value={formik.values.name}
								type="text"
							/>
							<FormErrorMessage>{formik.errors.name}</FormErrorMessage>
						</FormControl>
					</>
				)}

				<FormControl isInvalid={isRegistraion && !!formik.errors.password && !!formik.values.password}>
					<FormLabel>Password</FormLabel>
					<Input
						name="password"
						onChange={formik.handleChange}
						value={formik.values.password}
						type="password"
						autoComplete="current-password"
					/>
					<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
				</FormControl>

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
