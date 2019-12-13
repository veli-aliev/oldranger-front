import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { StyledList, StyledTitle } from './styled/StyledSectionBlock';

const SectionBlock = ({ title, items }) => {
  return (
    <StyledList
      header={<StyledTitle>{title}</StyledTitle>}
      bordered
      dataSource={items}
      renderItem={item => <List.Item>{item}</List.Item>}
      size="large"
    />
  );
};

SectionBlock.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
};

SectionBlock.defaultProps = {
  title: '',
};

export default SectionBlock;
