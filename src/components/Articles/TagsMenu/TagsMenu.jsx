import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Spin } from 'antd';
import { useHistory, withRouter } from 'react-router-dom';
import { StyledMenu, TagsItem } from '../styled';
import queries from '../../../serverQueries/index';

const TagsMenu = ({ location }) => {
  const [menuItems, setMenuItems] = useState([]);
  const history = useHistory();
  const [activeId, setActiveId] = useState(null);

  // парсим урл если есть теги введены устанавливаем в стейт id активного тега
  const addFocusTag = tags => {
    const href = location.search.split('=');
    const hierarchy = String(href[href.length - 1]);
    const activeTag = tags.find(tag => hierarchy === tag.tagsHierarchy.join('_')) || {};
    setActiveId(activeTag.id);
  };

  useEffect(() => {
    queries.getTagsDtoTree().then(el => {
      setMenuItems(el);
      addFocusTag(el);
    });
  }, []);

  useEffect(() => {
    addFocusTag(menuItems);
  }, [location]);

  const showArticles = (tags, id) => () => {
    history.push(`articles?tags=${tags.join('_')}`);
    setActiveId(id);
  };

  const buildTreeMenu = (tags, result = []) => {
    if (tags.length === 0) {
      return result;
    }
    const [first, ...rest] = tags;
    if (menuItems.some(el => el.parentId === first.id)) {
      return buildTreeMenu(rest, [
        ...result,
        <li key={`item-${first.id}`}>
          <TagsItem
            onClick={showArticles(first.tagsHierarchy, first.id)}
            active={first.id}
            activeId={activeId}
            pad={first.tagsHierarchy.length}
          >
            {first.tag}
          </TagsItem>
          <ul>{buildTreeMenu(menuItems.filter(elem => elem.parentId === first.id))}</ul>
        </li>,
      ]);
    }
    return buildTreeMenu(rest, [
      ...result,
      <li key={`item-${first.id}`}>
        <TagsItem
          active={first.id}
          activeId={activeId}
          onClick={showArticles(first.tagsHierarchy, first.id)}
          pad={first.tagsHierarchy.length}
        >
          {first.tag}
        </TagsItem>
      </li>,
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

TagsMenu.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string.isRequired }).isRequired,
};

export default withRouter(TagsMenu);
