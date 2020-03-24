import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { useField } from 'formik';

const FormItem = ({ name, label, children, ...rest }) => {
  const [, { error, touched }] = useField(name);
  return (
    <Form.Item
      htmlFor={name}
      label={label}
      validateStatus={touched && error ? 'error' : 'success'}
      help={touched ? error : ''}
      {...rest}
    >
      {React.cloneElement(children, { name })}
    </Form.Item>
  );
};

FormItem.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

FormItem.defaultProps = {
  label: '',
};

export default FormItem;
