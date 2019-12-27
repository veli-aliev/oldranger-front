import React from 'react';
import { Route } from 'react-router-dom';
import Subsection from '../components/Subsection/Subsection';

const SubsectionRoute = () => (
  <Route exact path="/subsection/:subsectionId">
    <Subsection />
  </Route>
);

export default SubsectionRoute;
