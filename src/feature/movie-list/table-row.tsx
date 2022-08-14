import { Flex, Td, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../redux/movies/types';
import { DeleteIcon } from '@chakra-ui/icons';
import LoadingSpinner from '../../components/spinner';

type Props = {
	movie: Movie;
	onDelete: (id: number | string) => any;
};
const TableRow: React.FC<Props> = ({ movie, onDelete }) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const onDeleteHandler = async () => {
		setIsLoading(true);
		await onDelete(movie.id);
		setIsLoading(false);
	};

	const showMoviePage = () => {
		navigate(`movie/${movie.id}`);
	};

	return (
		<Tr position="relative" onClick={showMoviePage}>
			<Td>{movie.title}</Td>
			<Td isNumeric>{movie.year}</Td>
			<Td>{movie.format}</Td>
			<Td>
				<LoadingSpinner isLoading={isLoading} />
				<Flex top={0} right={0} height="100%" justifyContent="center" cursor="pointer">
					<DeleteIcon color="red.500" onClick={onDeleteHandler} />
				</Flex>
			</Td>
		</Tr>
	);
};

export default TableRow;
