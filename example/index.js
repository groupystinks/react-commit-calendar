import React from 'react';
import ReactDOM from 'react-dom';
import CommitCalendar from '../src';
// test util
import dataset from './data/dataset';

ReactDOM.render(
  <CommitCalendar
    colors={['#ffff00', '#e5e500', '#cccc00', '#b2b200']}
    dataset={dataset}
  />,
  document.getElementById('root')
);
