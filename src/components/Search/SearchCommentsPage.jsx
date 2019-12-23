import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';
import TopicCommentsList from '../Topic/TopicCommentsList';
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

  markWord = (str, key) => {
    const splitStr = str.split(key);
    return `${splitStr[0]} <Text mark>${key}</Text>${splitStr[1]}`;
  };

  render() {
    const { hasMore, messages } = this.state;
    const { match } = this.props;
    const markedMessages = messages.map(message => {
      const markedComment = this.markWord(message.commentText, match.params.searchRequest);
      return { ...message, commentText: markedComment };
    });
    return (
      <div>
        <TopicCommentsList
          fetchMessages={this.lazyLoadMore}
          hasMore={hasMore}
          messages={markedMessages}
          itemComponent={item => <SearchCommentsItem item={item} />}
          title={`Результы поиска в сообщениях по запросу: ${match.params.searchRequest}`}
        />
      </div>
    );
  }
}

SearchCommentsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(SearchCommentsPage);
