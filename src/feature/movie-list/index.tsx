import React from 'react';
import { Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { deleteMovie, importMovies } from '../../redux/movies';
import { RootState, useAppDispatch } from '../../redux/store';
import Actions from './actions';
import Filters from './filters';
import TableView from './table-view';

const MoviesList = () => {
	const { movies, isLoading } = useSelector((state: RootState) => state.movies);
	const dispatch = useAppDispatch();

	const onDelete = async (id: number | string) => {
		await dispatch(deleteMovie(id));
	};

	return (
		<Stack flexGrow={1} overflowY="scroll" width="100%" alignItems="center" style={{ marginTop: 0 }}>
			<Stack mt={4} spacing={4} width="75%" maxWidth="1100px">
				<Filters />
				<Actions />

				<TableView movies={movies} isLoading={isLoading} onDelete={onDelete} />
			</Stack>
		</Stack>
	);
};

export default MoviesList;
