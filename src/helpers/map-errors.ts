import { FormikErrors } from 'formik';
import { Errors, ERROR_MESSAGES } from '../requests/error-messages';

export const getResponseErrors = <T>(errors: Errors): FormikErrors<T> => {
	const err: FormikErrors<T> = {};
	Object.keys(errors.fields).forEach((_key) => {
		let key = _key;
		if (_key.includes('data')) {
			const startIdx = _key.indexOf('/');
			key = _key.substring(startIdx + 1);
		}
		// @ts-ignore
		const possibleMessages = ERROR_MESSAGES.fields[key];
		// @ts-ignore
		err[key] = possibleMessages[errors.fields[_key]];
	});

	return err;
};

export const getCodeErrorMessage = (codeErr: string) => {
	// @ts-ignore
	return ERROR_MESSAGES.code[codeErr];
};
