import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useParams, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopicCommentsList from './TopicCommentsList';

const breadcrumbNameMap = {
  '/topic': 'Section Name',
  '/topic/1': 'Topic Name',
};

const TopicPage = ({ location }) => {
  // Fix breadcrumb when backend API to be finish.
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  const { topicId } = useParams();
  return (
    <div>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      <TopicCommentsList topicId={topicId} />
    </div>
  );
};

TopicPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(TopicPage);
