import React from 'react';
import ReactDOM from 'react-dom';
import CommitCalendar from '../src';
// test util
import dataset from './data/dataset';

ReactDOM.render(
  <CommitCalendar dataset={dataset} />,
  document.getElementById('root')
);
