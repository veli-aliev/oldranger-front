import { Col } from 'antd';
import styled from 'styled-components';

export default styled(Col)`
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.03);
  text-align: center;
  .message--user-info {
    &__item {
      display: block;
    }
  }
`;
