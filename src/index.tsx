import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { AppTheme } from './styles/theme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<BrowserRouter>
		<ReduxProvider store={store}>
			<ChakraProvider theme={AppTheme}>
				<App />
			</ChakraProvider>
		</ReduxProvider>
	</BrowserRouter>,
);
