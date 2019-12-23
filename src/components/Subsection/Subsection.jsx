import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';
import TopicsList from './TopicsList';
import TopicsListItem from './TopicsListItem';

class Subsection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      name: '',
      hasMore: true,
      page: 1,
    };
  }

  componentDidMount() {
    this.getTopic(0).then(topics => {
      this.setState({ topics, name: topics[0].topic.subsection.name });
    });
  }

  getTopic = page => {
    const { match } = this.props;
    return queries.getSubsectionTopics(match.params.subsectionId, page);
  };

  lazyLoadMore = () => {
    const { topics, page } = this.state;
    this.getTopic(page).then(data => {
      if (data.length === 0) {
        this.setState({ hasMore: false });
      } else {
        this.setState({ topics: [...topics, ...data], page: page + 1 });
      }
    });
  };

  render() {
    const { topics, name, hasMore } = this.state;
    return (
      <TopicsList
        fetchMessages={this.lazyLoadMore}
        hasMore={hasMore}
        items={topics}
        title={name}
        itemComponent={item => <TopicsListItem topicData={item} />}
      />
    );
  }
}

Subsection.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(Subsection);
