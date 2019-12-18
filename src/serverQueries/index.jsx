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
    await axios.post('logout');
  };

  getData = async page => {
    const res = await axios.get(page, {
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

  getTopic = async (topicId, page = 0) => {
    const res = await axios.get(`/api/topic/${topicId}?page=${page}&limit=5`, {
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
