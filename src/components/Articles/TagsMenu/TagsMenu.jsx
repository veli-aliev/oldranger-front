import React, { useEffect, useState } from 'react';
import { Menu, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { StyledMenu } from '../styled';
import queries from '../../../serverQueries/index';

const { SubMenu } = Menu;

const TagsMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    queries.getTagsDtoTree().then(el => {
      setMenuItems(el);
    });
  }, []);

  const showArticles = tags => () => {
    history.push(`articles?tags=${tags.join('_')}`);
  };

  const buildTreeMenu = (tags, result = []) => {
    if (tags.length === 0) {
      return result;
    }
    const [first, ...rest] = tags;
    if (menuItems.some(el => el.parentId === first.id)) {
      return buildTreeMenu(rest, [
        ...result,
        <SubMenu
          onTitleClick={showArticles(first.tagsHierarchy)}
          key={first.id}
          title={<span>{first.tag}</span>}
        >
          {buildTreeMenu(menuItems.filter(elem => elem.parentId === first.id))}
        </SubMenu>,
      ]);
    }
    return buildTreeMenu(rest, [
      ...result,
      <Menu.Item onClick={showArticles(first.tagsHierarchy)} key={first.id}>
        {first.tag}
      </Menu.Item>,
    ]);
  };

  return (
    <StyledMenu>
      {menuItems.length > 0 ? (
        <Menu mode="inline">{buildTreeMenu(menuItems.filter(el => el.parentId === null))}</Menu>
      ) : (
        <Spin />
      )}
    </StyledMenu>
  );
};

export default TagsMenu;
