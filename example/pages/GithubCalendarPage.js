import React from 'react';
import { CommitCalendar } from '../../src';
// test util
import dataset from '../data/dataset';

const GithubCalendar = () => (
  <CommitCalendar
    colors={['#ffff00', '#e5e500', '#cccc00', '#b2b200']}
    dataset={dataset}
  />
);

export default GithubCalendar;
