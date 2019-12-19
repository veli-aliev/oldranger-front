import React from 'react';
import PropTypes from 'prop-types';
import { Form as AntForm } from 'antd';
import { useField } from 'formik';

const FormItem = ({ label, children, isButtonWrapper, ...props }) => {
  const [, meta] = useField(props);
  return (
    <AntForm.Item
      label={label}
      hasFeedback={
        !isButtonWrapper &&
        label.toLowerCase().indexOf('password') === -1 &&
        !!meta.touched &&
        !!meta.error
      }
      validateStatus={!isButtonWrapper && meta.touched && meta.error ? 'error' : 'success'}
      help={!isButtonWrapper && meta.touched ? meta.error : ''}
      {...props}
    >
      {children}
    </AntForm.Item>
  );
};

FormItem.propTypes = {
  label: PropTypes.string,
  children: PropTypes.element.isRequired,
  isButtonWrapper: PropTypes.bool,
};

FormItem.defaultProps = {
  label: '',
  isButtonWrapper: false,
};

export default FormItem;
