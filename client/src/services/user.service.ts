import axios from 'axios';
const baseUrl = '/auth';

let token: string | null = null;

const getConfig = () => ({
  headers: { Authorization: token }
});

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

export const register = async (username: string, password: string) => {
  const response = await axios.post(`${baseUrl}/register`, {
    username,
    password
  });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${baseUrl}/login`, { username, password });
  return response.data;
};

export const removeUser = async () => {
  const response = await axios.delete(baseUrl, getConfig());
  return response.data;
};
