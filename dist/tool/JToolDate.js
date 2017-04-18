'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by cuppi on 2016/11/25.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _JToolNumber = require('./JToolNumber.js');

var _JToolNumber2 = _interopRequireDefault(_JToolNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateTool = function () {
    function DateTool() {
        _classCallCheck(this, DateTool);
    }

    _createClass(DateTool, null, [{
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

        // 当前日期

    }, {
        key: 'currentDate',
        value: function currentDate() {
            return new Date();
        }

        // 格式化日期

    }, {
        key: 'formatDateToString',
        value: function formatDateToString(date, format) {
            var paddNum = function paddNum(num) {
                num += '';
                return num.replace(/^(\d)$/, '0$1');
            };
            // 指定格式字符
            var cfg = {
                yyyy: date.getFullYear(), // 年 : 4位
                yy: date.getFullYear().toString().substring(2), // 年 : 2位
                M: date.getMonth() + 1, // 月 : 如果1位的时候不补0
                MM: paddNum(date.getMonth() + 1), // 月 : 如果1位的时候补0
                d: date.getDate(), // 日 : 如果1位的时候不补0
                dd: paddNum(date.getDate()), // 日 : 如果1位的时候补0
                hh: date.getHours(), // 时
                mm: paddNum(date.getMinutes()), // 分
                ss: paddNum(date.getSeconds()) // 秒
            };
            format || (format = 'yyyy-MM-dd hh:mm:ss');
            return format.replace(/([a-z])(\1)*/ig, function (m) {
                return cfg[m];
            });
        }

        // 转换 2016-05-02 或 2016/05/01等 类型
        // 到 2016年05月03日

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

        // 转换 2016-05-02 或 2016/05/01等 类型

    }, {
        key: 'formatStringToDate',
        value: function formatStringToDate(date, separator) {
            var _date = date.split(separator);
            // 月份从0 开始
            return new Date(_date[0], parseInt(_date[1]) - 1, _date[2]);
        }

        // 转换 2016-05-02 或 2016/05/01等 类型

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
        // 格式化为   2015-01-02

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