import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { AppTheme } from './styles/theme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';

const ROOT = document.querySelector('#root');
ReactDOM.render(
	<ReduxProvider store={store}>
		<ChakraProvider theme={AppTheme}>
			<App />
		</ChakraProvider>
	</ReduxProvider>,
	ROOT,
);
