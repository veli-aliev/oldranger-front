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
    const res = await axios.get(`/api/article/tag?tag_id=${tag}&page=1`, {
      withCredentials: true,
    });
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

  getTopic = async (topicId, page, limit) => {
    const res = await axios.get(`/api/topic/${topicId}?page=${page}&limit=${limit}`);
    console.log('TopicAndTopicDTO: ', res.data);
    return res.data;
  };

  getProfileSubscriptions = async page => {
    const res = await axios.get(`/api/subscriptions/?page=${page}`);
    return res.data;
  };

  getProfileData = async () => {
    const { data } = await axios.get('/api/currentUser');
    return data;
  };

  getUserProfileData = async () => {
    const { data } = await axios.get('/api/profile');
    return data;
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
    const formData = new FormData();
    formData.set('idTopic', newComment.idTopic);
    formData.set('idUser', newComment.idUser);
    formData.set('text', newComment.text);

    if (newComment.answerID) {
      formData.set('answerID', newComment.answerID);
    }

    if (newComment.image1) {
      formData.set('image1', newComment.image1.originFileObj, newComment.image1.name);
    }

    if (newComment.image2) {
      formData.set('image2', newComment.image2.originFileObj, newComment.image2.name);
    }

    const res = await axios.post('/api/comment/add', formData);
    return res.data;
  };

  updateComment = async editingComment => {
    const { commentId } = editingComment;
    const url = `/api/comment/update?commentID=${commentId}`;
    const formData = new FormData();
    formData.set('idTopic', editingComment.idTopic);
    formData.set('idUser', editingComment.idUser);
    formData.set('text', editingComment.text);

    if (editingComment.image1) {
      formData.set('image1', editingComment.image1.originFileObj, editingComment.image1.name);
    }

    if (editingComment.image2) {
      formData.set('image2', editingComment.image2.originFileObj, editingComment.image2.name);
    }

    const res = await axios.put(url, formData);

    return res.status;
  };

  deleteComment = async commentId => {
    const res = await axios.delete(`/api/comment/delete/${commentId}`);
    return res.status;
  };

  getInviteCode = async () => {
    const res = await axios.post('/api/token/invite', {});
    return res.data;
  };

  sendInviteCode = async values => {
    const res = await axios.post(
      `/api/token/invite/bymail?mail=${values.mail}`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  };

  registrationUserAdd = async key => {
    const res = await axios.post(
      `/api/registration?key=${key}`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  };

  registrationUser = async values => {
    const res = await axios.post('/api/token/confirm/bymail', values);
    return res.data;
  };

  // uploadPhoto = async photo => {
  //   // пока бекенд не готов, загружаем фото в первый и единственный альбом
  //   const res = await axios.post('/api/photos/1', photo, {
  //     withCredentials: true,
  //   });
  //   const res = await axios.post('/api/photos/1', photo);
  //   return res.data.small;
  // };

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
      params: { page: Number(page), ...(query ? { query } : {}) },
    });
    return res.data;
  };

  getUserById = async id => {
    const res = await axios.get(`/api/admin/getUser/${id}`);
    return res.data;
  };

  getUsersTree = async (id, deep) => {
    const res = await axios.get(`/api/usersTree/user/${id}/${deep}`);
    return res.data;
  };

  blackListRequest = async (id, dateUnblock = new Date()) => {
    const res = await axios.post('/api/admin/blocking', {
      id,
      dateUnblock: new Date(dateUnblock).toISOString(),
      // Не работает, потому что на беке ещё не смержили ветку с dev
    });
    return res.data;
  };

  sendMailToAllUsers = async params => {
    const res = await axios.post('/api/admin/sendMail', params);
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

  createNewTopic = async formData => {
    const res = await axios.post('/api/topic/new', formData, {
      headers: { 'content-type': 'multipart/form-data' },
      withCredentials: true,
    });
    return res;
  };
}

export default new Queries();
