import { TreeSelect } from 'antd';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import PropTypes from 'prop-types';

const { TreeNode } = TreeSelect;

const SelectField = ({ name, disabled, mode, options, valueKey, labelKey, ...rest }) => {
  const [, { value }] = useField(name);
  const { setFieldValue } = useFormikContext();

  const setValue = (val, tags) => {
    return tags.reduce(
      (acc, tag) => (val.includes(tag.position) || val.includes(tag.tag) ? [...acc, tag.tag] : acc),
      []
    );
  };

  const buildTreeTags = (tags, result = []) => {
    if (tags.length === 0) {
      return result;
    }
    // eslint-disable-next-line no-shadow
    const [first, ...rest] = tags;
    if (options.some(el => el.parentId === first.id)) {
      return buildTreeTags(rest, [
        ...result,
        <TreeNode value={first.tag} title={first.tag}>
          {buildTreeTags(options.filter(elem => elem.parentId === first.id))}
        </TreeNode>,
      ]);
    }
    return buildTreeTags(rest, [
      ...result,
      <TreeNode value={first.tag} title={first.tag}>
        {buildTreeTags(options.filter(elem => elem.parentId === first.id))}
      </TreeNode>,
    ]);
  };

  return (
    <TreeSelect
      showSearch
      allowClear
      multiple
      treeDefaultExpandAll
      name={name}
      value={setValue(value, options)}
      component={TreeSelect}
      disabled={disabled}
      onChange={arr => setFieldValue(name, arr)}
      optionFilterProp="title"
      {...rest}
    >
      {buildTreeTags(options.filter(el => el.parentId === null))}
    </TreeSelect>
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
