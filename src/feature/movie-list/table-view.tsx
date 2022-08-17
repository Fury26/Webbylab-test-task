import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody } from '@chakra-ui/react';
import React from 'react';
import LoadingSpinner from '../../components/spinner';
import { Movie } from '../../redux/movies/types';
import TableRow from './table-row';

type Props = {
	movies: Movie[];
	isLoading: boolean;
	onDelete: (movie: Movie) => void;
};

const TableView: React.FC<Props> = ({ movies, isLoading, onDelete }) => {
	return (
		<TableContainer border="1px" borderColor="gray.200" borderRadius="1rem" p={4} mt={5} position="relative">
			<LoadingSpinner isLoading={isLoading} isOnTop={true} />
			<Table variant="striped" colorScheme="teal">
				<TableCaption>Movies List</TableCaption>
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
