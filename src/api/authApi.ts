import axiosInstance from './axiosInstance';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface RegisterRequest {
  email:string;
  firstName: string;
  lastName:string;
  password: string;
}

interface RegisterResponse {
  email:string;
  firstName: string;
  lastName:string;
}

interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/auth/login', loginData);
  // Do BE trả về theo cấu trúc ApiResponse, cần bóc tách:
  return response.data.result;
};

export const signInGoogle = async (code: string) => {
  const response = await axiosInstance.post(`/auth/sign-in-google?code=${code}`)
  return response.data.result;
}

export const register = async (data: RegisterRequest) : Promise<RegisterResponse> => {
  const response = await axiosInstance.post('/users/registration',data);
  return response.data.result;
}

export const changePassword = async (data: UpdatePasswordRequest) : Promise<void>=> {
  const response = await axiosInstance.put('/users/change-password', data);
  return response.data.result;
}