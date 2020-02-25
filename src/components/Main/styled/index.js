import styled from 'styled-components';

import { Select, Form as AntForm, Input, List } from 'antd';

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledList = styled(List)`
  margin-top: 20px;
  .ant-list-item {
    padding: 0;
    border-bottom: none;
  }
`;

export const StyledTitle = styled.h2`
  text-align: center;
`;

export const StyledInput = styled(Input)`
  &&& {
    width: 20%;
    text-align: left;
  }
`;

export const StyledSelect = styled(Select)`
  &&& {
    width: 15%;
  }
`;

export const StyledForm = styled(AntForm)`
  text-align: right;
  .ant-form-item-children-icon {
    display: none;
  }
`;

export const StyledMainPage = styled.div`
  padding: 20px 0;
`;
