import axiosInstance from '.';

type RegisterProps = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

type LoginProps = {
	email: string;
	password: string;
};

type ResType = {
	token?: string;
	status?: number;
	error?: any;
};

export const register = async (body: RegisterProps): Promise<ResType> => {
	const res = await axiosInstance.post<ResType>('users', body);

	return res.data;
};

export const login = async (body: LoginProps): Promise<ResType> => {
	const res = await axiosInstance.post<ResType>('sessions', body);

	return res.data;
};
