import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { subSectionProps } from './propTypes';
import ClickableItemWrapper from '../Subsection/ClickableItemWrapper';

const SubSectionItem = ({ item, history }) => {
  const clickSubsectionHandler = () => {
    history.push(`/subsection/${item.id}`);
  };

  return (
    <ClickableItemWrapper clickHandler={clickSubsectionHandler}>
      <strong>{item.name}</strong>
    </ClickableItemWrapper>
  );
};

SubSectionItem.propTypes = {
  item: subSectionProps.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(SubSectionItem);
