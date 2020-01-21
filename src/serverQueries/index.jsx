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

  updateAvatar = async values => {
    const res = await axios.post('/api/avatar/set', values, {
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

  getProfileTopics = async page => {
    const res = await axios.get(`/api/topics/?page=${page}`, {
      withCredentials: true,
    });
    return res.data;
  };

  getProfileComments = async page => {
    const res = await axios.get(`/api/comments/?page=${page}`, {
      withCredentials: true,
    });
    return res.data;
  };

  getTopic = async (topicId, offset, limit) => {
    const res = await axios.get(`/api/topic/${topicId}?pos=${offset}&limit=${limit}`, {
      withCredentials: true,
    });
    return res.data;
  };

  getProfileSubscriptions = async page => {
    const res = await axios.get(`/api/subscriptions/?page=${page}`, {
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

  getSubsectionTopics = async (subsectionId, page = 0) => {
    const res = await axios.get(
      `/api/subsection/${subsectionId}?dateTime=2099-01-01%2000%3A00%3A00&page=${page}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  };

  getAllSections = async () => {
    const res = await axios.get('/api/allsectionsandsubsections', {
      withCredentials: true,
    });
    return res.data;
  };

  getActualTopics = async () => {
    const res = await axios.get('/api/actualtopics', {
      withCredentials: true,
    });
    return res.data;
  };

  searchByComments = async (searchQuery, page) => {
    const res = await axios.get(`/api/searchComments?finderTag=${searchQuery}&page=${page}`, {
      withCredentials: true,
    });
    return res.data;
  };

  searchByTopics = async searchQuery => {
    const res = await axios.get(`/api/searchTopics?finderTag=${searchQuery}&node=0&nodeValue=0`, {
      withCredentials: true,
    });
    return res.data;
  };

  addComment = async newComment => {
    const res = await axios.post('/api/comment/add', newComment, {
      withCredentials: true,
    });
    return res.data;
  };

  getInviteCode = async () => {
    const res = await axios.post(
      '/api/token/invite',
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  };

  sendInviteCode = async values => {
    const res = await axios.post('/api/token/invite/bymail', values, {
      withCredentials: true,
    });
    return res.data;
  };

  registrationUser = async values => {
    const res = await axios.post('/api/token/confirm/bymail', values, {
      withCredentials: true,
    });
    return res.data;
  };

  uploadPhoto = async photo => {
    // пока бекенд не готов, загружаем фото в первый и единственный альбом
    const res = await axios.post('/api/photos/1', photo, {
      withCredentials: true,
    });
    return res.data.small;
  };
}

export default new Queries();
