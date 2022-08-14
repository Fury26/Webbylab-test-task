import { Container, Stack } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { deleteMovie } from '../../redux/movies';
import { RootState, useAppDispatch } from '../../redux/store';
import Filters from './filters';
import TableView from './table-view';
const MoviesList = () => {
	const { movies, isLoading } = useSelector((state: RootState) => state.movies);
	const dispatch = useAppDispatch();

	const onDelete = async (id: number | string) => {
		await dispatch(deleteMovie(id));
	};

	return (
		<Container>
			<Stack direction="column" mt={4} spacing={4}>
				<Filters />
				<TableView movies={movies} isLoading={isLoading} onDelete={onDelete} />
			</Stack>
		</Container>
	);
};

export default MoviesList;
