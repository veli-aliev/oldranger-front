import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Spin } from 'antd';
import axios from 'axios';

const Subscriptions = ({ subscriptions }) =>
  subscriptions.length > 0 ? (
    <List
      itemLayout="horizontal"
      dataSource={subscriptions}
      renderItem={() => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<a href="https://ant.design">Title</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  ) : (
    <h4>Подписок нет</h4>
  );

Subscriptions.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const getSubscriptions = async (changeSubscriptionsState, changeLoadState) => {
  const res = await axios.get('http://localhost:8888/api/subscriptions', {
    withCredentials: true,
  });
  changeSubscriptionsState(res.data);
  changeLoadState(true);
};

const SubscriptionsPage = () => {
  const [isLoaded, changeLoadState] = useState(false);
  const [subscriptions, changeSubscriptionsState] = useState({});

  useEffect(() => {
    getSubscriptions(changeSubscriptionsState, changeLoadState);
  }, []);

  return isLoaded ? <Subscriptions subscriptions={subscriptions} /> : <Spin />;
};

export default SubscriptionsPage;
