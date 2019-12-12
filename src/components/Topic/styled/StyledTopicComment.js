import { List } from 'antd';
import styled from 'styled-components';

export default styled(List.Item)`
  && {
    padding: 0;
  }
  .ant-list-item-action {
    padding: 10px;
    border-top: 1px solid #d9d9d9;
  }
  .ant-list-item-action {
    margin-top: 0;
    text-align: right;
  }
  .comment--action-icon {
    margin-right: 8px;
  }
`;
