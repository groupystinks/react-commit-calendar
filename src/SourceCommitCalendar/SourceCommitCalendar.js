import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import ForceLayout from './ForceLayout';

export default class SourceCommitCalendar extends Component { // eslint-disable-line
  constructor() {
    super();
    this.bubble = null;
    this.nodes = null;
    this.state = {
      forceComponents: [],
    };
  }
  componentWillMount() {
    const { dataset, diameter } = this.props;
    this.bubble = d3.layout.pack()
      .sort(null)
      .size([diameter - 4, diameter - 4])
      .value(d => d.size)
      .padding(4);
    this.nodes = this.bubble.nodes(dataset);
  }
  onClickHandler = (date) => {
    const [targetNode] = this.nodes.filter(node => node.name === date);
    const force = <ForceLayout nodes={targetNode.children} />;
    console.log(this.state.forceComponents);
    const forceComponents = this.state.forceComponents.slice();
    forceComponents.push(force);
    console.log('forceComponents', forceComponents);
    this.setState({ forceComponents });
  }
  renderForce() {

  }
  render() {
    const { height, width } = this.props;
    const { forceComponents } = this.state;

    return (
      <svg
        height={height}
        width={width}
      >
        <g
          transform="translate(4, 4)"
        >
          {this.nodes.map((node, idx) => { // eslint-disable-line
            const bindClick = this.onClickHandler.bind(this, node.name);
            const styles = {
              display: 'none'
            };
            return (
              <g
                style={node.children ? null : styles}
                className={node.children ? 'node' : 'leaf node'}
                onClick={node.children ? bindClick : null}
                z={node.children ? 100 : 0}
                key={node.name}
                transform={'translate(' + node.x + ', ' + node.y + ')'} // eslint-disable-line
              >
                <title> {node.className} </title>
                <circle
                  fill={'rgb(31, 119, 180)'}
                  fillOpacity={'.25'}
                  key={node.name}
                  r={node.r}
                />
              </g>
            );
          })}
          {forceComponents}
        </g>
      </svg>
    );
  }
}

SourceCommitCalendar.propTypes = {
  dataset: PropTypes.object.isRequired,
  diameter: PropTypes.number,
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
  diameter: 480,
  height: 960,
  marginBottom: 0,
  marginLeft: 80,
  marginRight: 0,
  marginTop: 20,
  width: 960,
  unit: 'contributions',
};
