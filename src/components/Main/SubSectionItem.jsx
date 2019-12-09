import React from 'react';
import { Link } from 'react-router-dom';
import { subSectionProps } from './propTypes';

const SubSectionItem = ({ item }) => {
  return (
    <div>
      <Link to={`/subsection/${item.id}`}>{item.name}</Link>
    </div>
  );
};

SubSectionItem.propTypes = {
  item: subSectionProps.isRequired,
};

export default SubSectionItem;
