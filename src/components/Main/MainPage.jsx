import React from 'react';
import { Spin } from 'antd';
import TopicsList from './TopicsList';
import SubSectionsList from './SubSectionsList';
import StyledMainPage from './styled/StyledMainPage';
import queries from '../../serverQueries';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rootSections: [],
    };
  }

  componentDidMount() {
    queries.getAllSections().then(sections => {
      this.setState({ rootSections: sections });
    });
  }

  render() {
    const { rootSections } = this.state;
    return (
      <StyledMainPage>
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
