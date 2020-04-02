import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { message, Spin } from 'antd';
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
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getTopics(0);
  }

  getTopics = async page => {
    const { match } = this.props;
    this.setState({ isLoading: true });
    try {
      const res = await queries.searchByComments(match.params.searchRequest, page);
      this.setState({
        messages: res.commentDto,
        totalMessagesCounter: res.countMessages,
        currentPage: page,
        isLoading: false,
      });
    } catch {
      message.error('Похоже, что-то не так. Сообщения загрузить не удалось');
      this.setState({ isLoading: false });
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
    const { messages, currentPage, totalMessagesCounter, isLoading } = this.state;
    const {
      match: {
        params: { searchRequest },
      },
    } = this.props;
    const markedMessages = messages.map(curMessage => {
      const markedComment = this.markWord(curMessage.commentText, searchRequest);
      return { ...curMessage, commentText: markedComment };
    });
    if (isLoading) {
      return <Spin />;
    }
    return messages.length > 0 ? (
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
      <StyledTitle>
        Нет результатов по запросу <i>{searchRequest}</i>
      </StyledTitle>
    );
  }
}

SearchCommentsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(SearchCommentsPage);
