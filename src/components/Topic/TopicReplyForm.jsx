import React from 'react';
import { Button, Input, Form as AntForm } from 'antd';
import PropTypes from 'prop-types';

const TopicReplyForm = ({ replyRef }) => {
  return (
    <AntForm>
      <Input.TextArea
        placeholder="Напишите свое сообщение"
        label="Message"
        name="message"
        rows={4}
        ref={replyRef}
      />

      <AntForm.Item>
        <Button type="primary" htmlType="submit">
          Ответить
        </Button>
      </AntForm.Item>
    </AntForm>
  );
};

TopicReplyForm.propTypes = {
  replyRef: PropTypes.func.isRequired,
};

export default TopicReplyForm;
