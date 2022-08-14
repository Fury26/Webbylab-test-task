import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:8000/api/v1/',
	timeout: 5000,
});

axiosInstance.interceptors.response.use(
	(response) => {
		if (response.data.error?.fields?.token) {
			const loggoutEvent = new window.Event('loggout');
			window.dispatchEvent(loggoutEvent);
		}
		return response;
	},
	(error) => {
		if (error.data.error?.fields?.token) {
			const loggoutEvent = new window.Event('loggout');
			window.dispatchEvent(loggoutEvent);
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
