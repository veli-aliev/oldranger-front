import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Spin, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import SubSectionsList from '../Main/SubSectionsList';
import queries from '../../serverQueries';

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: null,
    };
  }

  componentDidMount() {
    this.loadSection();
  }

  loadSection = async () => {
    const { match } = this.props;
    const { sectionId } = match.params;
    const sections = await queries.getAllSections();
    const section = sections.filter(item => item.section.id === Number(sectionId))[0];
    this.setState({ section });
  };

  render() {
    const { section } = this.state;
    return section ? (
      <>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Главная</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/section/${section.section.id}`}>{section.section.name}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <SubSectionsList section={section} />
      </>
    ) : (
      <Spin />
    );
  }
}

Section.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(Section);
