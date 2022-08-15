import { Button, Flex, Input, Stack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon, RepeatIcon } from '@chakra-ui/icons';
import { useSearchParams, useLocation } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { clearFilter, getMovies, updateFilter } from '../../redux/movies';
import { useSelector } from 'react-redux';
import { getCorrectMovieParams } from '../../helpers/get-correct-movie-params';
import { movieParamsToUrlParams, parseUrlQuery } from '../../helpers/parse-url-query';

const Filters: React.FC = () => {
	const dispatch = useAppDispatch();
	const { search: urlParams } = useLocation();
	const [, setSearchParams] = useSearchParams(parseUrlQuery(urlParams));
	const { actor, order, title } = useSelector((state: RootState) => state.movies.filters);
	const isFirstLoad = useRef(true);

	const [actorState, setActorState] = useState(actor);
	const [titleState, setTitleState] = useState(actor);

	const search = () => {
		const params = getCorrectMovieParams({ actor, order, title });

		dispatch(getMovies(params));
		setSearchParams(movieParamsToUrlParams(params));
	};

	const searchOnClick = () => {
		dispatch(updateFilter({ actor: actorState, title: titleState }));
	};

	const changeOrder = (val: 'ASC' | 'DESC') => {
		dispatch(updateFilter({ order: val }));
	};

	useEffect(() => {
		const parsedParams = parseUrlQuery(urlParams);
		if (!Object.keys(parsedParams).length) {
			search();
			return;
		}
		dispatch(updateFilter(parsedParams));
	}, []);

	useEffect(() => {
		setActorState(actor);
		setTitleState(title);
		if (isFirstLoad.current) {
			isFirstLoad.current = false;
			return;
		}

		search();
	}, [actor, order, title]);

	const onClear = () => {
		setSearchParams({});
		dispatch(clearFilter());
	};

	return (
		<Stack>
			<Flex>
				<Stack flexGrow={1} justifyContent="center">
					<Input
						placeholder="Search by actor"
						size="md"
						value={actorState}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActorState(e.target.value)}
					/>
					<Input
						placeholder="Search by title"
						size="md"
						value={titleState}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleState(e.target.value)}
					/>
				</Stack>
				<Button onClick={searchOnClick} ml={4} variant="solid" colorScheme="teal">
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
