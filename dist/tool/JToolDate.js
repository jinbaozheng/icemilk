"use strict";
/**
 * Created by cuppi on 2016/11/25.
 */

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
// if ((moment as any).default) {
//   (moment as any) = (moment as any).default;
// }
// 北京时区(东八区)早于协调世界时
// const STANDARD_TIMEZONE = -480;
var STANDARD_TIMEZONE = 480;
/**
 * 时间工具类
 * @memberOf module:tool
 */

var DateTool = function () {
    function DateTool() {
        (0, _classCallCheck3.default)(this, DateTool);
    }

    (0, _createClass3.default)(DateTool, null, [{
        key: "offsetFromStandardTimezone",

        // 距离标准时区(STANDARD_TIMEZONE)的位移 --单位为分钟
        value: function offsetFromStandardTimezone() {
            return new Date().getTimezoneOffset();
        }
        /**
         * 当前日期是什么类型
         * @param {Date | string | number} _ 日期
         * @private
         * @returns {string}
         */

    }, {
        key: "whatType",
        value: function whatType(_) {
            if ((typeof _ === "undefined" ? "undefined" : (0, _typeof3.default)(_)) === 'object') {
                if (_ instanceof Date) {
                    return 'Date';
                }
            }
            return typeof _ === "undefined" ? "undefined" : (0, _typeof3.default)(_);
        }
        /**
         * 这个日期要做什么
         * @param {Date | string | number} _ 日期
         * @param {Function} dateDoing 日期格式做的事情
         * @param {Function} strDoing 字符串格式做的事情
         * @param {Function} numDoing 数字格式做的事情
         * @param {Function} otherDoing  其他格式做的事情
         * @private
         */

    }, {
        key: "whatTypeDoing",
        value: function whatTypeDoing(_, dateDoing, strDoing, numDoing, otherDoing) {
            if (typeof _ === 'string') {
                strDoing();
            }
            if (typeof _ === 'number') {
                numDoing();
            }
            if ((typeof _ === "undefined" ? "undefined" : (0, _typeof3.default)(_)) === 'object' && _ instanceof Date) {
                dateDoing();
            }
            if (otherDoing) {
                otherDoing();
            }
        }
        /**
         * 想要日期格式的日期
         * @param {Date | string | number} _ 日期
         * @returns {Date}
         */

    }, {
        key: "wantDate",
        value: function wantDate(_) {
            var result = null;
            DateTool.whatTypeDoing(_, function () {
                result = _;
            }, function () {
                result = DateTool.dateFromDateString(_);
            }, function () {
                result = DateTool.dateFromTimeInterval(_);
            });
            return result;
        }
        /**
         * 想要时间戳格式的日期
         * @param {Date | string | number} _ 日期
         * @returns {number}
         */

    }, {
        key: "wantTimeInterval",
        value: function wantTimeInterval(_) {
            var result = null;
            DateTool.whatTypeDoing(_, function () {
                result = DateTool.timeIntervalFromDate(_);
            }, function () {
                result = DateTool.timeIntervalFromDateString(_);
            }, function () {
                result = _;
            });
            return result;
        }
    }, {
        key: "transformFormatString",
        value: function transformFormatString(format) {
            if (format) {
                format = format.replace('yyyy', 'YYYY');
                format = format.replace('dd', 'DD');
                format = format.replace('hh', 'HH');
            }
            return format;
        }
        /**
         * 日期转换时间戳
         * @static
         * @param {Date} date 日期
         * @returns {number} 时间戳
         */

    }, {
        key: "timeIntervalFromDate",
        value: function timeIntervalFromDate(date) {
            return moment(date).unix();
        }
        /**
         * 时间戳转换日期
         * @param {number} timeInterval 时间戳
         * @returns {Date} 日期
         */

    }, {
        key: "dateFromTimeInterval",
        value: function dateFromTimeInterval(timeInterval) {
            return moment(timeInterval * 1000).toDate();
        }
        /**
         * 日期字符串转换时间戳
         * 注：时间格式需满足Date规范
         * 如 2017-05-23 18:56:00、2017/05/23
         * @param {string} dateString 日期
         * @param {string} timezone 时区
         * @returns {number} 时间戳
         */

    }, {
        key: "timeIntervalFromDateString",
        value: function timeIntervalFromDateString(dateString) {
            var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : STANDARD_TIMEZONE;

            return DateTool.timeIntervalFromDate(moment(dateString).utcOffset(timezone, true).toDate());
        }
        /**
         * 时间戳转换日期字符串
         * @param {number} timeInterval 时间戳
         * @param {string} format 日期格式 如: YYYY-MM-DD HH:mm:ss
         * @returns {string} 日期字符串
         */

    }, {
        key: "dateStringFromTimeInterval",
        value: function dateStringFromTimeInterval(timeInterval) {
            var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';

            format = DateTool.transformFormatString(format);
            return moment(timeInterval * 1000).utcOffset(STANDARD_TIMEZONE).format(format);
        }
        /**
         * 日期字符串转换日期 （待开发）
         * @param {string} dateString 日期字符串
         * @param {string} timezone 时区
         * @returns {Date} 日期
         */

    }, {
        key: "dateFromDateString",
        value: function dateFromDateString(dateString) {
            var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : STANDARD_TIMEZONE;

            return moment(dateString).utcOffset(timezone, true).toDate();
        }
        /**
         * 日期转换日期字符串
         * @param {Date} date Date对象
         * @param {string} format 格式化信息
         * @returns {string} 日期字符串
         */

    }, {
        key: "dateStringFromDate",
        value: function dateStringFromDate(date) {
            var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';

            format = DateTool.transformFormatString(format);
            return moment(date).utcOffset(STANDARD_TIMEZONE).format(format);
        }
        /**
         * 获取当前日期对象
         * @returns {Date} 当前日期对象
         */

    }, {
        key: "currentDate",
        value: function currentDate() {
            return moment().utcOffset(STANDARD_TIMEZONE).toDate();
        }
        /**
         * 获取当前日期字符串
         * @param {string} format 字符串格式
         * @returns {string} 当前日期字符串
         */

    }, {
        key: "currentDateString",
        value: function currentDateString() {
            var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'YYYY-MM-DD HH:mm:ss';

            format = DateTool.transformFormatString(format);
            return moment().utcOffset(STANDARD_TIMEZONE).format(format);
        }
        /**
         * 获取当前时间戳
         * @returns {number} 当前时间戳
         */

    }, {
        key: "currentTimeInterval",
        value: function currentTimeInterval() {
            return moment().unix();
        }
        // TODO 需要优化月份的算法
        /**
         * 获取(多态)日期的距离
         * @param {Date | string | number} startDate 起始日期
         * @param {Date | string | number} endDate 结束日期
         * @param {boolean} justSeconds 只需要秒的总数
         * @returns {Array} [秒，分，小时，天，月, 年]
         */

    }, {
        key: "distanceBetweenDate",
        value: function distanceBetweenDate(startDate, endDate, justSeconds) {
            var startTimeInterval = this.wantTimeInterval(startDate);
            var endTimeInterval = this.wantTimeInterval(endDate);
            var distance = endTimeInterval - startTimeInterval;
            if (justSeconds) {
                return [distance, 0, 0, 0, 0];
            }
            var sec = distance % 60;
            distance = Math.floor(distance / 60);
            var min = distance % 60;
            distance = Math.floor(distance / 60);
            var hour = distance % 24;
            distance = Math.floor(distance / 24);
            var day = distance % 1000;
            var mou = Math.floor(distance / 1000);
            return [sec, min, hour, day, mou];
        }
        // TODO 待开发
        /**
         * 变换日期字符串格式 （待开发）
         * @since ~1.1.*
         * @param {string} dateString 日期字符串
         * @param {string} fromFormat 输入格式
         * @param {string} toFormat 输出格式
         * @returns {string} 字符串
         */

    }, {
        key: "transformDateStringByFormat",
        value: function transformDateStringByFormat(dateString, fromFormat, toFormat) {
            toFormat = DateTool.transformFormatString(toFormat);
            return moment(dateString).format(toFormat);
        }
        /**
         * 获取指定(多态)日期为星期几
         * @param {Date | string | number} date 日期
         * @returns {number} 0~6  星期一~星期日
         */

    }, {
        key: "weekDay",
        value: function weekDay(date) {
            return (DateTool.wantDate(date).getDay() + 6) % 7;
        }
        /**
         * 获取(多态)日期某天后的日期()
         * @param {Date | string | number} beganDate
         * @param {number} days
         * @returns {Date} 目的日期
         */

    }, {
        key: "dateAfterDaysLater",
        value: function dateAfterDaysLater(beganDate, days) {
            return new Date(DateTool.dateStringAfterDaysLater(beganDate, days));
        }
        /**
         * 获取(多态)日期某天后的日期字符串
         * @param {Date | string | number} beganDate 开始日期
         * @param {number} days 天数
         * @param {string} format 格式化信息
         * @returns {string} 目的日期字符串
         */

    }, {
        key: "dateStringAfterDaysLater",
        value: function dateStringAfterDaysLater(beganDate, days) {
            var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'YYYY-MM-DD';

            format = DateTool.transformFormatString(format);
            return moment(beganDate).add(days, 'days').format(format);
        }
    }]);
    return DateTool;
}();

exports.default = DateTool;
//# sourceMappingURL=JToolDate.js.map
