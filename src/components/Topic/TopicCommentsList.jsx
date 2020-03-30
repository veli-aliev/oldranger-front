import React, { useContext } from 'react';
import { Result, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import commentProps from './propTypes/commentProps';
import { StyledList, StyledTitle } from '../Main/styled';
import Context from '../Context';

const TopicCommentsList = ({
  messages,
  itemComponent,
  changePageHandler,
  total,
  page,
  replyButtonHandler,
  openNotification,
  title,
}) => {
  const { isLogin } = useContext(Context);
  if (!messages) {
    return (
      <Result status="500" title="500" subTitle="Извините на сервере возникла неожиданная ошибка" />
    );
  }
  if (messages.length > 0) {
    return (
      <StyledList
        className="comment-list"
        header={<StyledTitle>{title ? `${title}` : `Комментарии (${total})`}</StyledTitle>}
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={itemComponent}
        pagination={{
          current: page,
          onChange: currentPage => {
            changePageHandler(currentPage);
          },
          pageSize: 10,
          total,
        }}
      />
    );
  }
  return (
    <Result
      icon={<Icon type="smile" theme="twoTone" />}
      title="Комментариев нет!"
      extra={
        <Button onClick={isLogin ? replyButtonHandler : openNotification} type="primary">
          Добавить комментарий
        </Button>
      }
    />
  );
};

TopicCommentsList.propTypes = {
  messages: PropTypes.arrayOf(commentProps).isRequired,
  itemComponent: PropTypes.func.isRequired,
  changePageHandler: PropTypes.func,
  total: PropTypes.number,
  page: PropTypes.number,
  replyButtonHandler: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
  title: PropTypes.string,
};

TopicCommentsList.defaultProps = {
  total: 1,
  page: 1,
  changePageHandler: () => {},
  title: null,
};

export default TopicCommentsList;
