import React from 'react';
import { SourceCommitCalendar } from '../../src';
const dataset = require('../data/commitSourceData.json');

const SourceCommitCalendarPage = () => (
  <SourceCommitCalendar dataset={dataset} />
);

export default SourceCommitCalendarPage;
