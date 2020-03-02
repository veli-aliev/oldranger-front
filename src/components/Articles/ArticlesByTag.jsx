import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { withRouter, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';
import { Column } from './styled';
import Article from './Article';

const useQuery = () => new URLSearchParams(useLocation().search);

const ArticlesByTag = () => {
  const query = useQuery();
  const [articles, setArticles] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (query.get('tags') === null) {
      // TODO получение статей без тегов
      console.log('Нужен апи для вывода статей без тегов');
    } else {
      const tags = query.get('tags').split('_');
      queries.getArticlesByTag(tags).then(el => {
        setArticles(el.content);
        setIsEmpty(el.empty);
      });
    }
  }, null);

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
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(ArticlesByTag);
