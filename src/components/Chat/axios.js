import axios from 'axios';

const url = 'http://localhost:8888/api/chat';

export const getImage = async formData =>
  axios.post(`${url}/image`, formData, {
    headers: { 'content-type': 'multipart/form-data' },
    withCredentials: true,
  });

export const isForbidden = async () => axios.get(`${url}/isForbidden`, { withCredentials: true });

export const getCurrentUser = async () => axios.get(`${url}/user`, { withCredentials: true });

export const getAllUsers = async () => axios.get(`${url}/users`);

export const getAllMessages = async page => axios.get(`${url}/messages?page=${page}`);
