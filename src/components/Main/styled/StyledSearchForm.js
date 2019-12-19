import styled from 'styled-components';
import { Select, Form as AntForm, Input } from 'antd';

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
`;
