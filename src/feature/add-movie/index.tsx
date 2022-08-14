import React from 'react';
import {
	FormControl,
	FormLabel,
	Input,
	NumberInput,
	NumberInputField,
	Container,
	Flex,
	NumberIncrementStepper,
	NumberInputStepper,
	NumberDecrementStepper,
	Select,
	Stack,
	Button,
	FormErrorMessage,
	useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../redux/store';
import { createMovie } from '../../redux/movies';

import * as Yup from 'yup';

const MIN_YEAR = 1080;
const MAX_YEAR = 2021;

const validationSchema = Yup.object().shape({
	title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	format: Yup.string()
		.matches(/VHC|Blu-Ray|DVD/, 'Wrong Type')
		.required('Required'),
	year: Yup.number().max(MAX_YEAR, 'Too far into the future').min(MIN_YEAR, 'Too long ago').required('Required'),
});

const AddMovie = () => {
	const dispatch = useAppDispatch();
	const toast = useToast();
	const formik = useFormik<{ title: string; year: number; format: 'VHS' | 'Blu-Ray' | 'DVD'; actors: string }>({
		initialValues: {
			title: '',
			year: 2000,
			format: 'Blu-Ray',
			actors: '',
		},
		validationSchema,
		onSubmit: async (values) => {
			await dispatch(
				createMovie(
					{
						...values,
						format: values.format,
						actors: values.actors.split(','),
					},
					{
						success: () => {
							formik.resetForm();
							toast({
								position: 'top',
								title: 'Done!',
								description: 'Movie added to base.',
								status: 'success',
								duration: 3000,
								isClosable: true,
							});
						},
					},
				),
			);
			return;
		},
	});
	return (
		<Flex height="100vh" justifyContent="center">
			<Container marginTop={20}>
				<form onSubmit={formik.handleSubmit}>
					<Stack borderRadius="0.5rem" padding={5} background="cyan.50" spacing={5}>
						<Stack direction="column" spacing={0}>
							<FormLabel>Movie Title</FormLabel>
							<Input name="title" type="text" value={formik.values.title} onChange={formik.handleChange} />
							<FormErrorMessage>{formik.errors.title}</FormErrorMessage>
						</Stack>

						<Stack direction="column" spacing={0}>
							<FormLabel>Release Year</FormLabel>
							<NumberInput
								max={MAX_YEAR}
								min={MIN_YEAR}
								value={formik.values.year}
								name="year"
								onChange={(_: string, value: number) => formik.setFieldValue('year', value)}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</Stack>
						<Stack direction="column" spacing={0}>
							<FormLabel>Format</FormLabel>
							<Select name="format" value={formik.values.format} onChange={formik.handleChange}>
								<option>VHC</option>
								<option>Blu-Ray</option>
								<option>DVD</option>
							</Select>
						</Stack>

						<Stack direction="column" spacing={0}>
							<FormLabel>Actors</FormLabel>
							<Input
								type="text"
								name="actors"
								placeholder="Actors (type separeted by coma)"
								value={formik.values.actors}
								onChange={formik.handleChange}
							/>
						</Stack>
						<Button width="60%" alignSelf="center" colorScheme="teal" type="submit" isLoading={formik.isSubmitting}>
							Add
						</Button>
					</Stack>
				</form>
			</Container>
		</Flex>
	);
};

export default AddMovie;
