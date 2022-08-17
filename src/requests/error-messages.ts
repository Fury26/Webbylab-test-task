export const ERROR_MESSAGES = {
	fields: {
		title: {
			NOT_UNIQUE: 'Movies with this name already exist',
		},
		name: {
			REQUIRED: 'Username is required',
		},
		email: {
			NOT_UNIQUE: 'This email has already been used',
			AUTHENTICATION_FAILED: 'Wrong email or password',
			REQUIRED: 'Email is required',
		},
		year: {
			TOO_LOW: 'This date is to old',
		},
		password: {
			AUTHENTICATION_FAILED: 'Wrong email or password',
			REQUIRED: 'Password is required',
		},
	},
	code: {
		FILE_INVALID: 'Please check input file for errors',
	},
};

export type Errors = {
	fields: {
		title?: 'NOT_UNIQUE';
		name?: 'REQUIRED';
		year?: 'TOO_LOW';
		password?: 'AUTHENTICATION_FAILED' | 'REQUIRED';
		email?: 'NOT_UNIQUE' | 'AUTHENTICATION_FAILED' | 'REQUIRED';
	};
	code: string;
};
