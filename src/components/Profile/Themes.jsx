import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Spin } from 'antd';
import axios from 'axios';

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

const getThemes = async (changeThemesState, changeLoadState) => {
  const res = await axios.get('http://localhost:8888/api/topics', {
    withCredentials: true,
  });
  changeThemesState(res.data);
  changeLoadState(true);
};

const ThemesPage = () => {
  const [isLoaded, changeLoadState] = useState(false);
  const [themes, changeThemesState] = useState({});

  useEffect(() => {
    getThemes(changeThemesState, changeLoadState);
  }, []);

  return isLoaded ? <Themes themes={themes} /> : <Spin />;
};

export default ThemesPage;
