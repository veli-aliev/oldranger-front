import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Spin } from 'antd';

import { withGetData } from '../hoc';

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

const SubscriptionsPage = ({ isLoading, data: subscriptions }) => {
  return isLoading ? <Spin /> : <Subscriptions subscriptions={subscriptions} />;
};

SubscriptionsPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withGetData(SubscriptionsPage, 'api/subscriptions');
