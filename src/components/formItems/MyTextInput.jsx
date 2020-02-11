import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form as AntForm } from 'antd';
import { useField } from 'formik';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <AntForm.Item
      label={label}
      hasFeedback={label.toLowerCase().indexOf('password') === -1 && !!meta.touched && !!meta.error}
      validateStatus={meta.touched && meta.error ? 'error' : 'success'}
      help={meta.touched ? meta.error : ''}
    >
      {label.toLowerCase().indexOf('password') === -1 ? (
        <Input {...field} {...props} />
      ) : (
        <Input.Password {...field} {...props} />
      )}
    </AntForm.Item>
  );
};

MyTextInput.propTypes = {
  label: PropTypes.string.isRequired,
};

export default MyTextInput;
