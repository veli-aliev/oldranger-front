import styled from 'styled-components';

export const TopicContainer = styled.div`
  margin: 20px 0 40px 0;
`;

export const TopicHeaderWrapp = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const TopicHeaderHeading = styled.p`
  color: #868c98;
  font-size: 25px;
  margin: 0;
  font-weight: 500;
`;
export const TopicHeaderTitle = styled.h2`
  color: #000;
  font-size: 30px;
  font-weight: 600;
  flex-grow: 1;
  margin-right: 1em;
`;

export const TopicHeaderDate = styled.div`
  display: flex;
  font-size: 14px;
`;

export const TopicHeaderSpan = styled.span`
  color: #a0abbd;
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
  font-weight: 600;
`;

export const TopicHeaderAuthorWrapp = styled.div`
  padding: 15px 0;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
`;

export const TopicHeaderAuthorWrappCol = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-right: 10px;
`;

export const TopicHeaderAuthorNickName = styled.span`
  display: block;
  color: #333;
  font-weight: 600;
  font-size: 16px;
`;

export const TopicHeaderAuthorAuthor = styled.span`
  display: block;
  font-size: 20px;
  color: #a0abbd;
`;

export const TopicHeaderDefaultMessage = styled.p`
  color: #000;
  margin-top: 20px;
  font-size: 20px;
`;
