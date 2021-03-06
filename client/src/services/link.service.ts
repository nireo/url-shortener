import axios from 'axios';
const baseUrl = '/link';

let token: string | null = null;

const getConfig = () => ({
  headers: { Authorization: token }
});

export const setToken = (newToken: string): void => {
  token = `bearer ${newToken}`;
};

export const createLink = async (original: string) => {
  const response = await axios.post(
    `${baseUrl}/create`,
    { original },
    getConfig()
  );
  return response.data;
};

export const deleteLink = async (uuid: string) => {
  const response = await axios.delete(`${baseUrl}/${uuid}`);
  return response.data;
};

export const getUserLinks = async () => {
  const response = await axios.get(`${baseUrl}`, getConfig());
  return response.data;
};

export const createAnonymous = async (original: string) => {
  const response = await axios.post(`${baseUrl}/anonymous`, { original });
  return response.data;
};
