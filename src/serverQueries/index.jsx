import axios from 'axios';

class Queries {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:8888/';
  }

  logIn = async formData => {
    await axios.post('login', formData, {
      headers: { 'content-type': 'multipart/form-data' },
      withCredentials: true,
    });
  };

  logOut = async () => {
    await axios.post('/logout');
  };

  updateProfile = async formData => {
    const res = await axios.post('/api/updateProfile', formData, {
      withCredentials: true,
    });
    return res.data;
  };

  updateAvatar = async (values, userId) => {
    const res = await axios.post(`/api/avatar/${userId}`, values, {
      withCredentials: true,
    });
    return res.data;
  };

  getData = async page => {
    const res = await axios.get(page, {
      withCredentials: true,
    });
    return res.data;
  };

  getProfileData = async () => {
    const { data: profile } = await axios.get('/api/profile', {
      withCredentials: true,
    });
    const { data: id } = await axios.get('/api/getloggeduserid', {
      withCredentials: true,
    });
    return { ...profile, id };
  };

  getTopic = async (topicId, page = 0) => {
    const res = await axios.get(`/api/topic/${topicId}?page=${page}`, {
      withCredentials: true,
    });
    return res.data;
  };

  getAllSections = async () => {
    const res = await axios.get('/api/allsectionsandsubsections', {
      withCredentials: true,
    });
    return res.data;
  };

  getActualTopics = async () => {
    const res = await axios.get('/api/sectionsandactualtopics', {
      withCredentials: true,
    });
    return res.data;
  };
}

export default new Queries();
