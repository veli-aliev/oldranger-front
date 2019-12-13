import React from 'react';
import { Select, Button, Input } from 'antd';
import { StyledWrapper, StyledInput, StyledSelect } from './styled/StyledSearchForm';

const InputGroup = Input.Group;
const { Option } = Select;

const SearchForm = () => {
  return (
    <StyledWrapper>
      <InputGroup compact>
        <StyledInput placeholder="Поиск по Форуму" name="search" type="text" />
        <StyledSelect defaultValue="Sign Up">
          <Option value="Sign Up">По темам</Option>
          <Option value="Sign In">По сообщениям</Option>
        </StyledSelect>
        <Button type="primary" icon="search">
          Искать
        </Button>
      </InputGroup>
    </StyledWrapper>
  );
};

export default SearchForm;
