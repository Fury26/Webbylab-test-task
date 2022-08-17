import React from 'react';
import { Stack, Flex, Button, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getCorrectMovieParams } from '../../../helpers/get-correct-movie-params';
import { getMovies } from '../../../redux/movies';
import { useAppDispatch, RootState } from '../../../redux/store';

type Props = {
	onClose: () => void;
};

const UpdateSearch: React.FC<Props> = ({ onClose }) => {
	const dispatch = useAppDispatch();
	const filters = useSelector((state: RootState) => state.movies.filters);
	const onUpdate = () => {
		const params = getCorrectMovieParams({ ...filters, offset: 0 });
		dispatch(getMovies(params));
		onClose();
	};
	return (
		<Stack>
			<Text>Do you want reload search?</Text>
			<Flex gap={4}>
				<Button colorScheme="blue" variant="solid" onClick={onUpdate}>
					Yes
				</Button>
			</Flex>
		</Stack>
	);
};

export default UpdateSearch;
