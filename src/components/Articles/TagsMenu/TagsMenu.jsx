/* eslint-disable */
import React, { useEffect } from 'react';
import queries from '../../../serverQueries/index';
import { Menu } from 'antd';

const TagsMenu = () => {
  // TODO ждёмс реализации дерева на бэке
  useEffect(() => {
    queries.createNode();
    queries.getTagsDtoTree();
  }, []);
  return (
    <h1>ku</h1>
  );
}

export default TagsMenu;
