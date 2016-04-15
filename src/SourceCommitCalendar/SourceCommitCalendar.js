import React, { Component, PropTypes } from 'react';

class SourceCommitCalendar extends Component { // eslint-disable-line
  render() {
    return (
      <h1>
        Hihi
      </h1>
    );
  }
}

SourceCommitCalendar.propTypes = {
  dataset: PropTypes.object.isRequired,
  colors: PropTypes.array,
  height: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  width: PropTypes.number,
  unit: PropTypes.string,
};
