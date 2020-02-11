import React from 'react';
import PropTypes from 'prop-types';
import { StyledClickableItem } from './styled';

const ClickableItemWrapper = ({ children, clickHandler }) => {
  return <StyledClickableItem onClick={clickHandler}>{children}</StyledClickableItem>;
};

ClickableItemWrapper.propTypes = {
  children: PropTypes.element,
  clickHandler: PropTypes.func.isRequired,
};

ClickableItemWrapper.defaultProps = {
  children: <div>No item data</div>,
};

export default ClickableItemWrapper;
