import { AttachmentIcon, AddIcon } from '@chakra-ui/icons';
import { useToast, Flex, Button } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { importMovies } from '../../redux/movies';
import { useAppDispatch } from '../../redux/store';

const Actions = () => {
	const dispatch = useAppDispatch();
	const toast = useToast({ title: 'Error!', isClosable: true, variant: 'error', position: 'top', duration: 3000 });
	const inputRef = useRef<HTMLInputElement>(null);

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
		<Flex>
			<Button colorScheme="teal" variant="solid" onClick={onImportClick} leftIcon={<AttachmentIcon />}>
				Import
			</Button>
			<input style={{ display: 'none' }} type="file" accept=".txt,.scv" ref={inputRef} onChange={onImportFileLoad} />

			<Link to="movie/new">
				<Button ml={4} variant="solid" colorScheme="teal" leftIcon={<AddIcon />}>
					Add
				</Button>
			</Link>
		</Flex>
	);
};

export default Actions;
