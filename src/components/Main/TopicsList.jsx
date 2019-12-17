import React from 'react';
import { Spin } from 'antd';
import SectionBlock from './SectionBlock';
import TopicItem from './TopicItem';
import queries from '../../serverQueries';

class TopicsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: {},
      topics: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    queries.getActualTopics().then(data => {
      this.setState({ topics: data[0].topics, section: data[0].section, isLoading: false });
    });
  }

  render() {
    // const { sectionId } = this.props;
    const { topics, section, isLoading } = this.state;
    const topicsComponent = topics.map(topic => <TopicItem topicData={topic} />);
    return isLoading ? <Spin /> : <SectionBlock title={section.name} items={topicsComponent} />;
  }
}

// TopicsList.propTypes = {
//   sectionId: PropTypes.number.isRequired,
// };

export default TopicsList;
