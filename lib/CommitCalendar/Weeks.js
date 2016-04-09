'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _Days = require('./Days');

var _Days2 = _interopRequireDefault(_Days);

var _date = require('../helpers/date');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Weeks = function (_Component) {
  (0, _inherits3["default"])(Weeks, _Component);

  function Weeks() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Weeks);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, (_Object$getPrototypeO = (0, _getPrototypeOf2["default"])(Weeks)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._renderWeeks = function () {
      var daysInWeek = void 0;
      var startDate = void 0;
      var type = void 0;
      var width = _this.props.width;

      var weeks = [];
      var xScale = _d2["default"].scale.ordinal().domain(_d2["default"].range(_date.totalWeeks)).rangeBands([0, width]);
      for (var i = 0; i < _date.totalWeeks; i++) {
        if (i === 0) {
          daysInWeek = 7 - (_date.lastYearTodayInWeek + 1) + 1;
          startDate = _date.lastYearToday;
          type = 'first-week';
        } else if (i === 1) {
          startDate = (0, _date.getDateByDays)(startDate, daysInWeek);
          daysInWeek = 7;
        } else if (i === _date.totalWeeks - 1) {
          daysInWeek = _date.todayInWeek + 1;
          startDate = (0, _date.getDateByDays)(startDate, 7);
          type = 'last-week';
        } else {
          daysInWeek = 7;
          startDate = (0, _date.getDateByDays)(startDate, 7);
          type = 'normal';
        }
        weeks.push(_react2["default"].createElement(
          'g',
          {
            key: i,
            transform: 'translate(' + xScale(i) + ', 0)' // eslint-disable-line
          },
          _react2["default"].createElement(_Days2["default"], (0, _extends3["default"])({}, _this.props, {
            daysInWeek: daysInWeek,
            startDate: startDate,
            type: type,
            left: xScale(i)
          }))
        ));
      }
      return weeks;
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  (0, _createClass3["default"])(Weeks, [{
    key: 'render',
    value: function render() {
      var weeks = this._renderWeeks();
      return _react2["default"].createElement(
        'g',
        null,
        weeks
      );
    }
  }]);
  return Weeks;
}(_react.Component);

exports["default"] = Weeks;


Weeks.propTypes = {
  dataset: _react.PropTypes.object,
  maxCount: _react.PropTypes.number,
  mouseOverHandler: _react.PropTypes.func,
  mouseOutHandler: _react.PropTypes.func,
  height: _react.PropTypes.number,
  width: _react.PropTypes.number
};