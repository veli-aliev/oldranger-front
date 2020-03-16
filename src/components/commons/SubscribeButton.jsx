import React from 'react';
import { Button, message } from 'antd';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';

const SubscribeButton = ({ topicId, isSubscribed, setSubscribeState }) => {
  const handleClick = () => {
    if (!isSubscribed) {
      queries
        .addTopicToSubscriptions(topicId)
        .then(() => {
          setSubscribeState();
          message.success('Топик добавлен в подписки');
        })
        .catch(() => message.error('Что-то пошло не так, топик не добавлен'));
    } else {
      queries
        .deleteTopicFromSubscriptions(topicId)
        .then(() => {
          setSubscribeState();
          message.success('Топик удален из подписок');
        })
        .catch(() => message.error('Что-то пошло не так, топик не удален'));
    }
  };
  return <Button onClick={handleClick}>{isSubscribed ? 'Unsubscribe' : 'Subscribe'}</Button>;
};

SubscribeButton.propTypes = {
  topicId: PropTypes.number.isRequired,
  isSubscribed: PropTypes.bool,
  setSubscribeState: PropTypes.func.isRequired,
};

SubscribeButton.defaultProps = {
  isSubscribed: false,
};

export default SubscribeButton;
