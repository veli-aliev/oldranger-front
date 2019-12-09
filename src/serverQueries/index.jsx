import axios from 'axios';

class Queries {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:8888/';
  }

  login = async formData => {
    await axios.post('login', formData, {
      headers: { 'content-type': 'multipart/form-data' },
      withCredentials: true,
    });
  };

  getData = async page => {
    const res = await axios.get(`${page}`, {
      withCredentials: true,
    });
    return res.data;
  };

  getProfileData = async () => {
    const res = await axios.get('/api/profile', {
      withCredentials: true,
    });
    return res.data;
  };
}

export default new Queries();
