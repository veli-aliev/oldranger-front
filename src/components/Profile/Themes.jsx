import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Spin } from 'antd';

import { withGetData } from '../hoc';

const Themes = ({ themes }) =>
  themes.length > 0 ? (
    <List
      itemLayout="horizontal"
      dataSource={themes}
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
    <h4>Тем нет</h4>
  );

Themes.propTypes = {
  themes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const ThemesPage = ({ isLoading, data: themes }) => {
  return isLoading ? <Spin /> : <Themes themes={themes} />;
};

ThemesPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withGetData(ThemesPage, 'api/topics');
