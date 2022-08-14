import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

type Props = {
	isLoading: boolean;
};

const RowSpinner: React.FC<Props> = ({ isLoading }) => {
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
			justifyContent="center"
			alignItems="center"
			background="gray.200"
			opacity="0.7"
		>
			<Spinner />
		</Flex>
	);
};

export default RowSpinner;
