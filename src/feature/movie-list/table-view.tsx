import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react';
import React from 'react';
import { deleteMovie } from '../../redux/movies';
import { Movie } from '../../redux/movies/types';
import { useAppDispatch } from '../../redux/store';
import TableRow from './table-row';

type Props = {
	movies: Movie[];
};

const TableView: React.FC<Props> = ({ movies }) => {
	const dispatch = useAppDispatch();

	const onDelete = async (id: number | string) => {
		await dispatch(deleteMovie(id));
	};

	return (
		<TableContainer border="1px" borderColor="gray.200" borderRadius="1rem" p={4} mt={5}>
			<Table variant="striped" colorScheme="teal">
				<TableCaption>Movies</TableCaption>
				<Thead>
					<Tr>
						<Th>Title</Th>
						<Th isNumeric>Release Year</Th>
						<Th>Format</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{movies.map((movie) => (
						<TableRow movie={movie} key={movie.id} onDelete={onDelete} />
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default TableView;
