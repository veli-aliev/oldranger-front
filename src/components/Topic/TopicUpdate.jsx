import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import queries from '../../serverQueries';
import TopicForm from '../forms/TopicForm';
import useTopicFetching from '../../hooks/useTopicFetching';
import { StyledCenteredContainer, StyledHeader } from './styled';

const updateTopic = (id, subsection, topicStarter) => async values => {
  const { name, startMessage } = values;
  const formData = { id, name, startMessage, subsection, topicStarter };
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
    topic: {
      id,
      name,
      startMessage,
      subsection,
      topicStarter,
      isHideToAnon = true,
      draft: isDraft,
    },
  } = results;

  return (
    <>
      <StyledHeader>Редактирование темы</StyledHeader>
      <TopicForm
        initialValues={{ name, startMessage, isHideToAnon, isDraft }}
        onSubmit={updateTopic(id, subsection, topicStarter)}
        onSubmitSuccess={() => history.push(`/topic/${topicId}`)}
      />
    </>
  );
};

export default TopicUpdate;
