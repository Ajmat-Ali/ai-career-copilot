import { api } from "./axios";

export const sendIdTokenToBackend = async (idToken: string, name?: string) => {
  const response = await api.post(`api/v1/auth/session`, { idToken, name });
  return response.data;
};
