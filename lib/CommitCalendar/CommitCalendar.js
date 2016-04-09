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

var _Weeks = require('./Weeks');

var _Weeks2 = _interopRequireDefault(_Weeks);

var _getDataFromDataset = require('../helpers/getDataFromDataset');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CommitCalendar = function (_Component) {
  (0, _inherits3["default"])(CommitCalendar, _Component);

  function CommitCalendar() {
    (0, _classCallCheck3["default"])(this, CommitCalendar);

    var _this = (0, _possibleConstructorReturn3["default"])(this, (0, _getPrototypeOf2["default"])(CommitCalendar).call(this));

    _this.mouseOverHandler = function (date, position) {
      _this.setState({
        isTipShown: true,
        date: date,
        position: {
          left: position.left,
          top: position.top
        }
      });
    };

    _this.mouseOutHandler = function () {
      _this.setState({ isTipShown: false });
    };

    _this._rendertip = function () {
      if (!_this.state.isTipShown) {
        return null;
      }
      var _this$props = _this.props;
      var dataset = _this$props.dataset;
      var unit = _this$props.unit;
      var marginLeft = _this$props.marginLeft;
      var marginTop = _this$props.marginTop;
      var _this$state = _this.state;
      var date = _this$state.date;
      var position = _this$state.position;

      var count = dataset[date] ? dataset[date].count : 0;
      var tipText = date.concat(' ').concat(count).concat(' ').concat(unit);
      return _react2["default"].createElement(
        'div',
        { style: {
            backgroundColor: 'rgba(80, 80, 80, 0.8)',
            borderRadius: '2px',
            color: '#fff',
            position: 'absolute',
            top: position.top - 21 + marginTop + 'px', // eslint-disable-line
            left: position.left - 80 + marginLeft + 'px', // eslint-disable-line
            height: '20px',
            width: '200px',
            textAlign: 'center' }
        },
        tipText,
        _react2["default"].createElement('div', { style: {
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid rgba(40, 40, 40, 1)',
            height: '0px',
            width: '0px',
            margin: '3px',
            position: 'absolute',
            top: 18 + 'px', // eslint-disable-line
            left: 85 + 'px' } // eslint-disable-line
        })
      );
    };

    _this.state = {
      isTipShown: false,
      date: '',
      position: {
        left: 0,
        top: 0
      }
    };
    return _this;
  }

  (0, _createClass3["default"])(CommitCalendar, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var marginBottom = _props.marginBottom;
      var marginLeft = _props.marginLeft;
      var marginRight = _props.marginRight;
      var marginTop = _props.marginTop;
      var height = _props.height;
      var width = _props.width;

      var svgHeight = height + marginTop + marginBottom;
      var svgWidth = width + marginLeft + marginRight;
      var maxCount = (0, _getDataFromDataset.getMaxCount)(this.props.dataset);
      var tip = this._rendertip();
      return _react2["default"].createElement(
        'div',
        null,
        _react2["default"].createElement(
          'svg',
          {
            height: svgHeight,
            width: svgWidth
          },
          _react2["default"].createElement(
            'g',
            {
              transform: 'translate(' + marginLeft + ', ' + marginTop + ')' // eslint-disable-line
            },
            _react2["default"].createElement(_Weeks2["default"], (0, _extends3["default"])({}, this.props, {
              maxCount: maxCount,
              mouseOverHandler: this.mouseOverHandler,
              mouseOutHandler: this.mouseOutHandler
            }))
          )
        ),
        tip
      );
    }
  }]);
  return CommitCalendar;
}(_react.Component);

exports["default"] = CommitCalendar;


CommitCalendar.propTypes = {
  dataset: _react.PropTypes.object.isRequired,
  colors: _react.PropTypes.array,
  height: _react.PropTypes.number,
  marginBottom: _react.PropTypes.number,
  marginLeft: _react.PropTypes.number,
  marginRight: _react.PropTypes.number,
  marginTop: _react.PropTypes.number,
  mouseOverHandler: _react.PropTypes.func,
  mouseOutHandler: _react.PropTypes.func,
  width: _react.PropTypes.number,
  unit: _react.PropTypes.string
};

CommitCalendar.defaultProps = {
  height: 110,
  width: 720,
  colors: ['#d6e685', '#8cc665', '#44a340', '#1e6823'],
  marginBottom: 0,
  marginLeft: 80,
  marginRight: 0,
  marginTop: 20,
  unit: 'contributions'
};