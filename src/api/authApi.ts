import axiosInstance from './axiosInstance';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/auth/login', loginData);
  // Do BE trả về theo cấu trúc ApiResponse, cần bóc tách:
  return response.data.result;
};
