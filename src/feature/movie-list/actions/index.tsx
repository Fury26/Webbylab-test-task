import { AttachmentIcon, AddIcon } from '@chakra-ui/icons';
import { useToast, Flex, Button, ToastId } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { getCodeErrorMessage } from '../../../helpers/map-errors';
import { importMovies } from '../../../redux/movies';
import { useAppDispatch } from '../../../redux/store';
import UpdateSearch from './update-search-toast';

const Actions = () => {
	const dispatch = useAppDispatch();
	const toast = useToast({ title: 'Error!', isClosable: true, status: 'error', position: 'top', duration: 300000 });
	let toastId: ToastId = -1;
	const inputRef = useRef<HTMLInputElement>(null);

	const onImportClick = () => {
		inputRef.current?.click();
	};

	const closeToast = () => {
		toast.close(toastId);
	};

	const onImportFileLoad: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) {
			toast({ description: 'Something wriong with the file.' });
			return;
		}
		if (!file.size) {
			toast({ description: 'Empty file.' });
			return;
		}
		const formdata = new FormData();
		formdata.append('movies', file, 'movies.txt');
		e.target.value = '';
		dispatch(
			importMovies(formdata, {
				success: () => {
					toastId = toast({
						title: 'Import done!',
						status: 'success',
						description: <UpdateSearch onClose={closeToast} />,
					});
				},
				error: (err) => {
					toast({ description: getCodeErrorMessage(err.code) });
				},
			}),
		);
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
