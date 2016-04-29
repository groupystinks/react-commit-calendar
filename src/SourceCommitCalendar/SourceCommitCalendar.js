import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import ForceLayout from './ForceLayout';

const styles = {
  leaf: {
    display: 'none'
  },
  monthCircleActive: {
    filter: 'url(#dropShadow)',
    cursor: 'pointer',
  },
  monthCircle: {
    cursor: 'pointer',
  },
};

export default class SourceCommitCalendar extends Component { // eslint-disable-line
  constructor() {
    super();
    this.bubble = null;
    this.nodes = null;
    this.rootName = '';
    this.state = {
      forceIds: [],
      forceNodes: [],
      isRenderForceComponents: true,
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
    this.rootName = dataset.name;
  }
  onClickHandler = (date) => { // eslint-disable-line
    const { isRenderForceComponents } = this.state;
    const [targetNode] = this.nodes.filter(node => node.name === date);
    let forceNodes;
    let forceIds;

    if (targetNode.name === this.rootName) { return null; }
    if (!(this.state.forceIds.indexOf(targetNode.name) === -1)) {
      forceNodes = this.state.forceNodes.filter(node => node.name !== targetNode.name);
      forceIds = this.state.forceIds.filter(id => id !== targetNode.name);
    } else { // eslint-disable-line
      forceNodes = this.state.forceNodes.slice();
      forceIds = this.state.forceIds.slice();
      forceNodes.push(targetNode);
      forceIds.push(targetNode.name);
    }

    this.setState({
      forceIds,
      forceNodes,
      isRenderForceComponents: !isRenderForceComponents,
    }, () => {
      if (!this.state.isRenderForceComponents) {
        this.setState({
          isRenderForceComponents: !this.state.isRenderForceComponents,
        });
      }
    });
  }
  renderForce() {
    const { forceNodes, isRenderForceComponents } = this.state;
    if (forceNodes.length === 0 || !isRenderForceComponents) { return null; }
    const nodes = forceNodes.reduce((accu, previous) => accu.concat(previous.children), []);
    const links = nodes.map((node, idx) => { // eslint-disable-line
      return {
        source: idx,
        target: 0
      };
    });
    return <ForceLayout links={links} nodes={nodes} />;
  }
  render() {
    const { baseColor, baseOpacity, height, width } = this.props;
    const { forceIds } = this.state;
    const force = this.renderForce();
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
            return (
              <g
                style={node.children ? null : styles.leaf}
                className={node.children ? 'node' : 'leaf node'}
                onClick={node.children ? bindClick : null}
                key={node.name}
                transform={'translate(' + node.x + ', ' + node.y + ')'} // eslint-disable-line
              >
                <title> {node.className} </title>
                <filter id="dropShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                  <feOffset dx="2" dy="4" />
                  <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <circle
                  style={
                    !(forceIds.indexOf(node.name) === -1)
                      ? styles.monthCircleActive : styles.monthCircle
                  }
                  fill={baseColor}
                  fillOpacity={baseOpacity}
                  key={node.name}
                  r={node.r}
                />
                <text>
                  {node.name}
                </text>
              </g>
            );
          })}
          {force}
        </g>
      </svg>
    );
  }
}

SourceCommitCalendar.propTypes = {
  dataset: PropTypes.object.isRequired,
  diameter: PropTypes.number,
  baseColor: PropTypes.string,
  baseOpacity: PropTypes.string,
  height: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  width: PropTypes.number,
  unit: PropTypes.string,
};

SourceCommitCalendar.defaultProps = {
  baseColor: 'rgb(31, 119, 180)',
  baseOpacity: '.25',
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
