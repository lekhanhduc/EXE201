import type { ApiResponse } from "../type/ApiResponse";
import type { SignInResponse } from "../type/Auth";
import axiosInstance from "./axiosInstance";

export const SignInWithGoogle = async (code: string): Promise<ApiResponse<SignInResponse>> => {
    const response = await axiosInstance.post(
        `/auth/sign-in-google?code=${encodeURIComponent(code)}`,
        {},
        {
            headers: {
                "Accept": "application/json",
            },
        }
    );
    return response.data;
};