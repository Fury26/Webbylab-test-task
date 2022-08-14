import { Container, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMovies } from '../../redux/movies';
import { RootState, useAppDispatch } from '../../redux/store';
import Actions from './actions';
import TableView from './table-view';
const MoviesList = () => {
	const dispatch = useAppDispatch();

	const movies = useSelector((state: RootState) => state.movies.movies);

	useEffect(() => {
		console.log('get movies');

		dispatch(getMovies({}));
	}, []);

	return (
		<Container>
			<Stack direction="column" mt={4} spacing={4}>
				<Actions />
				<TableView movies={movies} />
			</Stack>
		</Container>
	);
};

export default MoviesList;
