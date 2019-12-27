import styled from 'styled-components';
import { Button, Col, List, Row } from 'antd';

export const StyledTopicCommentItem = styled(List.Item)`
  margin-top: 12px;
  min-height: 100px;
  align-items: flex-start;
`;

export const StyledTopicUserInfo = styled(Row)`
  min-height: 120px;
  min-width: 300px;
`;

export const UserInfoLeft = styled(Col)`
  text-align: center;
`;

export const ReplyFloatButton = styled(Button)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;
