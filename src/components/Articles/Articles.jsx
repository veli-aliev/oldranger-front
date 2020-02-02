import React from 'react';
import TagsMenu from './TagsMenu/TagsMenu';
import { Container } from './styled/index';
import ArticlesByTag from './ArticlesByTag';

const Articles = () => {
  return (
    <Container>
      <TagsMenu />
      <ArticlesByTag tag="1" />
    </Container>
  );
};

export default Articles;
