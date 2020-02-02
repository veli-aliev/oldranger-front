import styled from 'styled-components';
import { InputNumber } from 'formik-antd';

export const Container = styled.div`
  display: flex;
  border: 1px solid red;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  .ant-form-item-children {
    display: flex;
  }
`;

export const StyledInput = styled(InputNumber)`
  width: 200px;
  margin: 0 5px 5px 0;
`;

export const StyledDate = styled.span`
  display: block;
`;

export const StyledUserInfo = styled.div`
  text-align: right;
`;

export const StyledTags = styled.div`
  display: flex;
`;

export const StyledMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
`;

export const StyledArticle = styled.article`
  padding: 5px 5px;
  border: 1px solid #1890ff;
  border-radius: 5px;
  margin-bottom: 15px;
`;

export const StyledTitle = styled.h1`
  padding: 2px 0;
  font-size: 25px;
  width: 100%;
  border-bottom: 1px solid #1890ff;
  text-align: center;
  margin: 0;
`;

export const StyledArticleBody = styled.div`
  width: 100%;
  padding: 5px;
  text-align: center;
  font-size: 20px;
  border-bottom: 1px solid #1890ff;
`;
