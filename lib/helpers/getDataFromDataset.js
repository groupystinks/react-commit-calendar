"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

exports.getDataFromDataset = getDataFromDataset;
exports.getCount = getCount;
exports.getMaxCount = getMaxCount;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDataFromDataset() {
  var dataset = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var date = arguments[1];

  return dataset[date];
}

function getCount(dataset, date) {
  var data = getDataFromDataset(dataset, date) || {};
  return data.count || 0;
}

function getMaxCount(dataset) {
  var max = 0;
  var dates = (0, _keys2.default)(dataset);
  dates.forEach(function (date) {
    var count = getCount(dataset, date) || {};
    if (count > max) {
      max = count;
    }
  });
  return max;
}