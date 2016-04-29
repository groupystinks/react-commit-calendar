'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _ForceLayout = require('./ForceLayout');

var _ForceLayout2 = _interopRequireDefault(_ForceLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = {
  leaf: {
    display: 'none'
  },
  monthCircleActive: {
    filter: 'url(#dropShadow)',
    cursor: 'pointer'
  },
  monthCircle: {
    cursor: 'pointer'
  }
};

var SourceCommitCalendar = function (_Component) {
  (0, _inherits3["default"])(SourceCommitCalendar, _Component);
  // eslint-disable-line

  function SourceCommitCalendar() {
    (0, _classCallCheck3["default"])(this, SourceCommitCalendar);

    var _this = (0, _possibleConstructorReturn3["default"])(this, (0, _getPrototypeOf2["default"])(SourceCommitCalendar).call(this));

    _this.onClickHandler = function (date) {
      // eslint-disable-line
      var isRenderForceComponents = _this.state.isRenderForceComponents;

      var _this$nodes$filter = _this.nodes.filter(function (node) {
        return node.name === date;
      });

      var _this$nodes$filter2 = (0, _slicedToArray3["default"])(_this$nodes$filter, 1);

      var targetNode = _this$nodes$filter2[0];

      var forceNodes = void 0;
      var forceIds = void 0;

      if (targetNode.name === _this.rootName) {
        return null;
      }
      if (!(_this.state.forceIds.indexOf(targetNode.name) === -1)) {
        forceNodes = _this.state.forceNodes.filter(function (node) {
          return node.name !== targetNode.name;
        });
        forceIds = _this.state.forceIds.filter(function (id) {
          return id !== targetNode.name;
        });
      } else {
        // eslint-disable-line
        forceNodes = _this.state.forceNodes.slice();
        forceIds = _this.state.forceIds.slice();
        forceNodes.push(targetNode);
        forceIds.push(targetNode.name);
      }

      _this.setState({
        forceIds: forceIds,
        forceNodes: forceNodes,
        isRenderForceComponents: !isRenderForceComponents
      }, function () {
        if (!_this.state.isRenderForceComponents) {
          _this.setState({
            isRenderForceComponents: !_this.state.isRenderForceComponents
          });
        }
      });
    };

    _this.bubble = null;
    _this.nodes = null;
    _this.rootName = '';
    _this.state = {
      forceIds: [],
      forceNodes: [],
      isRenderForceComponents: true
    };
    return _this;
  }

  (0, _createClass3["default"])(SourceCommitCalendar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var dataset = _props.dataset;
      var diameter = _props.diameter;

      this.bubble = _d2["default"].layout.pack().sort(null).size([diameter - 4, diameter - 4]).value(function (d) {
        return d.size;
      }).padding(4);
      this.nodes = this.bubble.nodes(dataset);
      this.rootName = dataset.name;
    }
  }, {
    key: 'renderForce',
    value: function renderForce() {
      var _state = this.state;
      var forceNodes = _state.forceNodes;
      var isRenderForceComponents = _state.isRenderForceComponents;

      if (forceNodes.length === 0 || !isRenderForceComponents) {
        return null;
      }
      var nodes = forceNodes.reduce(function (accu, previous) {
        return accu.concat(previous.children);
      }, []);
      var links = nodes.map(function (node, idx) {
        // eslint-disable-line
        return {
          source: idx,
          target: 0
        };
      });
      return _react2["default"].createElement(_ForceLayout2["default"], { links: links, nodes: nodes });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props;
      var baseColor = _props2.baseColor;
      var baseOpacity = _props2.baseOpacity;
      var height = _props2.height;
      var width = _props2.width;
      var forceIds = this.state.forceIds;

      var force = this.renderForce();
      return _react2["default"].createElement(
        'svg',
        {
          height: height,
          width: width
        },
        _react2["default"].createElement(
          'g',
          {
            transform: 'translate(4, 4)'
          },
          this.nodes.map(function (node, idx) {
            // eslint-disable-line
            var bindClick = _this2.onClickHandler.bind(_this2, node.name);
            return _react2["default"].createElement(
              'g',
              {
                style: node.children ? null : styles.leaf,
                className: node.children ? 'node' : 'leaf node',
                onClick: node.children ? bindClick : null,
                key: node.name,
                transform: 'translate(' + node.x + ', ' + node.y + ')' // eslint-disable-line
              },
              _react2["default"].createElement(
                'title',
                null,
                ' ',
                node.className,
                ' '
              ),
              _react2["default"].createElement(
                'filter',
                { id: 'dropShadow' },
                _react2["default"].createElement('feGaussianBlur', { 'in': 'SourceAlpha', stdDeviation: '3' }),
                _react2["default"].createElement('feOffset', { dx: '2', dy: '4' }),
                _react2["default"].createElement(
                  'feMerge',
                  null,
                  _react2["default"].createElement('feMergeNode', null),
                  _react2["default"].createElement('feMergeNode', { 'in': 'SourceGraphic' })
                )
              ),
              _react2["default"].createElement('circle', {
                style: !(forceIds.indexOf(node.name) === -1) ? styles.monthCircleActive : styles.monthCircle,
                fill: baseColor,
                fillOpacity: baseOpacity,
                key: node.name,
                r: node.r
              }),
              _react2["default"].createElement(
                'text',
                null,
                node.name
              )
            );
          }),
          force
        )
      );
    }
  }]);
  return SourceCommitCalendar;
}(_react.Component);

exports["default"] = SourceCommitCalendar;


SourceCommitCalendar.propTypes = {
  dataset: _react.PropTypes.object.isRequired,
  diameter: _react.PropTypes.number,
  baseColor: _react.PropTypes.string,
  baseOpacity: _react.PropTypes.string,
  height: _react.PropTypes.number,
  marginBottom: _react.PropTypes.number,
  marginLeft: _react.PropTypes.number,
  marginRight: _react.PropTypes.number,
  marginTop: _react.PropTypes.number,
  width: _react.PropTypes.number,
  unit: _react.PropTypes.string
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
  unit: 'contributions'
};