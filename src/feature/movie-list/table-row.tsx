import { Flex, Td, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../redux/movies/types';
import { DeleteIcon } from '@chakra-ui/icons';
import LoadingSpinner from '../../components/spinner';
import DialogPopup from '../../components/alert-dialog';

type Props = {
	movie: Movie;
	onDelete: (movie: Movie) => any;
};
const TableRow: React.FC<Props> = ({ movie, onDelete }) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const onDeleteHandler = async (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsLoading(true);
		await onDelete(movie);
		setIsLoading(false);
	};

	const showMoviePage = () => {
		navigate(`movie/${movie.id}`);
	};

	return (
		<Tr position="relative">
			<Td cursor="pointer" onClick={showMoviePage}>
				{movie.title}
			</Td>
			<Td isNumeric>{movie.year}</Td>
			<Td>{movie.format}</Td>
			<Td>
				<LoadingSpinner isLoading={isLoading} />
				<DialogPopup description={`Delete movie "${movie.title}"?`} onConfirm={onDeleteHandler}>
					<Flex top={0} right={0} height="100%" justifyContent="center" cursor="pointer">
						<DeleteIcon color="red.500" />
					</Flex>
				</DialogPopup>
			</Td>
		</Tr>
	);
};

export default TableRow;
