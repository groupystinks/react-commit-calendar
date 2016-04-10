"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateByDays = getDateByDays;
var totalWeeks = exports.totalWeeks = 53;

var today = exports.today = new Date();
var todayInWeek = exports.todayInWeek = today.getDay();

function getDateByDays(date, days) {
  var target = new Date(date);
  target.setDate(date.getDate() + days);
  return target;
}

var lastYearToday = exports.lastYearToday = getDateByDays(today, -364);
var lastYearTodayInWeek = exports.lastYearTodayInWeek = lastYearToday.getDay();