import { Select } from 'antd';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ name, disabled, mode, options, valueKey, labelKey, ...rest }) => {
  const [, { value }] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <Select
      name={name}
      component={Select}
      disabled={disabled}
      onChange={arr => setFieldValue(name, arr)}
      mode={mode}
      value={value}
      optionFilterProp="title"
      {...rest}
    >
      {options &&
        options.map(option => (
          <Select.Option key={option[labelKey]} title={option[labelKey]} value={option[valueKey]}>
            {option[labelKey]}
          </Select.Option>
        ))}
    </Select>
  );
};

SelectField.defaultProps = {
  valueKey: 'id',
  labelKey: 'name',
  disabled: false,
  mode: 'multiple',
  name: '',
  options: [],
};

SelectField.propTypes = {
  name: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
  mode: PropTypes.string,
};

export default SelectField;
