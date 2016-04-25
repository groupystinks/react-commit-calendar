import React, { Component, PropTypes } from 'react';
import d3 from 'd3';

export default class ForceLayout extends Component {
  componentDidMount() {
    const { links, nodes, width, height } = this.props;
    const force = d3.layout.force()
      .charge(-120)
      .linkDistance(50)
      .size([width, height])
      .nodes(nodes)
      .links(links);

    const group = d3.select(this.refs.mountPoint)
      .attr('width', width)
      .attr('height', height);

    const link = group.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .style('stroke', '#999999')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', (d) => Math.sqrt(d.value));

    const color = d3.scale.category20();
    const node = group.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 5)
      .style('stroke', '#FFFFFF')
      .style('stroke-width', 1.5)
      .style('fill', (d) => color(d.group))
      .call(force.drag);

    force.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y);
    });
    force.start();
  }
  render() {
    const { width, height } = this.props;
    return <g width={width} height={height} ref="mountPoint" />;
  }
}

ForceLayout.propTypes = {
  data: PropTypes.object,
  links: PropTypes.array,
  nodes: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};

ForceLayout.defaultProps = {
  data: {},
  links: [],
  nodes: [],
  width: 1200,
  height: 700,
};
