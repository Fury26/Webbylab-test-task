import React from 'react';
import {
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
	FormControl,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../redux/store';
import { createMovie } from '../../redux/movies';
import { MAX_YEAR, MIN_YEAR, validationSchema } from './schema';
import { getResponseErrors } from '../../helpers/map-errors';

type FormValues = { title: string; year: number; format: 'VHS' | 'Blu-Ray' | 'DVD'; actors: string };

const AddMovie = () => {
	const dispatch = useAppDispatch();
	const toast = useToast();

	const formik = useFormik<FormValues>({
		initialValues: {
			title: '',
			year: 2000,
			format: 'Blu-Ray',
			actors: '',
		},
		validationSchema,
		onSubmit: async (values, { setErrors }) => {
			await dispatch(
				createMovie(
					{
						...values,
						title: values.title.trim(),
						actors: values.actors.trim().split(','),
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
						error: (err) => {
							setErrors(getResponseErrors<FormValues>(err));
						},
					},
				),
			);
		},
	});

	return (
		<Flex justifyContent="center" width="100%">
			<Container marginTop={20}>
				<form onSubmit={formik.handleSubmit}>
					<Stack borderRadius="0.5rem" padding={5} background="cyan.50" spacing={5}>
						<FormControl isInvalid={!!formik.errors.title}>
							<FormLabel>Movie Title</FormLabel>
							<Input name="title" type="text" value={formik.values.title} onChange={formik.handleChange} />
							<FormErrorMessage>{formik.errors.title}</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={!!formik.errors.year}>
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
							<FormErrorMessage>{formik.errors.year}</FormErrorMessage>
						</FormControl>
						<FormControl>
							<FormLabel>Format</FormLabel>
							<Select name="format" value={formik.values.format} onChange={formik.handleChange}>
								<option>VHC</option>
								<option>Blu-Ray</option>
								<option>DVD</option>
							</Select>
						</FormControl>

						<FormControl>
							<FormLabel>Actors</FormLabel>
							<Input
								type="text"
								name="actors"
								placeholder="Actors (type separeted by coma)"
								value={formik.values.actors}
								onChange={formik.handleChange}
							/>
						</FormControl>
						<Button
							disabled={!formik.isValid}
							width="60%"
							alignSelf="center"
							colorScheme="teal"
							type="submit"
							isLoading={formik.isSubmitting}
						>
							Add
						</Button>
					</Stack>
				</form>
			</Container>
		</Flex>
	);
};

export default AddMovie;
