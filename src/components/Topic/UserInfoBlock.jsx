import React from 'react';
import { Avatar, Icon } from 'antd';
import PropTypes from 'prop-types';
import { UserInfoItem } from './styled';

const UserInfoBlock = ({ user }) => {
  return (
    <div>
      <p>
        <Avatar shape="square" size={96} icon="user" />
      </p>
      <p>
        <strong>{user.nickName}</strong>
      </p>
      <p>
        <UserInfoItem>
          <Icon type="crown" /> {user.roleName}
        </UserInfoItem>
        <UserInfoItem>
          <Icon type="message" /> {user.messageCount} сообщений
        </UserInfoItem>
        <UserInfoItem>
          <Icon type="clock-circle" /> {user.timeSinceRegistration}
        </UserInfoItem>
      </p>
    </div>
  );
};

UserInfoBlock.propTypes = {
  user: PropTypes.shape({
    nickName: PropTypes.string,
    roleName: PropTypes.string,
    messageCount: PropTypes.number,
    timeSinceRegistration: PropTypes.string,
  }).isRequired,
};

export default UserInfoBlock;
