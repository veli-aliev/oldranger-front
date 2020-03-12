import React from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import Article from './Article';
import useArticleFetching from '../../hooks/useArticleFetching';
import { StyledCenteredContainer } from './styled';

const ArticleUpdate = () => {
  const { articleId } = useParams();

  const { error, loading, results } = useArticleFetching(articleId);

  if (loading || error) {
    return (
      <StyledCenteredContainer>
        {loading ? <Spin /> : 'Не удалось загрузить статью'}
      </StyledCenteredContainer>
    );
  }

  const { article } = results;
  return (
    <>
      <Article articleInfo={article} />
    </>
  );
};

export default ArticleUpdate;
