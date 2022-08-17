import React from 'react';
import { Stack, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { deleteMovie } from '../../redux/movies';
import { RootState, useAppDispatch } from '../../redux/store';
import Actions from './actions';
import Filters from './filters';
import TableView from './table-view';
import { Movie } from '../../redux/movies/types';
import Pagination from './pagination';

const MoviesList = () => {
	const { movies, isLoading } = useSelector((state: RootState) => state.movies);
	const dispatch = useAppDispatch();
	const toast = useToast({ duration: 3000, position: 'top', isClosable: true });
	const onDelete = async (movie: Movie) => {
		await dispatch(
			deleteMovie(movie.id, {
				success: () => {
					toast({ title: 'Success', description: `Movie "${movie.title}" was deleted!`, status: 'success' });
				},
				error: () => {
					toast({ title: 'Error', description: 'Something went wrong', status: 'error' });
				},
			}),
		);
	};

	return (
		<Stack flexGrow={1} overflowY="auto" width="100%" alignItems="center" style={{ marginTop: 0 }}>
			<Stack mt={4} spacing={4} width="75%" maxWidth="1100px" pb={4}>
				<Filters />
				<Actions />
				<Pagination />
				<TableView movies={movies} isLoading={isLoading} onDelete={onDelete} />
				<Pagination />
			</Stack>
		</Stack>
	);
};

export default MoviesList;
