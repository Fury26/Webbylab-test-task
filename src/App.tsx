import React, { useEffect } from 'react';
import MoviesList from './feature/movie-list';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AddMovie from './feature/add-movie';
import MoviePage from './feature/movie-page';
import Register from './feature/register';
import Login from './feature/login';

const App = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const logout = () => {
		console.log('logouting');
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
	console.log('isLogged', isLogged);

	return (
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
	);
};

export default App;
