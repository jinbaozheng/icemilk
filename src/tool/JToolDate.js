/**
 * Created by cuppi on 2016/11/25.
 */

import NumberTool from './JToolNumber.js';

/**
 * 时间工具类
 * @alias tool/JToolDate
 */
class DateTool {

  static whatType(_) {
    if (typeof(_) === 'object') {
      if (_ instanceof Date) {
        return 'Date';
      }
    }
    return typeof(_);
  }

  static whatTypeDoing(_, dateDoning, strDoing, numDoing, otherDoing) {
    if (typeof(_) === 'string') {
      strDoing();
    }
    if (typeof(_) === 'number') {
      numDoing();
    }
    if (typeof(_) === 'object' && _ instanceof Date) {
      dateDoning();
    }
    if (otherDoing) {
      otherDoing();
    }
  }

  static wantDate(_) {
    let result = null;
    DateTool.whatTypeDoing(_, () => {
      result = _;
    }, () => {
      result = DateTool.dateFromDateString(_);
    }, () => {
      result = DateTool.dateFromTimeInterval(_);
    });
    return result;
  }

  static wantTimeInterval(_) {
    let result = null;
    DateTool.whatTypeDoing(_, () => {
      result = DateTool.timeIntervalFromDate(_);
    }, () => {
      result = DateTool.timeIntervalFromDateString(_);
    }, () => {
      result = _;
    });
    return result;
  }

  /**
   * 日期转换时间戳
   * @static
   * @param {Date} date 日期
   * @returns {number} 时间戳
   */
  static timeIntervalFromDate(date) {
    return Date.parse(date) / 1000;
  }


  /**
   * 时间戳转换日期
   * @param {number} timeInterval 时间戳
   * @returns {Date} 日期
   */
  static dateFromTimeInterval(timeInterval) {
    return new Date(timeInterval * 1000);
  }

  /**
   * 日期字符串转换时间戳
   * 注：时间格式需满足Date规范
   * 如 2017-05-23 18:56:00、2017/05/23
   * @param {string} dateString 日期
   * @returns {number} 时间戳
   */
  static timeIntervalFromDateString(dateString) {
    return DateTool.timeIntervalFromDate(new Date(dateString));
  }

  /**
   * 时间戳转换日期字符串
   * @param {number} timeInterval 时间戳
   * @param {string} format 日期格式 如: yyyy-MM-dd hh:mm:ss
   * @returns {string} 日期字符串
   */
  static dateStringFromTimeInterval(timeInterval, format) {
    if (format) {
      return DateTool.dateStringFromDate(new Date(timeInterval * 1000), format);
    } else {
      return DateTool.dateStringFromDate(new Date(timeInterval * 1000), 'yyyy-MM-dd hh:mm:ss');
    }
  }

  /**
   * 日期转换日期字符串
   * @param {Date} date Date对象
   * @param {string} format 格式化信息
   * @returns {string} 日期字符串
   */
  static dateStringFromDate(date, format) {
    let paddNum = function (num) {
      num += '';
      return num.replace(/^(\d)$/, '0$1');
    };
    // 指定格式字符
    let cfg = {
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

  // TODO 待开发
  /**
   * 日期字符串转换日期 （待开发）
   * @since ~1.1.*
   * @param {string} dateString 日期字符串
   * @param {string} format 日期格式
   * @returns {Date} 日期
   */
  static dateFromDateString(dateString, format) {
    return new Date(dateString);
  }

  // TODO 需要优化月份的算法
  /**
   * 获取(多态)日期的距离
   * @param {Date | string | number} startDate 起始日期
   * @param {Date | string | number} endDate 结束日期
   * @param {bool} justSeconds 只需要秒的总数
   * @returns {Array} [秒，分，小时，天，月, 年]
   */
  static distanceBetweenDate(startDate, endDate, justSeconds) {
    let startTimeInterval = this.wantTimeInterval(startDate);
    let endTimeInterval = this.wantTimeInterval(endDate);
    let distance = endTimeInterval - startTimeInterval;
    if (justSeconds) {
      return [distance, 0, 0, 0, 0];
    }
    let sec = distance % 60;
    distance = parseInt(distance / 60);
    let min = distance % 60;
    distance = parseInt(distance / 60);
    let hour = distance % 24;
    distance = parseInt(distance / 24);
    let day = distance % 30;
    let mou = parseInt(distance / 30);
    return [sec, min, hour, day, mou];
  }

  /**
   * 获取当前日期对象
   * @returns {Date} 当前日期对象
   */
  static currentDate() {
    return new Date();
  }

  /**
   * 获取当前日期字符串
   * @param {string} format 字符串格式
   * @returns {string} 当前日期字符串
   */
  static currentDateString(format) {
    if (format) {
      return DateTool.dateStringFromTimeInterval(DateTool.currentTimeInterval(), format);
    }
    return DateTool.dateStringFromTimeInterval(DateTool.currentTimeInterval());
  }

  /**
   * 获取当前时间戳
   * @returns {number} 当前时间戳
   */
  static currentTimeInterval() {
    return parseInt(Date.now() / 1000);
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
  static transformDateStringByFormat(dateString, fromFormat, toFormat) {
    let timeInterval = DateTool.timeIntervalFromDateString(dateString, fromFormat);
    return DateTool.dateStringFromTimeInterval(timeInterval, toFormat);
  }

  /**
   * 获取指定(多态)日期为星期几
   * @param {Date | string | number} date 日期
   * @returns {number} 0~6  星期一~星期日
   */
  static weekDay(date) {
    return (DateTool.wantDate(date).getDay() + 6) % 7;
  }

  /**
   * 获取(多态)日期某天后的日期()
   * @param {Date | string | number} beganDate
   * @param {number} days
   * @returns {Date} 目的日期
   */
  static dateAfterDaysLater(beganDate, days) {
    return new Date(DateTool.dateStringAfterDaysLater(beganDate, days));
  }

  /**
   * 获取(多态)日期某天后的日期字符串
   * @param {Date | string | number} beganDate 开始日期
   * @param {number} days 天数
   * @returns {string} 目的日期字符串
   */
  static dateStringAfterDaysLater(beganDate, days) {
    beganDate = DateTool.wantDate(beganDate);
    let endDate = new Date(beganDate);
    endDate.setDate(beganDate.getDate() + days);
    let y = endDate.getFullYear();
    let m;
    let d;

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

}

export default DateTool;
