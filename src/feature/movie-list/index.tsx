import { Button, Stack, useToast } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { deleteMovie, importMovies } from '../../redux/movies';
import { RootState, useAppDispatch } from '../../redux/store';
import Filters from './filters';
import TableView from './table-view';
const MoviesList = () => {
	const { movies, isLoading } = useSelector((state: RootState) => state.movies);
	const dispatch = useAppDispatch();
	const toast = useToast({ title: 'Error!', isClosable: true, variant: 'error', position: 'top', duration: 3000 });
	const inputRef = useRef<HTMLInputElement>(null);

	const onDelete = async (id: number | string) => {
		await dispatch(deleteMovie(id));
	};

	const onImportClick = () => {
		inputRef.current?.click();
	};

	const onImportFileLoad: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) {
			toast({ description: 'Something wriong with the file.' });
			return;
		}
		const formdata = new FormData();
		formdata.append('movies', file, 'movies.txt');
		dispatch(importMovies(formdata, { error: () => toast({ description: 'Someting went wrong, try again.' }) }));
	};

	return (
		<Stack flexGrow={1} overflowY="scroll" width="100%" alignItems="center">
			<Stack direction="column" mt={4} spacing={4} width="75%">
				<Filters />
				<Button colorScheme="teal" variant="soild" onClick={onImportClick}>
					Import
				</Button>
				<input style={{ display: 'none' }} type="file" accept=".txt,.scv" ref={inputRef} onChange={onImportFileLoad} />
				<TableView movies={movies} isLoading={isLoading} onDelete={onDelete} />
			</Stack>
		</Stack>
	);
};

export default MoviesList;
