import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NotificationContainer from './component/bpm-notification/NotificationContainer';
import Footer from './component/bpm-footer/Footer';
import SkillsLayout from './component/skills/SkillsLayout';
import CategoriesLayout from './component/categories/CategoriesLayout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Fragment>
          <Route exact path="/" component={SkillsLayout} />
          <Route path="/categories" component={CategoriesLayout} />
        </Fragment>
      </BrowserRouter>

      <Footer />
      <NotificationContainer />
    </div>
  );
}

export default App;
