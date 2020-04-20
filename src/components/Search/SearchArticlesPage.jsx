import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';
import { Column } from '../Articles/styled';
import Article from '../Articles/Article';
import { StyledTitle } from '../Main/styled';

class SearchArticlesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    this.getArticles(1).then(data => {
      if (data) this.setState({ articles: data.articleList });
    });
  }

  getArticles = async page => {
    const { match } = this.props;
    return queries.searchByArticles(match.params.searchRequest, page);
  };

  render() {
    const { articles } = this.state;
    const {
      match: {
        params: { searchRequest },
      },
    } = this.props;
    return (
      <Column>
        {articles.length > 0 ? (
          articles
            .filter(article => article.title === searchRequest)
            .map(article => {
              return <Article key={article.id} articleInfo={article} isPreview />;
            })
        ) : (
          <StyledTitle>
            Нет результатов по запросу <i>{searchRequest}</i>
          </StyledTitle>
        )}
        {console.log(articles)}
      </Column>
    );
  }
}

SearchArticlesPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(SearchArticlesPage);
