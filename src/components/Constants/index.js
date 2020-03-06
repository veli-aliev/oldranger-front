import queries from '../../serverQueries';

const userRoles = {
  admin: 'ROLE_ADMIN',
  moderator: 'ROLE_MODERATOR',
};

const { BASE_URL } = queries;

export const BASE_URL_IMG = `${BASE_URL}img/`;

export const BASE_URL_SECURED_ALBUM = `${BASE_URL}api/securedPhoto/photoFromAlbum/`;

export const DEFAULT_COMMENT_PICTURE_URL = `${process.env.PUBLIC_URL}/defaultCommentPicture.jpg`;

export const DEFAULT_AVATAR_PICTURE_URL = `${process.env.PUBLIC_URL}/defaultAvatarPicture.png`;

export default userRoles;
