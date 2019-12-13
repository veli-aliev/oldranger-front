import React from 'react';
import PropTypes from 'prop-types';
import { Comment, Tooltip, Avatar, Spin } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

import { withGetData } from '../hoc';

const Messages = ({ messages }) =>
  messages.length > 0 ? (
    messages.map(() => (
      <Comment
        author="Han Solo"
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully
            and efficiently.
          </p>
        }
        datetime={
          <Tooltip title={formatDistanceToNow(new Date(), { locale: ru, addSuffix: true })}>
            <span>{formatDistanceToNow(new Date(), { locale: ru, addSuffix: true })}</span>
          </Tooltip>
        }
      />
    ))
  ) : (
    <h4>Сообщений нет</h4>
  );

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const MessagesPage = ({ isLoading, data }) => {
  return isLoading ? <Spin /> : <Messages messages={data} />;
};

MessagesPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withGetData(MessagesPage, 'api/comments');
