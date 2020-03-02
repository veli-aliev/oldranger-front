import React, { useEffect, useState } from 'react';
import { Menu, Spin } from 'antd';
import { StyledMenu } from '../styled';
import queries from '../../../serverQueries/index';

const { SubMenu } = Menu;

const items = [
  {
    id: 0,
    parentId: -1,
    position: 0,
    tag: 'First tag',
    tagsHierarchy: [0],
  },
  {
    id: 1,
    parentId: -1,
    position: 0,
    tag: '1 tag',
    tagsHierarchy: [0],
  },
  {
    id: 2,
    parentId: -1,
    position: 0,
    tag: '2 tag',
    tagsHierarchy: [0],
  },
  {
    id: 3,
    parentId: -1,
    position: 0,
    tag: '3 tag',
    tagsHierarchy: [0],
  },
  {
    id: 4,
    parentId: -1,
    position: 0,
    tag: '4 tag',
    tagsHierarchy: [0],
  },
  {
    id: 5,
    parentId: -1,
    position: 0,
    tag: '5 tag',
    tagsHierarchy: [0],
  },
  {
    id: 6,
    parentId: -1,
    position: 0,
    tag: '6 tag',
    tagsHierarchy: [0],
  },
  {
    id: 7,
    parentId: 0,
    position: 0,
    tag: 'Under first',
    tagsHierarchy: [0],
  },
  {
    id: 8,
    parentId: 0,
    position: 0,
    tag: 'Under first',
    tagsHierarchy: [0],
  },
  {
    id: 9,
    parentId: 2,
    position: 0,
    tag: 'Under 2',
    tagsHierarchy: [0],
  },
  {
    id: 10,
    parentId: 2,
    position: 0,
    tag: 'Under 2, 10',
    tagsHierarchy: [0],
  },
  {
    id: 11,
    parentId: 10,
    position: 0,
    tag: 'Under 10',
    tagsHierarchy: [0],
  },
  {
    id: 12,
    parentId: 4,
    position: 0,
    tag: 'Under 4',
    tagsHierarchy: [0],
  },
  {
    id: 13,
    parentId: 11,
    position: 0,
    tag: 'Under 11',
    tagsHierarchy: [0],
  },
  {
    id: 14,
    parentId: 13,
    position: 0,
    tag: 'Under 13',
    tagsHierarchy: [0],
  },
];

const TagsMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  // TODO ждёмс реализации дерева на бэке
  useEffect(() => {
    setMenuItems(items);
    queries.createNode();
    queries.getTagsDtoTree();
  }, []);

  const buildTreeMenu = (tags, result = []) => {
    if (tags.length === 0) {
      return result;
    }
    const [first, ...rest] = tags;
    if (menuItems.some(el => el.parentId === first.id)) {
      return buildTreeMenu(rest, [
        ...result,
        <SubMenu
          onTitleClick={() => console.log(first.tagsHierarchy)}
          key={first.id}
          title={<span>{first.tag}</span>}
        >
          {buildTreeMenu(menuItems.filter(elem => elem.parentId === first.id))}
        </SubMenu>,
      ]);
    }
    return buildTreeMenu(rest, [
      ...result,
      <Menu.Item onClick={() => console.log(first.tagsHierarchy)} key={first.id}>
        {first.tag}
      </Menu.Item>,
    ]);
  };

  return (
    <StyledMenu>
      {menuItems.length > 0 ? (
        <Menu mode="inline">{buildTreeMenu(menuItems.filter(el => el.parentId === -1))}</Menu>
      ) : (
        <Spin />
      )}
    </StyledMenu>
  );
};

export default TagsMenu;
