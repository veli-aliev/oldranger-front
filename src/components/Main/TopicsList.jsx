import React from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import SectionBlock from './SectionBlock';
import TopicItem from './TopicItem';

axios.defaults.baseURL = 'http://localhost:8888/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

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
    axios.get('/sectionsandactualtopics').then(({ data }) => {
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
