import React from 'react';
import { Avatar, Icon } from 'antd';
import PropTypes from 'prop-types';

const UserInfoBlock = ({ user }) => {
  return (
    <div>
      <p>
        <Avatar shape="square" size={96} icon="user" />
      </p>
      <p>
        <strong>{user.nickName}</strong>
      </p>
      <p className="message--user-info">
        <span className="message--user-info__item">
          <Icon type="crown" /> {user.roleName}
        </span>
        <span className="message--user-info__item">
          <Icon type="message" /> {user.messageCount} сообщений
        </span>
        <span className="message--user-info__item">
          <Icon type="clock-circle" /> {user.timeSinceRegistration}
        </span>
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
