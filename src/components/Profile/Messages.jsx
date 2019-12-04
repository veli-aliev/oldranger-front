import React from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const comments = [1, 1, 1, 1, 1, 1, 1];

const Messages = () => {
  return comments.map(() => (
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
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  ));
};

export default Messages;
