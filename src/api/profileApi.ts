import axiosInstance from "./axiosInstance";

export interface ProfileUpdateResponse {
  email: string;
  firstName: string;
  lastName: string;
  phone: string
}

export interface ProfileDetailResponse {
  email: string;
  firstName: string;
  lastName: string;
  phone: string
}


export const getProfile = async () : Promise<ProfileDetailResponse> => {
  const response = await axiosInstance.get("/profile/info");
  return response.data.result
}

export const updateProfile = async (data: ProfileUpdateResponse) : Promise<void> => {
  const response = await axiosInstance.put("/profile/update", data);
  return response.data.result
}
