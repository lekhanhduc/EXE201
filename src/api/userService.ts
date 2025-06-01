import axios from "axios";
import type { User } from "../type/User";

const API_URL = "http://localhost:8080/api/users";

export const getUserById = (id: number) => {
  return axios.get<User>(`${API_URL}/${id}`);
};

export const createUser = (user: Omit<User, "id">) => {
  return axios.post<User>(API_URL, user);
};
