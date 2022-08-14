import { Button, Flex, Input, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { AddIcon, ChevronUpIcon, ChevronDownIcon, RepeatIcon } from '@chakra-ui/icons';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { clearFilter, getMovies, updateFilter } from '../../redux/movies';
import { useSelector } from 'react-redux';
import { getCorrectMovieParams } from '../../helpers/get-correct-movie-params';
import { movieParamsToUrlParams, parseUrlQuery } from '../../helpers/parse-url-query';

type Props = {};

const Actions: React.FC<Props> = () => {
	const dispatch = useAppDispatch();
	const { search: urlParams } = useLocation();
	const [searchParams, setSearchParams] = useSearchParams(parseUrlQuery(urlParams));
	const { actor, order, title } = useSelector((state: RootState) => state.movies.filters);

	const searchOnClick = () => {
		const params = getCorrectMovieParams({ actor, order, title });

		dispatch(getMovies(params));
		setSearchParams(movieParamsToUrlParams(params));
	};

	const changeOrder = (val: 'ASC' | 'DESC') => {
		dispatch(updateFilter({ order: val }));
	};

	useEffect(() => {
		const parsedParams = parseUrlQuery(urlParams);
		if (!Object.keys(parsedParams)) {
			return;
		}
		dispatch(updateFilter(parsedParams));
	}, []);

	useEffect(() => {
		if (!order) {
			return;
		}
		const params = getCorrectMovieParams({ actor, order, title });
		setSearchParams(movieParamsToUrlParams(params));
		dispatch(getMovies(getCorrectMovieParams(params)));
	}, [order]);

	const onClear = () => {
		setSearchParams({});
		dispatch(clearFilter());
		dispatch(getMovies({}));
	};

	return (
		<Stack>
			<Flex>
				<Stack flexGrow={1}>
					<Input
						placeholder="Search by actor"
						size="md"
						value={actor}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateFilter({ actor: e.target.value }))}
					/>
					<Input
						placeholder="Search by title"
						size="md"
						value={title}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateFilter({ title: e.target.value }))}
					/>
				</Stack>
				<Button onClick={searchOnClick} ml={4} variant="solid" colorScheme="teal">
					Search
				</Button>
			</Flex>
			<Flex></Flex>
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

				<Link to="movie/new">
					<Button ml={4} variant="solid" colorScheme="teal" leftIcon={<AddIcon />}>
						Add
					</Button>
				</Link>
			</Stack>
		</Stack>
	);
};

export default Actions;
