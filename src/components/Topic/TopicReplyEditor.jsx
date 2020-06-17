import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styled/quill.css';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};

const TopicReplyEditor = props => {
  const [clazz, setClazz] = useState('');
  const { value, onChange, replyRef, ...rest } = props;
  return (
    <ReactQuill
      className={clazz}
      ref={replyRef}
      value={value}
      onChange={onChange}
      theme="snow"
      onFocus={() => {
        setClazz('my-quill');
      }}
      onBlur={() => {
        setClazz('');
      }}
      modules={modules}
      {...rest}
    />
  );
};

TopicReplyEditor.defaultProps = {
  value: '',
  replyRef: null,
};

TopicReplyEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  replyRef: PropTypes.func,
};

export default TopicReplyEditor;
