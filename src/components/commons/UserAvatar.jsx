import React, { useContext } from 'react';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import { BASE_URL_IMG, DEFAULT_AVATAR_PICTURE_URL } from '../Constants';
import Context from '../Context';

const UserAvatar = ({ path, ...rest }) => {
  const { isLogin } = useContext(Context);
  const imgSrc = isLogin ? `${BASE_URL_IMG}${path}` : `${DEFAULT_AVATAR_PICTURE_URL}`;
  return <Avatar src={imgSrc} {...rest} />;
};

UserAvatar.propTypes = {
  path: PropTypes.string.isRequired,
};

export default UserAvatar;
