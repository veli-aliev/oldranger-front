import React from 'react';
import { List, Avatar } from 'antd';

const data = [1, 1, 1, 1, 1, 1, 1];

const Themes = () => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
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
  );
};

export default Themes;
