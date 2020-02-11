import styled from 'styled-components';
import { Col } from 'antd';

export const StyledClickableItem = styled.div`
  width: 100%;
  padding: 16px;
  &:hover {
    background-color: #f0f5ff;
    cursor: pointer;
  }
`;

export const TopicItemInfo = styled(Col)`
  font-size: 16px;
`;

export const TopicItemMainInfo = styled(Col)`
  line-height: 6px;
`;

export const TopicItemTitleUser = styled.p`
  font-size: 12px;
`;
