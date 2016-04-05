import React from 'react';
import ReactDOM from 'react-dom';
import CommitCalendar from './CommitCalendar';
// test util
import dataset from '../example/data/dataset';

ReactDOM.render(
  <CommitCalendar dataset={dataset} />,
  document.getElementById('root')
);
