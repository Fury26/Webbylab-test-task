import {
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogCloseButton,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
	AlertDialog,
	useDisclosure,
	Box,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

type Props = {
	onConfirm: (e: React.MouseEvent) => any;
	children: React.ReactNode;
	header?: string;
	description?: string;
};

const DialogPopup: React.FC<Props> = ({ onConfirm, children, header, description }) => {
	const { isOpen, onOpen, onClose } = useDisclosure({});
	const cancelRef = useRef(null);

	const confirmHandler = (e: React.MouseEvent) => {
		onClose();
		onConfirm(e);
	};

	return (
		<>
			<Box onClick={onOpen}>{children}</Box>
			<AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen}>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>{header || 'Are you sure?'}</AlertDialogHeader>
					<AlertDialogCloseButton />
					{description && <AlertDialogBody>{description}</AlertDialogBody>}
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							No
						</Button>
						<Button colorScheme="red" ml={3} onClick={confirmHandler}>
							Yes
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default DialogPopup;
