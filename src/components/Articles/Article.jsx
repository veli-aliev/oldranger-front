import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tag, Icon } from 'antd';
import { Link } from 'react-router-dom';
import {
  StyledArticle,
  StyledTitle,
  StyledArticleBody,
  StyledMeta,
  StyledTags,
  StyledUserInfo,
  StyledDate,
} from './styled/index';
import { dateToDateDistance } from '../../utils/index';

const { EditOutlined } = Icon;

const Article = props => {
  const { articleInfo } = props;
  return (
    <StyledArticle>
      <StyledTitle>
        {
          <Link style={{ color: 'black' }} to={`/article/${articleInfo.id}`}>
            {articleInfo.title}
          </Link>
        }
        {
          <Link to={`/article/${articleInfo.id}/update`}>
            <Button type="primary" icon={<EditOutlined />} />
          </Link>
        }
      </StyledTitle>
      <StyledArticleBody>{articleInfo.text}</StyledArticleBody>
      <StyledMeta>
        <StyledTags>
          {articleInfo.articleTags.map(tag => {
            return (
              <Tag key={tag.id} color="geekblue">
                {tag.name}
              </Tag>
            );
          })}
        </StyledTags>
        <div>
          <StyledUserInfo>{articleInfo.user ? articleInfo.user.username : null}</StyledUserInfo>
          <StyledDate>Создано {dateToDateDistance(articleInfo.date)} назад</StyledDate>
        </div>
      </StyledMeta>
    </StyledArticle>
  );
};

export default Article;

Article.propTypes = {
  articleInfo: PropTypes.shape({
    text: PropTypes.string,
    date: PropTypes.string,
    articleTags: PropTypes.array,
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};
