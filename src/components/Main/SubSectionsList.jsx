import React from 'react';
import SectionBlock from './SectionBlock';
import SubSectionItem from './SubSectionItem';
import sectionProps from './propTypes/sectionProps';

const SubSectionsList = ({ section }) => {
  const subSections = section.subsections.map(subsection => <SubSectionItem item={subsection} />);
  return <SectionBlock title={section.section.name} items={subSections} />;
};

SubSectionsList.propTypes = {
  section: sectionProps.isRequired,
};

export default SubSectionsList;
