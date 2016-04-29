'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ForceLayout = function (_Component) {
  (0, _inherits3["default"])(ForceLayout, _Component);

  function ForceLayout() {
    (0, _classCallCheck3["default"])(this, ForceLayout);
    return (0, _possibleConstructorReturn3["default"])(this, (0, _getPrototypeOf2["default"])(ForceLayout).apply(this, arguments));
  }

  (0, _createClass3["default"])(ForceLayout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var links = _props.links;
      var nodes = _props.nodes;
      var width = _props.width;
      var height = _props.height;

      var force = _d2["default"].layout.force().charge(-120).linkDistance(50).size([width, height]).nodes(nodes).links(links);

      var group = _d2["default"].select(this.refs.mountPoint).attr('width', width).attr('height', height);

      var link = group.selectAll('line').data(links).enter().append('line').style('stroke', '#999999').style('stroke-opacity', 0.6).style('stroke-width', function (d) {
        return Math.sqrt(d.value);
      });

      var color = _d2["default"].scale.category20();
      var node = group.selectAll('circle').data(nodes).enter().append('circle').attr('r', 5).style('stroke', '#FFFFFF').style('stroke-width', 1.5).style('fill', function (d) {
        return color(d.group);
      }).call(force.drag);

      force.on('tick', function () {
        link.attr('x1', function (d) {
          return d.source.x;
        }).attr('y1', function (d) {
          return d.source.y;
        }).attr('x2', function (d) {
          return d.target.x;
        }).attr('y2', function (d) {
          return d.target.y;
        });

        node.attr('cx', function (d) {
          return d.x;
        }).attr('cy', function (d) {
          return d.y;
        });
      });
      force.start();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;

      return _react2["default"].createElement('g', { width: width, height: height, ref: 'mountPoint' });
    }
  }]);
  return ForceLayout;
}(_react.Component);

exports["default"] = ForceLayout;


ForceLayout.propTypes = {
  data: _react.PropTypes.object,
  links: _react.PropTypes.array,
  nodes: _react.PropTypes.array,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number
};

ForceLayout.defaultProps = {
  data: {},
  links: [],
  nodes: [],
  width: 1200,
  height: 700
};