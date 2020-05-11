import React from 'react';
import { Route } from 'react-router-dom';
import Drafts from '../components/ArticleDraft/ArticleDraft';

const ArticleDraft = () => {
  return <Route path="/articleDraft" component={Drafts} />;
};

export default ArticleDraft;
