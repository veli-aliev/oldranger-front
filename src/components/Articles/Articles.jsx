import React from 'react';
import { Route } from 'react-router-dom';
import TagsMenu from './TagsMenu/TagsMenu';
import { Container } from './styled/index';
import ArticlesByTag from './ArticlesByTag';
import SearchForm from './SearchForm';

const Articles = () => {
  return (
    <>
      <SearchForm />
      <Container>
        <TagsMenu />
        <Route exact path="/articles" component={ArticlesByTag} />
      </Container>
    </>
  );
};

export default Articles;
