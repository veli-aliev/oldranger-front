import styled from 'styled-components';
import { Button, Col, Form, List, Row, Icon } from 'antd';

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

export const StyledTopicReplyForm = styled(Form)`
  margin-top: 24px;
`;

export const TopicReplyWarning = styled.h3`
  margin: 24px 0;
  text-align: center;
`;

export const GoldIcon = styled(Icon)`
  color: #ffc53d;
`;
