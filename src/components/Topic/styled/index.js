import styled from 'styled-components';
import { Button, Col, Row, Icon, Alert, Upload } from 'antd';

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

export const TopicReplyWarning = styled.h3`
  margin: 24px 0;
  text-align: center;
`;

export const GoldIcon = styled(Icon)`
  color: #ffc53d;
`;

export const TopicCommentReplyAlert = styled(Alert)`
  margin-top: 20px;
`;

export const UploadViewOnly = styled(Upload)`
  i.anticon.anticon-delete {
    display: none;
  }
`;
