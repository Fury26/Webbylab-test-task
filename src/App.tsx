import React, { useEffect } from 'react';
import MoviesList from './feature/movie-list';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AddMovie from './feature/add-movie';
import MoviePage from './feature/movie-page';
import Register from './feature/register';
import Login from './feature/login';
import { Container, Stack } from '@chakra-ui/react';
import NavBar from './feature/nav-bar';

const App = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	useEffect(() => {
		window.addEventListener('loggout', logout);
		return () => {
			window.removeEventListener('logout', logout);
		};
	}, []);

	const isLogged = !!(token && token !== 'undefined');

	return (
		<Stack alignItems="center" overflow="hidden" height="100vh">
			<NavBar />
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				{isLogged && (
					<>
						<Route path="/" element={<MoviesList />} />
						<Route path="movie/new" element={<AddMovie />} />
						<Route path="movie/:id" element={<MoviePage />} />
					</>
				)}
				<Route path="*" element={<Navigate to={isLogged ? '/' : '/login'} />} />
			</Routes>
		</Stack>
	);
};

export default App;
