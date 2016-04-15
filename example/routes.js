import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './pages/App';
import GithubCalendarPage from './pages/GithubCalendarPage';
import SourceCommitCalendarPage from './pages/SourceCommitCalendarPage';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/github" component={GithubCalendarPage} />
      <Route path="/source" component={SourceCommitCalendarPage} />
    </Route>
  </Router>
);

export default routes;
