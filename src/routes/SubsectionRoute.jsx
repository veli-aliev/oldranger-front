import React from 'react';
import { Route } from 'react-router-dom';
import Subsection from '../components/Subsection/Subsection';
import Section from '../components/Subsection/Section';

const SubsectionRoute = () => (
  <>
    <Route exact path="/subsection/:subsectionId">
      <Subsection />
    </Route>
    <Route exact path="/section/:sectionId">
      <Section />
    </Route>
  </>
);

export default SubsectionRoute;
