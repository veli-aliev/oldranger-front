import styled from 'styled-components';
import { Input, Select } from 'antd';

export const StyledInput = styled(Input)`
  &&& {
    width: 20%;
    text-align: left;
  }
`;

export const StyledSelect = styled(Select)`
  width: 15%;
`;

export const StyledWrapper = styled.div`
  text-align: right;
`;
