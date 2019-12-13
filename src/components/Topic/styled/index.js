import styled from 'styled-components';
import { Col, Icon, List } from 'antd';

export const UserInfoCol = styled(Col)`
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.03);
  text-align: center;
`;

export const UserInfoItem = styled.span`
  display: block;
`;

export const UserMessageCol = styled(Col)`
  padding: 20px;
`;

export const StyledCommentItem = styled(List.Item)`
  .ant-list-item-action {
    padding: 10px;
    border-top: 1px solid #d9d9d9;
  }
  .ant-list-item-action {
    margin-top: 0;
    text-align: right;
  }
`;

export const CommentAction = styled(Icon)`
  margin-right: 8px;
`;

export const CommentList = styled(List)`
  .ant-list-item {
    padding: 0;
  }
`;
