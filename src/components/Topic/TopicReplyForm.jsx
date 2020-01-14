import React, { useContext } from 'react';
import { Button, Input, Form as AntForm } from 'antd';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { StyledTopicReplyForm, TopicReplyWarning } from './styled';
import Context from '../Context';

const validationSchema = Yup.object({
  message: Yup.string()
    .min(1, 'Сообщение не может быть пустым')
    .max(500000, 'Слишком длинное сообщение').isRequired,
});

const TopicReplyForm = ({ replyRef, handleSubmitComment }) => {
  const { isLogin } = useContext(Context);
  return isLogin ? (
    <Formik
      initialValues={{
        message: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmitComment(values.message, 0, resetForm);
      }}
    >
      {({ handleSubmit, handleChange, errors, touched, values, handleBlur }) => {
        return (
          <StyledTopicReplyForm onSubmit={handleSubmit}>
            <AntForm.Item
              hasFeedback={!!touched.message && !!errors.message}
              validateStatus={touched.message && errors.message ? 'error' : 'success'}
              help={touched.message ? errors.message : ''}
            >
              <Input.TextArea
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Напишите свое сообщение"
                rows={4}
                ref={replyRef}
              />
              <Button
                type="primary"
                htmlType="submit"
                disabled={!!touched.message && !!errors.message}
              >
                Ответить
              </Button>
            </AntForm.Item>
          </StyledTopicReplyForm>
        );
      }}
    </Formik>
  ) : (
    <TopicReplyWarning ref={replyRef}>
      Для возможности добавлять комментарии необходимо <Link to="/login">авторизироваться</Link>.
    </TopicReplyWarning>
  );
};

TopicReplyForm.propTypes = {
  replyRef: PropTypes.func.isRequired,
  handleSubmitComment: PropTypes.func.isRequired,
};

export default TopicReplyForm;
