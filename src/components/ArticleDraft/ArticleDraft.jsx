import React, { useEffect, useState } from 'react';
import { List, Divider } from 'antd';
import { Link } from 'react-router-dom';
import querie from '../../serverQueries';

const ArticleDraft = () => {
  const draftsArray = [];
  const [arr, update] = useState([]);

  useEffect(() => {
    querie.getArticleDraft().then(res => {
      res.content.forEach(el => {
        const { id, title, text } = el;

        draftsArray.push({ id, title, text });
        update(prev => {
          return [...prev, { id, title, text }];
        });
      });
    });
  }, []);

  return (
    <>
      <Divider orientation="left">Черновики</Divider>
      <List
        bordered
        dataSource={arr}
        renderItem={({ id, title, text }) => (
          <List.Item style={{ height: '100px', fontSize: '16px' }}>
            {/* с сервера приходит тело статьи, обернутое в тег */}
            <List.Item.Meta title={title} description={text.substring(3, text.length - 4)} />
            {<Link to={`/article/${id}/update`}>Редактировать</Link>}
          </List.Item>
        )}
      />
    </>
  );
};

export default ArticleDraft;
