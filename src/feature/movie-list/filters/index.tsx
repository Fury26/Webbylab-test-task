import React, { useEffect, useRef } from 'react';
import { Button, Flex, FormControl, FormErrorMessage, Input, Stack } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon, RepeatIcon } from '@chakra-ui/icons';
import { useSearchParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../../redux/store';
import { clearFilter, getMovies, updateFilter } from '../../../redux/movies';
import { useSelector } from 'react-redux';
import { getCorrectMovieParams } from '../../../helpers/get-correct-movie-params';
import { movieParamsToUrlParams } from '../../../helpers/parse-url-query';
import { useFormik } from 'formik';
import { FilterFormikValues, validationSchema } from './validation-schema';

const Filters: React.FC = () => {
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const { actor, order, title, offset } = useSelector((state: RootState) => state.movies.filters);
	const isFirstLoad = useRef(true);

	const formik = useFormik<FilterFormikValues>({
		initialValues: {
			actor: actor || '',
			title: actor || '',
		},
		validationSchema,
		onSubmit: (values) => {
			dispatch(updateFilter({ ...values }));
		},
	});

	const search = () => {
		const params = getCorrectMovieParams({ actor, order, title, offset });

		dispatch(getMovies(params));
		setSearchParams(movieParamsToUrlParams(params));
	};

	const changeOrder = (val: 'ASC' | 'DESC') => {
		dispatch(updateFilter({ order: val }));
	};

	useEffect(() => {
		const params: { [key: string]: string } = {};
		for (const [key, value] of searchParams) {
			params[key] = value;
		}

		if (!Object.keys(params).length) {
			search();
			return;
		}
		dispatch(updateFilter(params));
	}, []);

	useEffect(() => {
		formik.setValues({ actor: actor || '', title: title || '' });
		if (isFirstLoad.current) {
			isFirstLoad.current = false;
			return;
		}

		search();
	}, [actor, order, title, offset]);

	const onClear = () => {
		setSearchParams({});
		dispatch(clearFilter());
	};

	return (
		<Stack>
			<Flex>
				<Stack flexGrow={1} justifyContent="center">
					<FormControl isInvalid={!!formik.errors.actor && !!formik.values.actor}>
						<Input
							placeholder="Search by actor"
							size="md"
							name="actor"
							value={formik.values.actor}
							onChange={formik.handleChange}
						/>
						<FormErrorMessage>{formik.errors.actor}</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={!!formik.errors.title && !!formik.values.title}>
						<Input
							placeholder="Search by title"
							size="md"
							name="title"
							value={formik.values.title}
							onChange={formik.handleChange}
						/>
						<FormErrorMessage>{formik.errors.title}</FormErrorMessage>
					</FormControl>
				</Stack>
				<Button onClick={() => formik.handleSubmit()} ml={4} variant="solid" colorScheme="teal">
					Search
				</Button>
			</Flex>
			<Stack direction="row" spacing={3} justifyContent="space-between">
				<Flex gap={4}>
					<Button leftIcon={<ChevronUpIcon />} onClick={() => changeOrder('ASC')}>
						A-Z
					</Button>
					<Button leftIcon={<ChevronDownIcon />} onClick={() => changeOrder('DESC')}>
						Z-A
					</Button>
					<Button leftIcon={<RepeatIcon />} onClick={onClear}>
						Clear
					</Button>
				</Flex>
			</Stack>
		</Stack>
	);
};

export default Filters;
