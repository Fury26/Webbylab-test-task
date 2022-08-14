import axios from 'axios';
import { getAuthToken } from '../helpers/auth-helpers';

const axiosInstance = axios.create({
	baseURL: process.env.API_URL,
	timeout: 5000,
	headers: {
		Authorization: getAuthToken(),
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		if (response.data?.error?.fields?.token) {
			const loggoutEvent = new window.Event('loggout');
			window.dispatchEvent(loggoutEvent);
		}
		return response;
	},
	(error) => {
		if (error.data?.error?.fields?.token) {
			const loggoutEvent = new window.Event('loggout');
			window.dispatchEvent(loggoutEvent);
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
