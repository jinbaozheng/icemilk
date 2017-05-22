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
    key: 'timeIntervalFromDate',
    value: function timeIntervalFromDate(dateString) {
      var stringTime = dateString;
      var timestamp2 = Date.parse(new Date(stringTime));
      timestamp2 = timestamp2 / 1000;
      return timestamp2;
    }
  }, {
    key: 'dateFromTimeInterval',
    value: function dateFromTimeInterval(timeInterval, format) {
      return DateTool.formatDateToString(new Date(timeInterval * 1000), format);
    }
  }, {
    key: 'distanceBetweenTimeInterval',
    value: function distanceBetweenTimeInterval(leftTimeInterval, rightTimeInterval) {
      var distance = rightTimeInterval - leftTimeInterval;
      var sec = distance % 60;
      distance = parseInt(distance / 60);
      var min = distance % 60;
      distance = parseInt(distance / 60);
      var hour = distance % 24;
      distance = parseInt(distance / 24);
      var day = distance % 30;
      var mou = parseInt(distance / 30);
      var result = [mou, day, hour, min, sec];
      result.reverse();
      return result;
    }
  }, {
    key: 'chineseTimeFromTime',
    value: function chineseTimeFromTime(time, unit) {
      if (unit === 'm') {
        var originSeconds = parseInt(time * 60);
        var seconds = parseInt(originSeconds % 60);
        var originMinutes = parseInt(originSeconds / 60);
        var minutes = parseInt(originMinutes % 60);
        var originHours = parseInt(originMinutes / 60);
        var hours = parseInt(originHours % 25);
        return hours + '小时' + minutes + '分钟';
      }
    }
  }, {
    key: 'currentDate',
    value: function currentDate() {
      return new Date();
    }
  }, {
    key: 'currentTime',
    value: function currentTime() {
      return new Date();
    }
  }, {
    key: 'formatDateToString',
    value: function formatDateToString(date, format) {
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
    key: 'formatDateToChineseDate',
    value: function formatDateToChineseDate(date, separator, nozero) {
      var _date = date.split(separator);
      var location = 0;
      var unitList = ['日', '月', '年'];
      var result = '';
      while (_date.length > 0 && location < unitList.length) {
        var num = _date.pop();
        if (nozero) {
          result = +num + unitList[location] + result;
        } else {
          result = _JToolNumber2.default.prefixInteger(num, 2) + unitList[location] + result;
        }
        location++;
      }
      return result;
    }
  }, {
    key: 'formatStringToDate',
    value: function formatStringToDate(date, separator) {
      var _date = date.split(separator);

      return new Date(_date[0], parseInt(_date[1]) - 1, _date[2]);
    }
  }, {
    key: 'formatDateStringToDateString',
    value: function formatDateStringToDateString(date, separator, toSeparator) {
      return date.split(separator).join(toSeparator);
    }
  }, {
    key: 'partFromDate',
    value: function partFromDate(date, separator, part) {
      if (date === '' || date === '暂无' || date === undefined) {
        return '';
      } else {
        var _date = date.split(separator);
        _date.reverse();
        var _result = [];
        var i = 0;
        while (part !== 0) {
          if (part & 1) {
            if (i >= _date.length) {
              break;
            }
            _result.push(_date[i]);
          }
          part = part >> 1;
          i++;
        }
        _result.reverse();
        return _result.join(separator);
      }
    }
  }, {
    key: 'weekDay',
    value: function weekDay(date) {
      return date.getDay();
    }
  }, {
    key: 'weekDayFromDate',
    value: function weekDayFromDate(date) {
      return DateTool.weekDay(DateTool.formatStringToDate(date, '-'));
    }
  }, {
    key: 'getDateByAddDay',
    value: function getDateByAddDay(date, addDay) {
      var dd = new Date();
      dd.setDate(dd.getDate() + addDay);
      var y = dd.getFullYear();
      var m = void 0;
      var d = void 0;
      if (dd.getMonth() > 8) {
        m = dd.getMonth() + 1;
      } else {
        m = '0' + (dd.getMonth() + 1);
      }
      if (dd.getDate() > 9) {
        d = dd.getDate();
      } else {
        d = '0' + dd.getDate();
      }
      return y + '-' + m + '-' + d;
    }
  }, {
    key: 'getAddDayFromDateToDate',
    value: function getAddDayFromDateToDate(fromDate, toDate, separator) {
      try {
        var addDay = DateTool.formatStringToDate(toDate, separator) - DateTool.formatStringToDate(fromDate, separator);
        return addDay / 1000 / 60 / 60 / 24;
      } catch (e) {
        throw e;
      }
    }
  }]);
  return DateTool;
}();

exports.default = DateTool;