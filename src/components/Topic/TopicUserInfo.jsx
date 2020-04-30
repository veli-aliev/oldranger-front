import React from 'react';
import { Col, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { StyledTopicUserInfo, UserInfoLeft } from './styled';
import userProps from './propTypes/userProps';
import AdminMenu from '../AdminMenu';
import { mapRoleToString } from '../../utils';

const TopicUserInfo = ({ user }) => {
  return (
    <StyledTopicUserInfo type="flex" justify="space-between" align="middle">
      <UserInfoLeft>
        <h3>
          <Link to={`/anotheruser/${user.id}`}>{user.nickName}</Link>
        </h3>
        <p>{`${user.firstName} ${user.lastName}`}</p>
      </UserInfoLeft>
      <Col>
        <p>
          <Icon type="user" /> {mapRoleToString(user.role.role)}
        </p>
        {user.messageCount && (
          <p>
            <Icon type="message" /> {user.messageCount}
          </p>
        )}
        <p>
          <Icon type="clock-circle" />{' '}
          {user.regDate
            ? `С нами ${formatDistanceToNow(parseISO(user.regDate), { locale: ru })}`
            : 'Неизвестно'}
        </p>
        <p>
          <AdminMenu user={user} />
        </p>
      </Col>
    </StyledTopicUserInfo>
  );
};

TopicUserInfo.propTypes = {
  user: userProps.isRequired,
};

export default TopicUserInfo;
