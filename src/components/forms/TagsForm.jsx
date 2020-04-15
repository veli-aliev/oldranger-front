import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Button, Form } from 'antd';
import { Formik, Field, ErrorMessage } from 'formik';

const validationSchema = Yup.object({
  text: Yup.string()
    .required('Это поле обязательно')
    .max(20, 'Слишком длинное поле'),
});

const TagsForm = ({ text, onSubmit, left }) => {
  const onSubmitWrapper = async (data, { resetForm, setSubmitting }) => {
    try {
      await onSubmit(data);
      setSubmitting(false);
      resetForm();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={{ text }} validationSchema={validationSchema} onSubmit={onSubmitWrapper}>
      {({ touched, errors, handleSubmit, submitting }) => {
        return (
          <Form onSubmit={handleSubmit} style={{ marginLeft: left }}>
            <Field name="text" />
            <ErrorMessage name="text" component="div" style={{ color: 'tomato' }} />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!!touched.message && !!errors.message}
                loading={submitting}
              >
                Отправить
              </Button>
            </Form.Item>
          </Form>
        );
      }}
    </Formik>
  );
};

TagsForm.propTypes = {
  text: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  left: PropTypes.string.isRequired,
};

export default TagsForm;
