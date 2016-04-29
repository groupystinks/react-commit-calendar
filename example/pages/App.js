import React from 'react';
import GithubCalendarPage from './GithubCalendarPage';
import SourceCommitCalendarPage from './SourceCommitCalendarPage';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  }
};

const App = () => { // eslint-disable-line
  return (
      <div>
          <div style={styles.container}>
              <h1>Github Calendar</h1>
              <GithubCalendarPage />
              <h1>Source Calendar</h1>
              <SourceCommitCalendarPage />
          </div>
      </div>
  );
};

export default App;
