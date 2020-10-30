import React from 'react';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import Context from '../Context';
import Article from './Article';
import { StyledCenteredContainer } from './styled';
import ArticleComment from './ArticleComment';
import CommentForm from '../forms/CommentForm';
import queries from '../../serverQueries';
import { createTreeBuildFunction } from '../../utils';
import ArticlesPhotoAlbum from './ArticlesPhotoAlbum';
import './Article.css';

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
      eventType: 'reply',
      albumId: null,
      photos: [],
      currentId: 0,
    };
  }

  componentDidMount() {
    this.fetchArticle();
  }

  updateData = files => {
    this.setState({
      photos: files,
    });
  };

  fetchArticle = async () => {
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    const { articleId } = this.props.match.params;
    try {
      this.setState({
        loading: true,
      });
      const { article, articleCommentDto = [] } = await queries.getArticleById({ id: articleId });
      const { photoAlbum } = article;
      this.setState({
        loading: false,
        error: null,
        article,
        commentsTree: buildCommentTreeFromFlat(articleCommentDto),
        flatComments: articleCommentDto,
        albumId: photoAlbum ? photoAlbum.id : null,
      });
    } catch (err) {
      this.setState({
        loading: false,
        error: err,
      });
    }
  };

  handleCommentFormSubmit = (commentId, parentId) => async ({ text }) => {
    const { eventType } = this.state;
    try {
      const fn = eventType === 'edit' ? this.editComment : this.postComment;
      await fn(commentId, text, parentId);
      //  TODO
      // eslint-disable-next-line no-empty
    } catch (error) {
      console.log(error);
    }
  };

  postComment = async (answerId, commentText) => {
    const {
      article: { id },
      photos,
    } = this.state;

    const {
      user: { id: idUser },
    } = this.context;

    const params = { idArticle: id, idUser };
    // на бэкенде валится запрос если поле null
    if (answerId) {
      params.answerId = answerId;
    }

    const data = {
      idArticle: id,
      idUser,
      commentText,
      image1: photos[0],
      image2: photos[1],
    };
    const transformComment = newComment => {
      const formData = new FormData();
      formData.set('idArticle', newComment.idArticle);
      formData.set('idUser', newComment.idUser);
      formData.set('commentText', newComment.commentText);

      if (newComment.answerID) {
        formData.set('answerID', newComment.answerID);
      }

      if (newComment.image1) {
        formData.set('image1', newComment.image1.originFileObj, newComment.image1.name);
      }

      if (newComment.image2) {
        formData.set('image2', newComment.image2.originFileObj, newComment.image2.name);
      }
      return formData;
    };

    const comment = await queries.createArticleComment(transformComment(data), params);

    this.setState(
      ({ flatComments }) => ({
        flatComments: [...flatComments, comment],
      }),
      () => {
        this.handleOpenEditorClick(null)(); // убираем окно редактирования коментария
        this.rebuildTree(); // перестраиваем дерево коментов
      }
    );
  };

  editComment = async (commentId, commentText, parentId) => {
    const { photos } = this.state;
    const {
      article: { id: idArticle },
    } = this.state;

    const {
      user: { id: idUser },
    } = this.context;

    const data = {
      idArticle,
      idUser,
      commentID: commentId,
      commentText,
      photoIdList: [],
    };

    if (parentId !== -1) {
      data.answerId = parentId;
    }

    photos.forEach((file, index) => {
      if (file.originFileObj) {
        data[`image${index + 1}`] = file;
      } else {
        data.photoIdList.push(file.uid * -1);
      }
    });

    const updateArticleCommentFetch = editData => {
      // TODO Перенести в компонент
      const formData = new FormData();
      formData.set('idArticle', editData.idArticle);
      formData.set('idUser', editData.idUser);
      formData.set('commentText', editData.commentText);
      formData.set('photoIdList', JSON.stringify(editData.photoIdList));
      formData.set('commentID', editData.commentID);
      if (editData.image1) {
        formData.set('image1', editData.image1.originFileObj, editData.image1.name);
      }
      if (editData.image2) {
        formData.set('image2', editData.image2.originFileObj, editData.image2.name);
      }
      return formData;
    };

    const updatedComment = await queries.updateArticleComment(updateArticleCommentFetch(data));

    this.setState(
      ({ flatComments }) => {
        const comments = flatComments.reduce(
          (acc, comment) =>
            comment.id === commentId ? [...acc, updatedComment] : [...acc, comment],
          []
        );
        return {
          flatComments: comments,
        };
      },
      () => {
        this.handleOpenEditorClick(null)(); // убираем окно редактирования коментария
        this.rebuildTree(); // перестраиваем дерево коментов
      }
    );
  };

  // TODO был другой способ, но там вылез баг, не было времени сделать нормально
  rebuildTree = () => {
    this.setState(({ flatComments }) => ({
      commentsTree: buildCommentTreeFromFlat(flatComments),
    }));
  };

  handleOpenEditorClick = (id, eventType) => () => {
    this.setState({
      commentWithOpenEditor: id,
      eventType,
      currentId: id,
    });
  };

  handleDeleteComment = (commentId, parentId) => async () => {
    await queries.deleteArticleComment(commentId);

    /* после отправки запроса на удаление комента в ответе не приходят обновленные коменты 
    поэтому для обновления ui проходимся по массиву коментов
    смотрим если на комент ссылаются другие мы меняем ему статус на deleted:true, и содержание на Комментарий был удален 
    дублирую работу на сервере без отправления запроса
    */
    // вспомошательная функция проверки наличия  подкоментов
    const hasChildrenComments = (comments, id) => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].parentId === id) {
          return true;
        }
      }
      return false;
    };

    const createNewCommentsList = ar => {
      return ar.reduce((acc, comment) => {
        if (comment.id !== commentId) {
          return [...acc, comment];
        }
        if (comment.id === commentId && hasChildrenComments(ar, commentId)) {
          return [...acc, { ...comment, deleted: true, commentText: 'Комментарий был удален' }];
        }
        return acc;
      }, []);
    };

    const clearComments = comments => {
      if (parentId === -1) {
        return comments;
      }
      /*
      функция для проверки вложенных коментов если: 
      комент удален 
        комент удален 
          КОМЕНТ -------------> нажимаем удалить то вся ветка больше не показывается 
      */
      const iter = (ar, id) => {
        const index = ar.findIndex(el => el.id === id);
        // если у комента нет подкоментов и этот комент со статусом deleted
        if (!hasChildrenComments(ar, id) && ar[index].deleted) {
          // если у комента не родителей то возвращаем обновленный лист коментов
          if (ar[index].parentId === -1) {
            return [...ar.slice(0, index), ...ar.slice(index + 1)];
          }
          return iter([...ar.slice(0, index), ...ar.slice(index + 1)], ar[index].parentId); // если родители есть рекурсивно проверяем на пустые коменты
        }
        return ar;
      };
      return iter(comments, parentId);
    };

    this.setState(
      ({ flatComments }) => ({ flatComments: clearComments(createNewCommentsList(flatComments)) }),
      () => {
        this.handleOpenEditorClick(null)(); // убираем окно редактирования коментария
        this.rebuildTree(); // перестраиваем дерево коментов
      }
    );
  };

  renderCommentForm() {
    const { isLogin } = this.context;
    const { photos } = this.state;
    return isLogin ? (
      <CommentForm
        onSubmit={this.handleCommentFormSubmit()}
        updateData={this.updateData}
        photos={photos}
      />
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
      albumId,
      currentId,
    } = this.state;

    if (error || loading) {
      return (
        <StyledCenteredContainer>
          {loading ? <Spin /> : 'Не удалось загрузить статью'}
        </StyledCenteredContainer>
      );
    }

    const commentsCount = flatComments ? flatComments.length : 0;
    const { eventType } = this.state;
    return (
      <>
        <Article articleInfo={article} />
        {albumId ? <ArticlesPhotoAlbum photoAlbumId={albumId} /> : null}
        <div>Комментарии ({commentsCount})</div>
        {commentsTree.map(item => {
          return (
            <ArticleComment
              className="ant-comment"
              commentWithOpenEditor={commentWithOpenEditor}
              key={item.key}
              comment={item}
              commentsTree={commentsTree}
              onOpenEditorClick={this.handleOpenEditorClick}
              onSubmitCommentForm={this.handleCommentFormSubmit}
              onDeleteComment={this.handleDeleteComment}
              eventType={eventType}
              updateData={this.updateData}
              currentId={currentId}
              onClickComment={this.onClickComment}
            />
          );
        })}
        {this.renderCommentForm()}
      </>
    );
  }
}
ArticlePage.contextType = Context;

ArticlePage.propTypes = {};

ArticlePage.defaultProps = {};

export default withRouter(ArticlePage);
