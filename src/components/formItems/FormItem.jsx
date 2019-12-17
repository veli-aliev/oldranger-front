import React from 'react';
import PropTypes from 'prop-types';
import { Form as AntForm } from 'antd';
import { useField } from 'formik';

const FormItem = ({ label, children, ...props }) => {
  const [, meta] = useField(props);
  return (
    <AntForm.Item
      label={label}
      hasFeedback={label.toLowerCase().indexOf('password') === -1 && !!meta.touched && !!meta.error}
      validateStatus={meta.touched && meta.error ? 'error' : 'success'}
      help={meta.touched ? meta.error : ''}
    >
      {children}
    </AntForm.Item>
  );
};

FormItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default FormItem;
