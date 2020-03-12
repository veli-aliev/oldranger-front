import styled from 'styled-components';

export const ArticleContentView = styled.div`
  & p {
    margin-bottom: 1em;
    font-size: 14px;
  }

  & h1,
  & h2,
  & h3 {
    font-weight: 600;
  }
`;

export const CommentContentView = styled.div`
  & p {
    margin-bottom: 1em;
  }
`;
