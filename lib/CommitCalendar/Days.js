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

var _date = require('../helpers/date');

var _getDataFromDataset = require('../helpers/getDataFromDataset');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Days = function (_Component) {
  (0, _inherits3["default"])(Days, _Component);

  function Days() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Days);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, (_Object$getPrototypeO = (0, _getPrototypeOf2["default"])(Days)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._mouseOverHandler = function (date, left) {
      var mouseOverHandler = _this.props.mouseOverHandler;

      var node = _this.refs[date];
      mouseOverHandler(date, { left: left, top: node.getAttribute('y') });
    }, _this._mouseOutHandler = function () {
      var mouseOutHandler = _this.props.mouseOutHandler;

      mouseOutHandler();
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  (0, _createClass3["default"])(Days, [{
    key: 'render',
    value: function render() {
      var days = [];
      var _props = this.props;
      var colors = _props.colors;
      var dataset = _props.dataset;
      var daysInWeek = _props.daysInWeek;
      var height = _props.height;
      var maxCount = _props.maxCount;
      var left = _props.left;
      var startDate = _props.startDate;
      var type = _props.type;

      // TODO: 1. if maxCount is below specific number, let's not making any colorScale

      var colorLevels = colors.length;
      var colorScale = _d2["default"].scale.threshold().domain([(maxCount + 1) / colorLevels, (maxCount + 1) * 2 / colorLevels, (maxCount + 1) * 3 / colorLevels]).range(colors);
      var yScale = _d2["default"].scale.ordinal().domain(_d2["default"].range(7)).rangeBands([0, height], 0.5, 0.8);
      for (var i = 0; i < daysInWeek; i++) {
        var date = (0, _date.getDateByDays)(startDate, i).toJSON().slice(0, 10);
        var count = (0, _getDataFromDataset.getCount)(dataset, date);
        var bindMouseOver = this._mouseOverHandler.bind(this, date, left);
        days.push(_react2["default"].createElement('rect', {
          key: i,
          'data-date': date,
          height: 10,
          fill: count ? colorScale(count) : '#eee',
          onMouseOver: bindMouseOver,
          onMouseOut: this._mouseOutHandler,
          ref: date,
          width: 10,
          y: type === 'first-week' ? yScale(7 - daysInWeek + i) : yScale(i)
        }));
      }
      return _react2["default"].createElement(
        'g',
        null,
        days
      );
    }
  }]);
  return Days;
}(_react.Component);

exports["default"] = Days;


Days.propTypes = {
  colors: _react.PropTypes.array,
  dataset: _react.PropTypes.object,
  daysInWeek: _react.PropTypes.number,
  height: _react.PropTypes.number.isRequired,
  maxCount: _react.PropTypes.number,
  mouseOverHandler: _react.PropTypes.func,
  mouseOutHandler: _react.PropTypes.func,
  left: _react.PropTypes.number,
  startDate: _react.PropTypes.object,
  type: _react.PropTypes.string
};

Days.defaultProps = {
  daysInWeek: 7,
  maxCount: 0,
  type: 'normal'
};