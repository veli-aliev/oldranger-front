import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import queries from '../../serverQueries';
import TopicForm from '../forms/TopicForm';
import useTopicFetching from '../../hooks/useTopicFetching';
import { StyledCenteredContainer, StyledHeader } from './styled';

const updateTopic = subsection => async values => {
  const { name, startMessage } = values;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('startMessage', startMessage);
  formData.append('subsection', subsection);
  console.log(formData);
  const data = await queries.updateTopic(formData);
  return data;
};

const TopicUpdate = () => {
  const { topicId } = useParams();
  const history = useHistory();

  const { error, loading, results } = useTopicFetching(topicId);

  if (loading || error) {
    return (
      <StyledCenteredContainer>
        {loading ? <Spin /> : 'Не удалось загрузить тему'}
      </StyledCenteredContainer>
    );
  }

  const {
    topic: { name, startMessage, subsection, isHideToAnon = true, draft: isDraft },
  } = results;

  return (
    <>
      <StyledHeader>Редактирование темы</StyledHeader>
      <TopicForm
        initialValues={{ name, startMessage, subsection, isHideToAnon, isDraft }}
        onSubmit={updateTopic(subsection)}
        onSubmitSuccess={({ id }) => history.push(`/topic/${id}`)}
      />
    </>
  );
};

export default TopicUpdate;
