import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { useField } from 'formik';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';

const changePhoneInput = setValue => ({ target: { value } }) => {
  let customValue = value;

  if (value === '8') {
    customValue = '+7';
  }

  setValue('phoneNumber', formatIncompletePhoneNumber(customValue));
};

const PhoneInput = ({ setValue, ...props }) => {
  const [field] = useField(props);
  return <Input {...field} {...props} onChange={changePhoneInput(setValue)} />;
};

PhoneInput.propTypes = {
  setValue: PropTypes.func.isRequired,
};

export default PhoneInput;
