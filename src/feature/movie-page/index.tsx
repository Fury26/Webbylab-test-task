import { Box, Container, Flex, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadCurrentMovie } from '../../redux/movies';
import { useSelector } from 'react-redux';

const MoviePage = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const [isShowActors, setIsShowActors] = useState(false);
	const { currentMovie: movie } = useSelector((state: RootState) => state.movies);

	const currentId = params.id;

	useEffect(() => {
		if (!currentId) {
			return;
		}
		dispatch(loadCurrentMovie(currentId));
	}, []);

	if (!movie) {
		return null;
	}

	return (
		<Flex height="100vh" justifyContent="center">
			<Container marginTop={20}>
				<Stack direction="column" border="1px" borderColor="gray.200" borderRadius="1rem" padding={4} position="relative">
					<Box width="1px" height="100%" left="30%" position="absolute" backgroundColor="gray.200" top={0} />
					<Stack direction="row" backgroundColor="teal.200" p={1} borderRadius="0.25rem">
						<Box width="30%">Title</Box>
						<Text width="70%">{movie.title}</Text>
					</Stack>
					<Stack direction="row">
						<Box width="30%">Release Year</Box>
						<Text width="70%">{movie.year}</Text>
					</Stack>
					<Stack direction="row" backgroundColor="teal.200" p={1} borderRadius="0.25rem">
						<Box width="30%">Format</Box>
						<Text width="70%">{movie.format}</Text>
					</Stack>
					<Stack direction="row">
						<Box width="30%" position="relative">
							Actors
							<Box
								position="absolute"
								right="5%"
								top="0"
								onClick={() => setIsShowActors((prev) => !prev)}
								cursor="pointer"
								visibility={movie.actors?.length > 1 ? 'visible' : 'hidden'}
							>
								{isShowActors ? <TriangleUpIcon /> : <TriangleDownIcon />}
							</Box>
						</Box>
						<Stack>
							<Text>{movie.actors ? movie.actors[0].name : 'No actors added.'}</Text>
							{isShowActors &&
								movie.actors &&
								movie.actors.map((actor, idx) => (idx === 0 ? null : <Text key={actor.id}>{actor.name}</Text>))}
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Flex>
	);
};

export default MoviePage;
