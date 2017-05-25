/**
 * Created by cuppi on 2016/11/25.
 */

import NumberTool from './JToolNumber.js';

/**
 * 时间工具类
 * @alias tool/JToolDate
 */
class DateTool {

  /**
   * 日期字符串转换时间戳
   * 注：时间格式需满足Date规范
   * 如 2017-05-23 18:56:00、2017/05/23
   * @param dateString 日期
   * @returns {number}
   */
  static timeIntervalFromDateString(dateString) {
    return DateTool.timeIntervalFromDate(new Date(dateString));
  }

  /**
   * 日期转换时间戳
   * @static
   * @param date 日期
   * @returns {number}
   */
  static timeIntervalFromDate(date) {
    return Date.parse(date) / 1000;
  }

  /**
   * 时间戳转换日期字符串
   * @param timeInterval 时间戳
   * @param format 日期格式 如: yyyy-MM-dd hh:mm:ss
   * @returns {*}
   */
  static dateStringFromTimeInterval(timeInterval, format) {
    if (format) {
      return DateTool.dateStringFromDate(new Date(timeInterval * 1000), format);
    } else {
      return DateTool.dateStringFromDate(new Date(timeInterval * 1000), 'yyyy-MM-dd hh:mm:ss');
    }
  }

  /**
   * 时间戳转换日期
   * @param timeInterval 时间戳
   * @returns {Date} 日期
   */
  static dateFromTimeInterval(timeInterval) {
    return new Date(timeInterval * 1000);
  }

  // TODO 需要优化月份的算法
  /**
   * 时间戳的距离
   * @param startTimeInterval 起始时间戳
   * @param endTimeInterval 结束时间戳
   * @param justSeconds 只需要秒的总数
   * @returns {Array} [秒，分，小时，天，月, 年]
   */
  static distanceBetweenTimeInterval(startTimeInterval, endTimeInterval, justSeconds) {
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
   * 时间戳的距离
   * @param startDate 起始日期
   * @param endDate 结束日期
   * @param justSeconds 只需要秒的总数
   * @returns {Array} [秒，分，小时，天，月, 年]
   */
  static distanceBetweenDate(startDate, endDate, justSeconds) {
    return DateTool.distanceBetweenTimeInterval(DateTool.timeIntervalFromDate(startDate), DateTool.timeIntervalFromDate(endDate), justSeconds)
  }

  /**
   * 时间戳的距离
   * @param startDateString 起始日期字符串
   * @param endDateString 结束日期字符串
   * @param justSeconds 只需要秒的总数
   * @returns {Array} [秒，分，小时，天，月, 年]
   */
  static distanceBetweenDateString(startDateString, endDateString, justSeconds) {
    return DateTool.distanceBetweenTimeInterval(DateTool.timeIntervalFromDateString(startDateString), DateTool.timeIntervalFromDateString(endDateString), justSeconds)
  }

  /**
   * 获取日期的指定格式的字符串
   * @param date Date对象
   * @param format 格式化信息
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
   * 获取字符串的指定格式的日期 （待开发）
   * @param dateString 日期字符串
   * @param format 日期格式
   * @returns {Date}
   */
  static dateFromDateString(dateString, format) {
    return new Date(dateString);
  }

  /**
   * 获取当前日期对象
   * @returns {Date}
   */
  static currentDate() {
    return new Date();
  }

  /**
   * 获取当前日期字符串
   * @returns {Date}
   */
  static currentDateString(format) {
    if (format) {
      return DateTool.dateFromTimeInterval(DateTool.currentTimeInterval(), format);
    }
    return DateTool.dateFromTimeInterval(DateTool.currentTimeInterval());
  }

  /**
   * 获取当前时间戳
   * @returns {number}
   */
  static currentTimeInterval() {
    return parseInt(Date.now() / 1000);
  }

  // TODO 待开发
  /**
   * 变换日期字符串格式 （待开发）
   * @param dateString 日期字符串
   * @param fromFormat 输入格式
   * @param toFormat 输出格式
   * @returns {*}
   */
  static transformDateStringByFormat(dateString, fromFormat, toFormat) {
    let timeInterval = DateTool.timeIntervalFromDateString(dateString, fromFormat);
    return DateTool.dateStringFromTimeInterval(timeInterval, toFormat);
  }

  /**
   * 获取指定日期为星期几
   * @param date 日期对象
   * @returns {number} 0~6  星期一~星期日
   */
  static weekDayFromDate(date) {
    return date.getDay();
  }

  /**
   * 获取指定日期字符串为星期几
   * @param dateString 标准日期字符串
   * @param format 日期格式
   * @returns {number} 0~6  星期一~星期日
   */
  static weekDayFromDateString(dateString) {
    return DateTool.weekDayFromDate(DateTool.dateFromDateString(dateString, format));
  }

  /**
   * 指定日期的某天后
   * @param beganDate
   * @param days
   * @returns {string}
   */
  static dateSeveralDaysLater(beganDate, days) {
    let endDate = new Date();
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

  /**
   * 指定日期字符串的某天后
   * @param beganDateString 标准日期字符串
   * @param days 天数
   * @param format 日期格式化
   * @returns {string}
   */
  static dateStringSeveralDaysLater(beganDateString, days) {
    let beganDate = DateTool.dateFromDateString(beganDateString);
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
