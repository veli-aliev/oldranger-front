import React from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import SearchForm from './SearchForm';
import TopicsList from './TopicsList';
import SubSectionsList from './SubSectionsList';
import StyledMainPage from './styled/StyledMainPage';

axios.defaults.baseURL = 'http://localhost:8888/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rootSections: [],
    };
  }

  componentDidMount() {
    axios.get('allsectionsandsubsections').then(({ data }) => {
      this.setState({ rootSections: data });
    });
  }

  render() {
    const { rootSections } = this.state;
    return (
      <StyledMainPage>
        <SearchForm />
        <TopicsList />
        {rootSections.length > 0 ? (
          rootSections.map(section => (
            <SubSectionsList section={section} key={section.section.id} />
          ))
        ) : (
          <Spin />
        )}
      </StyledMainPage>
    );
  }
}

export default MainPage;
