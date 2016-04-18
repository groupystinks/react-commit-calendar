import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import flattenNodes from '../helpers/flattenNodes';

export default class SourceCommitCalendar extends Component { // eslint-disable-line
  render() {
    const { dataset, height, width } = this.props;
    const diameter = 960;

    const bubble = d3.layout.pack()
      .sort(null)
      .size([diameter - 4, diameter - 4])
      .value(d => d.size)
      .padding(10);
    const nodes = bubble.nodes(flattenNodes(dataset))
      .filter(d => !d.children);

    return (
      <svg
        height={height}
        width={width}
      >
        <g
          transform="translate(4, 4)"
        >
          {nodes.map(node => { // eslint-disable-line
            return (
              <g
                transform={'translate(' + node.x + ', ' + node.y + ')'} // eslint-disable-line
              >
                <title> {node.name} </title>
                <circle
                  fill={'rgb(31, 119, 180)'}
                  fillOpacity={'.25'}
                  key={node.name}
                  r={node.r}
                />
              </g>
            );
          })}
        </g>
      </svg>
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

SourceCommitCalendar.defaultProps = {
  colors: ['#d6e685', '#8cc665', '#44a340', '#1e6823'],
  height: 960,
  marginBottom: 0,
  marginLeft: 80,
  marginRight: 0,
  marginTop: 20,
  width: 960,
  unit: 'contributions',
};
