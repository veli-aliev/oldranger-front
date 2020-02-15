import axios from 'axios';

const url = 'http://localhost:8888/api/chat';

export const getImage = async formData => {
  await axios.post(`${url}/image`, formData, {
    headers: { 'content-type': 'multipart/form-data' },
    withCredentials: true,
  });
};

export const isForbidden = async () => {
  await axios.get(`${url}/isForbidden`, { withCredentials: true });
};

export const getCurrentUser = async () => {
  await axios.get(`${url}/user`, { withCredentials: true });
};

export const getAllUsers = async () => {
  await axios.get(`${url}/users`);
};

export const getAllMessages = async page => {
  await axios.get(`${url}/messages?page=${page}`);
};
