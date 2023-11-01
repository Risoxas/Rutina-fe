import axiosInstance from "../utils/axiosInstance";

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/users/signin", {
    email,
    password,
  });
  return response.data;
};

export const signup = async (email: string, password: string) => {
  const response = await axiosInstance.post("/users/signup", {
    email,
    password,
  });
  return response.data;
};
