import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
	const onLoggout = () => {
		window.dispatchEvent(new window.Event('loggout'));
	};

	return (
		<Flex
			width="100vw"
			boxSizing="border-box"
			py={5}
			px={10}
			background="blue.200"
			justifyContent="space-between"
			alignContent="center"
		>
			<Link to="/" reloadDocument>
				Home
			</Link>
			<Flex gap={4}>
				<Link to="/login">Login</Link>
				<Button variant="link" colorScheme="red" onClick={onLoggout}>
					Logout
				</Button>
			</Flex>
		</Flex>
	);
};

export default NavBar;
