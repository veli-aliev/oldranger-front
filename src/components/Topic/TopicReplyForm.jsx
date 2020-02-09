import React, { useContext } from 'react';
import { Button, Input, Form as AntForm } from 'antd';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { TopicReplyWarning } from './styled';
import Context from '../Context';
import TopicPhotoList from './TopicPhotoList';
import fileProps from './propTypes/fileProps';

const validationSchema = Yup.object({
  message: Yup.string()
    .min(1, 'Сообщение не может быть пустым')
    .max(500000, 'Слишком длинное сообщение')
    .required('Поле обязательно для заполнения'),
});

const TopicReplyForm = ({ replyRef, handleSubmitComment, handleAddFile, files, uploading }) => {
  const { isLogin } = useContext(Context);
  return isLogin ? (
    <Formik
      initialValues={{
        message: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmitComment(values.message, resetForm);
      }}
    >
      {({ handleSubmit, handleChange, errors, touched, values, handleBlur }) => {
        return (
          <Form onSubmit={handleSubmit}>
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
                placeholder="Cообщение"
                rows={4}
                ref={replyRef}
              />
            </AntForm.Item>
            <AntForm.Item>
              <TopicPhotoList
                handleChangePicturesState={handleAddFile}
                fileList={files}
                canUpload
              />
            </AntForm.Item>
            <AntForm.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!!touched.messgae && !!errors.message}
                loading={uploading}
              >
                {uploading ? 'Отправка' : 'Отправить'}
              </Button>
            </AntForm.Item>
          </Form>
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
  handleAddFile: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(fileProps).isRequired,
  uploading: PropTypes.bool.isRequired,
};

export default TopicReplyForm;
