import React from 'react';
import { Comment, Avatar, Form, Button, List, Input, message } from 'antd';
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import queries from '../../../../serverQueries';

const { TextArea } = Input;

const PhotoCommentsHeader = styled.div`
  padding: 10px 0;
`;
const PhotoCommentsMain = styled.div`
  height: 100%;
`;
const PhotoCommentsCommentsWrapper = styled.div`
  height: ${props => (props.commentPage ? 'auto' : '62%')};
  overflow: ${props => (props.commentPage ? 'auto' : 'scroll')};
  overflow-x: ${props => (props.commentPage ? 'auto' : 'hidden')};
`;
const PhotoCommentsIputWrapper = styled.div`
  height: ${props => (props.commentPage ? 'auto' : '38%')};
`;
const CustomTextArea = styled(TextArea)`
  max-height: ${props => (props.commentPage ? 'auto' : '85px')};
  overflow: ${props => (props.commentPage ? 'auto' : 'scroll')};
  overflow-x: ${props => (props.commentPage ? 'auto' : 'hidden')};
`;

class PhotoCommentsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      submitting: false,
      value: '',
    };
  }

  componentDidMount() {
    const { photoId } = this.props;
    this.loadPhotoComments(photoId);
  }

  loadPhotoComments = async id => {
    const comments = await queries.loadPhotoComments(id);
    const commentsToShow = [];
    comments.commentDto.content.forEach(comment => {
      const {
        author: { nickName, avatar },
        commentText,
        commentDateTime,
      } = comment;
      const actions = [];
      // проверка на права для удаления / редактирования &&  actions =  [
      //                 <span key="comment-delete">
      //         <Tooltip title="Удалить">
      //           <Icon
      //               type="delete"
      //               onClick={this.deletePhotoComment}
      //           />
      //         </Tooltip>
      //       </span>,
      //                 <span key="comment-edit">
      //         <Tooltip title="Редактировать">
      //           <Icon
      //               type="edit"
      //               onClick={this.editPhotoComment}
      //           />
      //         </Tooltip>
      //       </span>,
      //             ]
      commentsToShow.push({
        author: nickName,
        // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        avatar: avatar.original,
        content: <p>{commentText}</p>,
        datetime: formatDistance(new Date(commentDateTime), Date.now(), {
          addSuffix: true,
          locale: ru,
        }),
        actions,
      });
    });
    this.setState({ comments: commentsToShow });
    return null;
  };

  handleSubmitComment = async () => {
    const { photoId } = this.props;
    const { value } = this.state;
    if (!value) {
      return;
    }
    try {
      this.setState({
        submitting: true,
      });
      const commentData = { value, photoId };
      await queries.addCommentToPhoto(commentData);
      await this.loadPhotoComments(photoId);
      this.setState({
        submitting: false,
      });
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error.response);
      message.error('что-то пошло не так');
      this.setState({
        submitting: false,
      });
    }
  };

  handleChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const CommentList = ({ comments }) => (
      <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
      />
    );

    const Editor = ({ onChange, onSubmit, submitting, value, commentPage }) => (
      <div>
        <Form.Item>
          <CustomTextArea rows={4} onChange={onChange} value={value} commentPage={commentPage} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            Add Comment
          </Button>
        </Form.Item>
      </div>
    );
    const { comments, submitting, value } = this.state;
    const { commentPage } = this.props;
    return (
      <PhotoCommentsMain commentPage={commentPage}>
        <PhotoCommentsCommentsWrapper commentPage={commentPage}>
          <PhotoCommentsHeader>Выведем сюда инфу о юзере?</PhotoCommentsHeader>
          {comments.length > 0 && <CommentList data={comments} />}
        </PhotoCommentsCommentsWrapper>
        <PhotoCommentsIputWrapper commentPage={commentPage}>
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmitComment}
                submitting={submitting}
                value={value}
                commentPage={commentPage}
              />
            }
          />
        </PhotoCommentsIputWrapper>
      </PhotoCommentsMain>
    );
  }
}

PhotoCommentsComponent.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  commentPage: PropTypes.bool.isRequired,
  photoId: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default PhotoCommentsComponent;
