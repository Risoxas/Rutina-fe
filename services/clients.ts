import axiosInstance from "../utils/axiosInstance";
import { parseDatesInObject } from "../utils/tools";

export const search = async (filters: Object) => {
  const response = await axiosInstance.get("/clients/search", filters);
  return parseDatesInObject(response.data);
};

export const editClient = async (client: Object) => {
  return await axiosInstance.patch("/clients/update", client);
};

export const createClient = async (client: Object) => {
  return await axiosInstance.post("/clients/new", client);
};

export const getClientById = async (id: string) => {
  return await axiosInstance.get(`/clients/${id}`);
};
