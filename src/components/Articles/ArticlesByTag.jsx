/* eslint-disable */
import React from 'react';
import { Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';
import Article from './Article';

class ArticlesByTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      isEmpty: false,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { articleTag },
      },
    } = this.props;
    queries.getArticlesByTag(articleTag).then(el => {});
    const { tag } = this.props;
    // queries.getArticlesByTag(articleTag).then(el => {
    // queries.getArticlesByTag(tag).then(el => {
    //   this.setState({ articles: el.content, isEmpty: el.empty });
    // });
  }

  render() {
    const { articles, isEmpty } = this.state;
    const LoadOrNotFound = isEmpty ? <h1>Статей по этому тегу не найдено</h1> : <Spin />;
    return (
      <>
        {articles.length === 0 ? LoadOrNotFound : null}
        {articles
          // .filter(el => el.hideToAnon !== true)
          .reverse()
          .map(el => {
            return <Article key={el.id} articleInfo={el} />;
          })}
      </>
    );
  }
}

ArticlesByTag.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(ArticlesByTag);
