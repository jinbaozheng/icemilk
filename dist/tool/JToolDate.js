'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JToolNumber = require('./JToolNumber.js');

var _JToolNumber2 = _interopRequireDefault(_JToolNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateTool = function () {
  function DateTool() {
    (0, _classCallCheck3.default)(this, DateTool);
  }

  (0, _createClass3.default)(DateTool, null, [{
    key: 'timeIntervalFromDateString',
    value: function timeIntervalFromDateString(dateString) {
      return DateTool.timeIntervalFromDate(new Date(dateString));
    }
  }, {
    key: 'timeIntervalFromDate',
    value: function timeIntervalFromDate(date) {
      return Date.parse(date) / 1000;
    }
  }, {
    key: 'dateStringFromTimeInterval',
    value: function dateStringFromTimeInterval(timeInterval, format) {
      if (format) {
        return DateTool.dateStringFromDate(new Date(timeInterval * 1000), format);
      } else {
        return DateTool.dateStringFromDate(new Date(timeInterval * 1000), 'yyyy-MM-dd hh:mm:ss');
      }
    }
  }, {
    key: 'dateFromTimeInterval',
    value: function dateFromTimeInterval(timeInterval) {
      return new Date(timeInterval * 1000);
    }
  }, {
    key: 'distanceBetweenTimeInterval',
    value: function distanceBetweenTimeInterval(startTimeInterval, endTimeInterval, justSeconds) {
      var distance = endTimeInterval - startTimeInterval;
      if (justSeconds) {
        return [distance, 0, 0, 0, 0];
      }
      var sec = distance % 60;
      distance = parseInt(distance / 60);
      var min = distance % 60;
      distance = parseInt(distance / 60);
      var hour = distance % 24;
      distance = parseInt(distance / 24);
      var day = distance % 30;
      var mou = parseInt(distance / 30);
      return [sec, min, hour, day, mou];
    }
  }, {
    key: 'distanceBetweenDate',
    value: function distanceBetweenDate(startDate, endDate, justSeconds) {
      return DateTool.distanceBetweenTimeInterval(DateTool.timeIntervalFromDate(startDate), DateTool.timeIntervalFromDate(endDate), justSeconds);
    }
  }, {
    key: 'distanceBetweenDateString',
    value: function distanceBetweenDateString(startDateString, endDateString, justSeconds) {
      return DateTool.distanceBetweenTimeInterval(DateTool.timeIntervalFromDateString(startDateString), DateTool.timeIntervalFromDateString(endDateString), justSeconds);
    }
  }, {
    key: 'dateStringFromDate',
    value: function dateStringFromDate(date, format) {
      var paddNum = function paddNum(num) {
        num += '';
        return num.replace(/^(\d)$/, '0$1');
      };

      var cfg = {
        yyyy: date.getFullYear(),
        yy: date.getFullYear().toString().substring(2),
        M: date.getMonth() + 1,
        MM: paddNum(date.getMonth() + 1),
        d: date.getDate(),
        dd: paddNum(date.getDate()),
        hh: date.getHours(),
        mm: paddNum(date.getMinutes()),
        ss: paddNum(date.getSeconds()) };
      format || (format = 'yyyy-MM-dd hh:mm:ss');
      return format.replace(/([a-z])(\1)*/ig, function (m) {
        return cfg[m];
      });
    }
  }, {
    key: 'dateFromDateString',
    value: function dateFromDateString(dateString, format) {
      return new Date(dateString);
    }
  }, {
    key: 'currentDate',
    value: function currentDate() {
      return new Date();
    }
  }, {
    key: 'currentDateString',
    value: function currentDateString(format) {
      if (format) {
        return DateTool.dateFromTimeInterval(DateTool.currentTimeInterval(), format);
      }
      return DateTool.dateFromTimeInterval(DateTool.currentTimeInterval());
    }
  }, {
    key: 'currentTimeInterval',
    value: function currentTimeInterval() {
      return parseInt(Date.now() / 1000);
    }
  }, {
    key: 'transformDateStringByFormat',
    value: function transformDateStringByFormat(dateString, fromFormat, toFormat) {
      var timeInterval = DateTool.timeIntervalFromDateString(dateString, fromFormat);
      return DateTool.dateStringFromTimeInterval(timeInterval, toFormat);
    }
  }, {
    key: 'weekDayFromDate',
    value: function weekDayFromDate(date) {
      return date.getDay();
    }
  }, {
    key: 'weekDayFromDateString',
    value: function weekDayFromDateString(dateString) {
      return DateTool.weekDayFromDate(DateTool.dateFromDateString(dateString, format));
    }
  }, {
    key: 'dateSeveralDaysLater',
    value: function dateSeveralDaysLater(beganDate, days) {
      var endDate = new Date();
      endDate.setDate(beganDate.getDate() + days);
      var y = endDate.getFullYear();
      var m = void 0;
      var d = void 0;

      if (endDate.getMonth() > 8) {
        m = endDate.getMonth() + 1;
      } else {
        m = '0' + (endDate.getMonth() + 1);
      }
      if (endDate.getDate() > 9) {
        d = endDate.getDate();
      } else {
        d = '0' + endDate.getDate();
      }
      return y + '-' + m + '-' + d;
    }
  }, {
    key: 'dateStringSeveralDaysLater',
    value: function dateStringSeveralDaysLater(beganDateString, days) {
      var beganDate = DateTool.dateFromDateString(beganDateString);
      var endDate = new Date(beganDate);
      endDate.setDate(beganDate.getDate() + days);
      var y = endDate.getFullYear();
      var m = void 0;
      var d = void 0;

      if (endDate.getMonth() > 8) {
        m = endDate.getMonth() + 1;
      } else {
        m = '0' + (endDate.getMonth() + 1);
      }
      if (endDate.getDate() > 9) {
        d = endDate.getDate();
      } else {
        d = '0' + endDate.getDate();
      }
      return y + '-' + m + '-' + d;
    }
  }]);
  return DateTool;
}();

exports.default = DateTool;