import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';
import TopicCommentsList from '../Topic/TopicCommentsList';
import { StyledTopicMessages } from '../Topic/styled';
import SearchCommentsItem from './SearchCommentsItem';

class SearchCommentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      hasMore: true,
      page: 1,
    };
  }

  componentDidMount() {
    this.getTopics(0).then(data => {
      this.setState({ messages: data });
    });
  }

  getTopics = async page => {
    const { match } = this.props;
    return queries.searchByComments(match.params.searchRequest, page);
  };

  lazyLoadMore = () => {
    const { messages, page } = this.state;
    this.getTopics(page).then(data => {
      if (data.length === 0) {
        this.setState({ hasMore: false });
      } else {
        this.setState({ messages: [...messages, ...data], page: page + 1 });
      }
    });
  };

  render() {
    const { hasMore, messages } = this.state;
    const { match } = this.props;
    return (
      <StyledTopicMessages>
        <h1>
          Результы поиска в сообщениях по запросу: <b>{match.params.searchRequest}</b>
        </h1>
        <TopicCommentsList
          fetchMessages={this.lazyLoadMore}
          hasMore={hasMore}
          messages={messages}
          itemComponent={item => <SearchCommentsItem item={item} />}
        />
      </StyledTopicMessages>
    );
  }
}

SearchCommentsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(SearchCommentsPage);
