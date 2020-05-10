import styled from 'styled-components';
import { Button, Col, Row, Icon, Alert, Upload, Typography } from 'antd';

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

export const ReplyTag = styled.span`
  display: inline-block;
  margin: 0 5px;
  color: ${props => (props.green ? '#87D068' : '#87D068')};
  font-weight: 500;
  text-decoration: underline;
`;

export const UploadViewOnly = styled(Upload)`
  i.anticon.anticon-delete {
    display: none;
  }
`;

export const ListItem = styled.li`
  padding: 5px 0;
  border-bottom: 1px solid #e8e8e8;
`;

export const DeletedMessageText = styled(Typography.Text)`
  font-size: 12px;
`;

export const StyledCenteredContainer = styled.div`
  display: flex;
  min-height: 500px;
  font-size: 18px;
  justify-content: center;
  align-items: center;
`;

export const StyledHeader = styled.h1`
  text-align: center;
  font-weight: 600;
  font-size: 24px;
`;
