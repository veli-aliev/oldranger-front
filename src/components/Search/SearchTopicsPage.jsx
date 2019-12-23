import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';
import TopicsList from '../Subsection/TopicsList';
import TopicsListItem from '../Subsection/TopicsListItem';

class SearchTopicsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      // hasMore: true,
      // page: 1,
    };
  }

  componentDidMount() {
    this.getTopics(0).then(data => this.setState({ topics: data.topics }));
  }

  getTopics = async page => {
    const { match } = this.props;
    return queries.searchByTopics(match.params.searchRequest, page);
  };

  render() {
    const { topics } = this.state;
    const { match } = this.props;
    return (
      <>
        <TopicsList
          itemComponent={item => <TopicsListItem topicData={{ topic: item }} />}
          items={topics}
          title={`Результы поиска в темах по запросу ${match.params.searchRequest}`}
        />
      </>
    );
  }
}

SearchTopicsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(SearchTopicsPage);
