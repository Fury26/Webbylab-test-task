import { extendTheme } from '@chakra-ui/react';

export const AppTheme = extendTheme({
	styles: {
		global: {
			margin: 0,
			padding: 0,
			outline: 0,
		},
	},

	breakpoints: {
		base: '0em',
		sm: '320px',
		md: '560px',
	},
	background: '#fff',
});
