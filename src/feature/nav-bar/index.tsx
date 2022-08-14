import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
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
			<Link to="/">Home</Link>
			<Flex gap={4}>
				<Link to="/login">Login</Link>
				<Button variant="link" colorScheme="red">
					Logout
				</Button>
			</Flex>
		</Flex>
	);
};

export default NavBar;
