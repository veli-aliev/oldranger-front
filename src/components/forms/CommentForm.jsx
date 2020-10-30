import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Button, Form, message } from 'antd';
import { Formik } from 'formik';
import TopicPhotoList from '../Topic/TopicPhotoList';
import { EditorField, FormItemLabel } from './fields';

const validationSchema = Yup.object({
  text: Yup.string()
    .required('Это поле обязательно')
    .max(500000, 'Слишком длинное сообщение'),
});

const editorModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};

const CommentForm = ({
  updateData,
  initialValues,
  buttonText,
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
  startText = '',
  fileList = [],
}) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(fileList);
  }, []);
  
  const handleAddFile = info => {
    setFiles(info.fileList);
    if (info.file.status !== 'removed') {
      message.success(`Файл ${info.file.name} успешно добавлен`);
    }
  };

  const onSubmitWrapper = useCallback(
    () => async (data, { resetForm, setSubmitting }) => {
      try {
        updateData(files);
        await onSubmit(data);
        setSubmitting(false);
        resetForm();
        setFiles([]);
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        if (onSubmitError) {
          onSubmitError(error);
        }
      }
    },
    [files, onSubmit, onSubmitSuccess, onSubmitError]
  );

  return (
    <Formik
      initialValues={{ ...initialValues, text: startText }}
      validationSchema={validationSchema}
      onSubmit={onSubmitWrapper()}
    >
      {({ touched, errors, handleSubmit, submitting }) => {
        return (
          <Form onSubmit={handleSubmit} labelAlign="left">
            <FormItemLabel wrapperCol={{ span: 24 }} name="text">
              <EditorField name="text" className="comment-editor" modules={editorModules} />
            </FormItemLabel>
            <Form.Item name="photo">
              <TopicPhotoList
                name="photo"
                handleChangePicturesState={handleAddFile}
                fileList={files}
                canUpload
                defaultFileList={fileList}
              />
            </Form.Item>
            <Form.Item>
              <TopicPhotoList
                handleChangePicturesState={handleAddFile}
                fileList={files}
                canUpload
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!!touched.message && !!errors.message}
                loading={submitting}
              >
                {buttonText}
              </Button>
            </Form.Item>
          </Form>
        );
      }}
    </Formik>
  );
};

CommentForm.defaultProps = {
  buttonText: 'Отправить',
  initialValues: {
    text: '',
  },
  onSubmitSuccess: null,
  onSubmitError: null,
  startText: '',
};

CommentForm.propTypes = {
  buttonText: PropTypes.string,
  initialValues: PropTypes.shape([PropTypes.array]),
  onSubmit: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  startText: PropTypes.string,
  updateData: PropTypes.func.isRequired,
  fileList: PropTypes.arrayOf.isRequired,
};

export default CommentForm;
