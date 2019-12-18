import styled from 'styled-components';
import { Button, Col, List, Row } from 'antd';

export const StyledTopicMessages = styled.div`
  padding: 20px 0;
`;

export const TopicTitle = styled.h2`
  text-align: center;
`;

export const StyledTopicCommentItem = styled(List.Item)`
  min-height: 150px;
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
