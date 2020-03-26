import React, { useContext } from 'react';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import { BASE_IMG_URL, DEFAULT_AVATAR_PICTURE } from '../../constants';
import Context from '../Context';

const UserAvatar = ({ src, ...rest }) => {
  const { isLogin } = useContext(Context);
  const imgSrc = isLogin && src ? `${BASE_IMG_URL}${src}` : `${DEFAULT_AVATAR_PICTURE}`;
  return <Avatar src={imgSrc} {...rest} />;
};

UserAvatar.defaultProps = {
  src: null,
};

UserAvatar.propTypes = {
  src: PropTypes.string,
};

export default UserAvatar;
