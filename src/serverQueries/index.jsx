import axios from 'axios';

class Queries {
  constructor() {
    axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:8888/';
    axios.defaults.withCredentials = true;
  }

  logIn = async formData => {
    await axios.post('login', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  };

  logOut = async () => {
    await axios.get('api/logout');
  };

  updateProfile = async formData => {
    const res = await axios.post('/api/updateProfile', formData);
    return res.data;
  };

  updateAvatar = async values => {
    const res = await axios.post('/api/avatar/set', values);
    return res.data;
  };

  createArticle = async ({ title, text, tagsId, isHideToAnon }) => {
    const tags = tagsId.length > 0 ? `&tagsId=${tagsId.join('&tagsId=')}` : '';
    const res = await axios.post(
      `/api/article/add?title=${title}&text=${text}&isHideToAnon=${isHideToAnon.toString()}${tags}`
    );
    return res.data;
  };

  getArticlesByTag = async tag => {
    const res = await axios.get(`/api/article/tag?tag_id=${tag}`);
    return res.data;
  };

  getData = async page => {
    const res = await axios.get(page);
    return res.data;
  };

  getProfileTopics = async page => {
    const res = await axios.get(`/api/topics/?page=${page}`);
    return res.data;
  };

  getProfileComments = async page => {
    const res = await axios.get(`/api/comments/?page=${page}`);
    return res.data;
  };

  getTopic = async (topicId, offset, limit) => {
    const res = await axios.get(`/api/topic/${topicId}?pos=${offset}&limit=${limit}`);
    return res.data;
  };

  getProfileSubscriptions = async page => {
    const res = await axios.get(`/api/subscriptions/?page=${page}`);
    return res.data;
  };

  getProfileData = async () => {
    const { data: profile } = await axios.get('/api/profile');
    const { data: id } = await axios.get('/api/getloggeduserid');
    return { ...profile, id };
  };

  getSubsectionTopics = async (subsectionId, page = 0) => {
    const res = await axios.get(
      `/api/subsection/${subsectionId}?dateTime=2099-01-01%2000%3A00%3A00&page=${page}`
    );
    return res.data;
  };

  getAllSections = async () => {
    const res = await axios.get('/api/allsectionsandsubsections');
    return res.data;
  };

  getActualTopics = async () => {
    const res = await axios.get('/api/actualtopics');
    return res.data;
  };

  searchByComments = async (searchQuery, page) => {
    const res = await axios.get(`/api/searchComments?finderTag=${searchQuery}&page=${page}`);
    return res.data;
  };

  searchByTopics = async searchQuery => {
    const res = await axios.get(`/api/searchTopics?finderTag=${searchQuery}&node=0&nodeValue=0`);
    return res.data;
  };

  addComment = async newComment => {
    const res = await axios.post('/api/comment/add', newComment);
    return res.data;
  };

  getInviteCode = async () => {
    const res = await axios.post('/api/token/invite', {});
    return res.data;
  };

  sendInviteCode = async values => {
    const res = await axios.post('/api/token/invite/bymail', values);
    return res.data;
  };

  registrationUser = async values => {
    const res = await axios.post('/api/token/confirm/bymail', values);
    return res.data;
  };

  uploadPhoto = async photo => {
    // пока бекенд не готов, загружаем фото в первый и единственный альбом
    const res = await axios.post('/api/photos/1', photo);
    return res.data.small;
  };

  getAlbums = async () => {
    const res = await axios.get('/api/albums');
    return res.data;
  };

  createNewAlbum = async data => {
    const res = await axios.post(`/api/albums?albumTitle=${data}`);
    return res.data;
  };

  deleteAlbum = async id => {
    const res = await axios.delete(`/api/albums/${id}`);
    return res.data;
  };

  getPhotosFromAlbum = async id => {
    const res = await axios.get(`/api/albums/getPhotos/${id}`);
    return res.data;
  };

  addPhotosInAlbum = async (albumId, photosArr) => {
    const res = await axios.post(`/api/photos/${albumId}`, photosArr);
    return res.data;
  };

  deletePhotoFromAlbum = async photoId => {
    const res = await axios.delete(`/api/photos/${photoId}`);
    return res.data;
  };

  getUsersList = async (page, query) => {
    const res = await axios.get('/api/admin/users', {
      params: { page: Number(page), query },
    });
    return res.data;
  };

  getImage = async formData => {
    const res = await axios.post('/api/chat/image', formData, {
      headers: { 'content-type': 'multipart/form-data' },
      withCredentials: true,
    });
    return res.data;
  };

  isForbidden = async () => {
    const res = await axios.get('/api/chat/isForbidden', { withCredentials: true });
    return res.data;
  };

  getCurrentUser = async () => {
    const res = await axios.get('/api/chat/user', { withCredentials: true });
    return res.data;
  };

  getAllUsers = async () => {
    const res = await axios.get('/api/chat/users');
    return res.data;
  };

  getAllMessages = async page => {
    const res = await axios.get(`/api/chat/messages?page=${page}`);
    return res;
  };
}

export default new Queries();
