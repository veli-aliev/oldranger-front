import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};

const TopicReplyEditor = props => {
  const { value, onChange, replyRef, ...rest } = props;
  return (
    <ReactQuill
      ref={replyRef}
      value={value}
      onChange={onChange}
      theme="snow"
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
