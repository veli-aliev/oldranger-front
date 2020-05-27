import React from 'react';
import TopicsList from '../Subsection/TopicsList';
import SubSectionItem from './SubSectionItem';
import sectionProps from './propTypes/sectionProps';

const SubSectionsList = ({ section, isLogin }) => {
  if (section.section.name === 'Только для пользователей' && !isLogin) {
    return null;
  }
  return (
    <TopicsList
      title={section.section.name}
      items={section.subsections}
      itemComponent={item => <SubSectionItem item={item} />}
    />
  );
};

SubSectionsList.propTypes = {
  section: sectionProps.isRequired,
};

export default SubSectionsList;
