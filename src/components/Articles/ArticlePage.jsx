import React from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import Article from './Article';
import useArticleFetching from '../../hooks/useArticleFetching';
import { StyledCenteredContainer } from './styled';
import ArticleComment from './ArticleComment';
import CommentForm from '../forms/CommentForm';

const flatToTree = arr =>
  arr.reduce((acc, node, index, origArr) => {
    if (!node.parentId) {
      return [...acc, node];
    }
    const parentNode = origArr.find(item => item.id === node.parentId);
    (parentNode.nested = parentNode.nested || []).push(node);
    return acc;
  }, []);

const postComment = () => {};

const ArticlePage = () => {
  const { articleId } = useParams();

  const { error, loading, results } = useArticleFetching(articleId);

  if (loading || error) {
    return (
      <StyledCenteredContainer>
        {loading ? <Spin /> : 'Не удалось загрузить статью'}
      </StyledCenteredContainer>
    );
  }

  const { article, articleCommentDto } = results;
  const commentsTree = flatToTree(articleCommentDto);
  return (
    <>
      <Article articleInfo={article} />
      {commentsTree.map(comment => (
        <ArticleComment comment={comment} />
      ))}
      <CommentForm onSubmit={postComment} />
    </>
  );
};

export default ArticlePage;
