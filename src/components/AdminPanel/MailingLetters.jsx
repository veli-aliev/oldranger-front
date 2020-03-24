import React, { useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, Input, Icon, Button, Alert } from 'antd';
import serverQueries from '../../serverQueries';

const SendMailBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const formStyles = { width: '500px' };

const MailingLetters = () => {
  const [sendingStatus, setSendingStatus] = useState('');

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required('Обязательное поле'),
    message: Yup.string().required('Обязательное поле'),
  });

  return (
    <SendMailBlock>
      <h2>Отправить сообщение всем пользователям</h2>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ subject: '', message: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          serverQueries
            .sendMailToAllUsers(values)
            .then(() => {
              setSendingStatus('success');
              setSubmitting(false);
              resetForm();
            })
            .catch(err => {
              setSendingStatus('error');
              setSubmitting(false);
              throw err;
            });
        }}
      >
        {({ values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} style={formStyles}>
            <Form.Item
              validateStatus={touched.subject && errors.subject ? 'error' : null}
              help={touched.subject && errors.subject ? errors.subject : null}
            >
              <Input
                type="subject"
                id="subject"
                prefix={<Icon type="mail" />}
                placeholder="Введите заголовок"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              validateStatus={touched.message && errors.message ? 'error' : null}
              help={touched.message && errors.message ? errors.message : null}
            >
              <Input.TextArea
                autoSize={{ minRows: 8, maxRows: 8 }}
                type="message"
                id="message"
                prefix={<Icon type="mail" />}
                placeholder="Введите сообщение"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item>
              <SubmitButtonWrapper>
                <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                  Отправить
                </Button>
              </SubmitButtonWrapper>
            </Form.Item>
            {sendingStatus === 'success' && <Alert type="success" message="Сообщение отправлено" />}
            {sendingStatus === 'error' && <Alert type="error" message="Сообщение не отправлено" />}
          </Form>
        )}
      </Formik>
    </SendMailBlock>
  );
};

export default MailingLetters;
