import React from 'react';
import { Tree, Icon } from 'antd';

const InvitedUsersTree = ({ treeData }) => {
  const constructTree = (data, userId = null, link = 'userParentId') => {
    return data
      .filter(item => item[link] === userId)
      .map(item => ({
        ...item,
        key: item.userId,
        title: item.nickName,
        icon: <Icon type="user" />,
        children: constructTree(data, item.userId),
      }));
  };
  return (
    treeData.length > 0 && (
      <div>
        <span>Дерево приглашённых пользователей:</span>
        {<Tree style={{ display: 'inline-block' }} showIcon treeData={constructTree(treeData)} />}
      </div>
    )
  );
};

export default InvitedUsersTree;
