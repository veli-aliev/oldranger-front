import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';
import { Column } from './styled';
import Article from './Article';

const ArticlesByTag = ({ location: { search: tagsStr } }) => {
  const [articles, setArticles] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!tagsStr) {
      queries.getArticlesByTag().then(el => {
        setArticles(el.content);
        setIsEmpty(el.empty);
      });
    } else {
      const tagsArr = tagsStr.split('=')[1].split('_');
      queries.getArticlesByTag(tagsArr).then(el => {
        setArticles(el.content);
        setIsEmpty(el.empty);
      });
    }
  }, [tagsStr]);

  const LoadOrNotFound = isEmpty ? <h1>Статей по этому тегу не найдено</h1> : <Spin />;
  return (
    <Column>
      {articles.length === 0 ? LoadOrNotFound : null}
      {articles.reverse().map(el => {
        return <Article key={el.id} articleInfo={el} />;
      })}
    </Column>
  );
};

ArticlesByTag.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default ArticlesByTag;
