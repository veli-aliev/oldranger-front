import axios from 'axios';
import { BASE_URL } from '../../constants';

const url = `${BASE_URL}api/chat`;

export const getImage = async formData => {
  const response = await axios.post(`${url}/image`, formData, {
    headers: { 'content-type': 'multipart/form-data' },
    withCredentials: true,
  });
  return response;
};

export const isForbidden = async () => {
  const response = await axios.get(`${url}/isForbidden`, { withCredentials: true });
  return response;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${url}/user`, { withCredentials: true });
  return response;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${url}/users`);
  return response;
};

export const getAllMessages = async page => {
  const response = await axios.get(`${url}/messages?page=${page}`);
  return response;
};
