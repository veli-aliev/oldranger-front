import React from 'react';
import { Spin } from 'antd';
import Context from '../Context';
import Article from './Article';
import { StyledCenteredContainer } from './styled';
import ArticleComment from './ArticleComment';
import CommentForm from '../forms/CommentForm';
import queries from '../../serverQueries';
import { createTreeBuildFunction } from '../../utils';

const buildCommentTreeFromFlat = createTreeBuildFunction('id', 'parentId');

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      article: null,
      commentsTree: [],
      flatComments: [],
      commentWithOpenEditor: null,
    };
  }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle = async () => {
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    const { articleId } = this.props.match.params;
    try {
      this.setState({
        loading: true,
      });
      const { article, articleCommentDto = [] } = await queries.getArticleById({ id: articleId });
      this.setState({
        loading: false,
        error: null,
        article,
        commentsTree: buildCommentTreeFromFlat(articleCommentDto),
        flatComments: articleCommentDto,
      });
    } catch (err) {
      this.setState({
        loading: false,
        error: err,
      });
    }
  };

  handleCommentFormSubmit = (commentId, eventType = 'reply') => async ({ text }) => {
    try {
      const fn = eventType === 'edit' ? this.editComment : this.postComment;
      await fn(commentId, text);
      //  TODO
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  postComment = async (answerId, text) => {
    const {
      article: { id },
    } = this.state;

    const {
      user: { id: idUser },
    } = this.context;

    const params = { idArticle: id, idUser };
    // на бэкенде валится запрос если поле null
    if (answerId) {
      params.answerId = answerId;
    }
    const comment = await queries.createArticleComment(text, params);
    this.setState(
      ({ flatComments }) => ({
        flatComments: [...flatComments, comment],
      }),
      this.rebuildTree
    );
  };

  editComment = async (commentId, text) => {
    const {
      article: { id: idArticle },
    } = this.state;

    const {
      user: { id: idUser },
    } = this.context;

    const updatedComment = await queries.updateArticleComment(text, {
      idArticle,
      idUser,
      commentID: commentId,
    });
    this.setState(({ flatComments }) => {
      const comments = flatComments.filter(({ id }) => id !== commentId);
      return {
        flatComments: [...comments, updatedComment],
      };
    }, this.rebuildTree);
  };

  // TODO был другой способ, но там вылез баг, не было времени сделать нормально
  rebuildTree = () => {
    this.setState(({ flatComments }) => ({
      commentsTree: buildCommentTreeFromFlat(flatComments),
    }));
  };

  handleOpenEditorClick = id => () => {
    this.setState({ commentWithOpenEditor: id });
  };

  handleDeleteComment = commentId => async () => {
    await queries.deleteArticleComment(commentId);
    this.setState(
      ({ flatComments }) => ({ flatComments: flatComments.filter(({ id }) => id !== commentId) }),
      this.rebuildTree
    );
  };

  renderCommentForm() {
    const { isLogin } = this.context;
    return isLogin ? (
      <CommentForm onSubmit={this.handleCommentFormSubmit()} />
    ) : (
      <div>Только авторизированные пользователи могут оставлять комментарии</div>
    );
  }

  render() {
    const {
      error,
      loading,
      article,
      commentsTree,
      flatComments,
      commentWithOpenEditor,
    } = this.state;

    if (error || loading) {
      return (
        <StyledCenteredContainer>
          {loading ? <Spin /> : 'Не удалось загрузить статью'}
        </StyledCenteredContainer>
      );
    }

    const commentsCount = flatComments ? flatComments.length : 0;

    return (
      <>
        <Article articleInfo={article} />
        <div>Комментарии ({commentsCount})</div>
        {commentsTree.map(comment => (
          <ArticleComment
            commentWithOpenEditor={commentWithOpenEditor}
            key={comment.key}
            comment={comment}
            onOpenEditorClick={this.handleOpenEditorClick}
            onSubmitCommentForm={this.handleCommentFormSubmit}
            onDeleteComment={this.handleDeleteComment}
          />
        ))}
        {this.renderCommentForm()}
      </>
    );
  }
}
ArticlePage.contextType = Context;

ArticlePage.propTypes = {};

ArticlePage.defaultProps = {};

export default ArticlePage;
