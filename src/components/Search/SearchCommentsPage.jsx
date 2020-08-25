import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import queries from '../../serverQueries';
import TopicCommentsList from '../Topic/TopicCommentsList';
import SearchCommentsItem from './SearchCommentsItem';
import { StyledTitle } from '../Main/styled';

class SearchCommentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentPage: 1,
      totalMessagesCounter: null,
      messageError: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getTopics(1);
  }

  getTopics = async page => {
    const { match } = this.props;
    this.setState({ isLoading: true });
    try {
      const res = await queries.searchByComments(match.params.searchRequest, page);
      this.setState({
        messages: res,
        totalMessagesCounter: res.countMessages,
        currentPage: page,
        isLoading: false,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.setState({ messageError: error.response.data, isLoading: false });
      }
    }
  };

  changePageHandler = page => {
    this.getTopics(page);
  };

  markWord = (str, key) => {
    const splitStr = str.split(key);
    return `${splitStr[0]} <Text mark>${key}</Text>${splitStr[1]}`;
  };

  render() {
    const { messages, currentPage, totalMessagesCounter, messageError, isLoading } = this.state;
    const {
      match: {
        params: { searchRequest },
      },
    } = this.props;

    const markedMessages =
      messages &&
      messages.map(curMessage => {
        const markedComment = this.markWord(curMessage.commentText, searchRequest);
        return { ...curMessage, commentText: markedComment };
      });
    if (isLoading) {
      return <Spin />;
    }
    return messages && messages.length > 0 ? (
      <div>
        <TopicCommentsList
          changePageHandler={this.changePageHandler}
          total={totalMessagesCounter}
          page={currentPage}
          messages={markedMessages}
          itemComponent={item => <SearchCommentsItem item={item} />}
          title={`Результы поиска в сообщениях по запросу: ${searchRequest}`}
        />
      </div>
    ) : (
      messageError && (
        <StyledTitle>
          {`${messageError} `}
          <i>{searchRequest}</i>
        </StyledTitle>
      )
    );
  }
}

SearchCommentsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(SearchCommentsPage);
