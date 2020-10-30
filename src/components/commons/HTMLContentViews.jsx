import styled from 'styled-components';

export const ArticleTitle = styled.h1`
  font-size: 32px;
  line-height: 40px;
  color: #24292e;
`;

export const ArticleContentView = styled.div`
  font-size: 16px;
  line-height: 1.56;
  color: #24292e;

  & h1,
  & h2,
  & h3 {
    font-weight: 600;
    margin: 0;
    padding: 0;
    color: #24292e;
  }

  & h2 {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 32px;
  }

  & h3 {
    padding-left: 12px;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 28px;
    position: relative;
    &:before {
      content: '';
      height: 28px;
      width: 4px;
      position: absolute;
      top: 0;
      left: 0;
      background: #24292e;
    }
  }

  & p {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  & ul,
  ol {
    margin: 0 0 0 34px;
    padding: 0;
    & li {
      padding: 9px 0;
      line-height: 1.6;
    }
    & li:first-child {
      padding-top: 0;
    }
  }

  & ul {
    list-style-type: disc;
  }
`;

export const CommentContentView = styled.div`
  & p {
    margin-top: -15px;
    margin-bottom: 1em;
  }
`;
