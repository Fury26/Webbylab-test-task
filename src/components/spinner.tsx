import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

type Props = {
	isLoading: boolean;
	isOnTop?: boolean;
};

const LoadingSpinner: React.FC<Props> = ({ isLoading, isOnTop = false }) => {
	if (!isLoading) {
		return null;
	}
	return (
		<Flex
			position="absolute"
			left="0"
			top="0"
			height="100%"
			width="100%"
			zIndex={2}
			justifyContent="center"
			alignItems={isOnTop ? 'flex-start' : 'center'}
			background="gray.200"
			opacity="0.7"
			boxSizing="border-box"
			paddingTop={isOnTop ? 20 : 0}
		>
			<Spinner />
		</Flex>
	);
};

export default LoadingSpinner;
