export declare class JToolArray {
}

export declare class JToolDate {
  /**
   * 日期转换时间戳
   * @static
   * @param {Date} date 日期
   * @returns {number} 时间戳
   */
  static timeIntervalFromDate(date: Date): number
  /**
   * 时间戳转换日期
   * @param {number} timeInterval 时间戳
   * @returns {Date} 日期
   */
  static dateFromTimeInterval(timeInterval: number): Date
  /**
   * 日期字符串转换时间戳
   * 注：时间格式需满足Date规范
   * 如 2017-05-23 18:56:00、2017/05/23
   * @param {string} dateString 日期
   * @param {string} format 格式化信息
   * @returns {number} 时间戳
   */
  static timeIntervalFromDateString(dateString: string, format?: string): number
  /**
   * 时间戳转换日期字符串
   * @param {number} timeInterval 时间戳
   * @param {string} format 日期格式 如: yyyy-MM-dd hh:mm:ss
   * @returns {string} 日期字符串
   */
  static dateStringFromTimeInterval(timeInterval: number, format?: string): string
  /**
   * 日期转换日期字符串
   * @param {Date} date Date对象
   * @param {string} format 格式化信息
   * @returns {string} 日期字符串
   */
  static dateStringFromDate(date: Date, format?: string): string
  /**
   * 日期字符串转换日期 （待开发）
   * @since ~1.1.*
   * @param {string} dateString 日期字符串
   * @param {string} format 日期格式
   * @returns {Date} 日期
   */
  static dateFromDateString(dateString: string, format?:string): Date
  /**
   * 获取(多态)日期的距离
   * @param {Date | string | number} startDate 起始日期
   * @param {Date | string | number} endDate 结束日期
   * @param {boolean} justSeconds 只需要秒的总数
   * @returns {Array} [秒，分，小时，天，月, 年]
   */
  static distanceBetweenDate(startDate: Date|string|number, endDate: Date|string|number, justSeconds: boolean): number[]
  /**
   * 获取当前日期对象
   * @returns {Date} 当前日期对象
   */
  static currentDate(): Date
  /**
   * 获取当前日期字符串
   * @param {string} format 字符串格式
   * @returns {string} 当前日期字符串
   */
  static currentDateString(format?: string): string
  /**
   * 获取当前时间戳
   * @returns {number} 当前时间戳
   */
  static currentTimeInterval(): number
  /**
   * 变换日期字符串格式 （待开发）
   * @since ~1.1.*
   * @param {string} dateString 日期字符串
   * @param {string} fromFormat 输入格式
   * @param {string} toFormat 输出格式
   * @returns {string} 字符串
   */
  static transformDateStringByFormat(dateString: string, fromFormat: string, toFormat: string): string
  /**
   * 获取指定(多态)日期为星期几
   * @param {Date | string | number} date 日期
   * @returns {number} 0~6  星期一~星期日
   */
  static weekDay(date: Date|string|number): number
  /**
   * 获取(多态)日期某天后的日期()
   * @param {Date | string | number} beganDate
   * @param {number} days
   * @returns {Date} 目的日期
   */
  static dateAfterDaysLater(beganDate: Date|string|number, days: number): Date
  /**
   * 获取(多态)日期某天后的日期字符串
   * @param {Date | string | number} beganDate 开始日期
   * @param {number} days 天数
   * @returns {string} 目的日期字符串
   */
  static dateStringAfterDaysLater(beganDate: Date|string|number, days: number): string
}

export declare class JToolNumber {
  /**
   * 整数补0
   * @param {number} number 整数
   * @param {number} length 最终的长度
   * @returns {string}  整数字符串
   */
  static zeroPad(number: number, length: number): string
  /**
   * 字符补位
   * @param {number | string} pad 字符
   * @param {number} length 最终的长度
   * @param {number, string} placeholder 补全字符 default 0
   * @returns {string}  字符串
   */
  static leftPad(pad: string | number, length: number, placeholder: string | number): string
  /**
   * 小数部分有效数字保留
   * @param {number} number 数字
   * @param {number} digits 小数保留位数
   * @returns {string} 数字的字符串
   */
  static fixDigits(number: number, digits: number): string
  /**
   * 返回正整数的字符串（非正整数返回指定字符串或空字符串）
   * @param {number} number 数字
   * @param {string} text 非正整数的返回（可空）
   * @returns {string} 正整数字符串或者指定字符串
   */
  static positiveText(number: number, text: string): string
}

export declare class JToolObject {
  /**
   * 删除对象某个属性
   * @param {object} target 对象
   * @param {string} propertyKey 属性
   * @returns {boolean} 是否删除成功
   */
  static deleteProperty(target: object, propertyKey: string): boolean
  /**
   * 安全的获取链式属性 eg: a.b.c.d
   * @param target 目标对象
   * @param pChain 对象链式属性
   * @returns {*}
   */
  static safeGet(target: object, ...pChain: any[]): any
}

export declare class JToolString {
  /**
   * 校验是否为手机号码
   * @param {string} mobile 手机号码
   * @returns {boolean} 结果
   */
  static isMobile(mobile: string): boolean
  /**
   * 校验是否为电话号码
   * @param {string} phone 电话号码
   * @returns {boolean} 结果
   */
  static isPhoneNumber(phone: string): boolean
  /**
   * 检验是否为邮箱
   * @param {string} email 邮箱
   * @returns {boolean} 结果
   */
  static isEmail(email: string): boolean
  /**
   * 校验是否为空字符串
   * @param {string} string 字符串
   * @returns {boolean} 结果
   */
  static isEmpty(string: string): boolean
  /**
   * 校验是否为验证码（即0~9 6位数字）
   * @param {string} verifycode 验证码
   * @returns {boolean} 结果
   */
  static isVerifyCode(verifycode: string): boolean
  /**
   * 校验是否为密码
   * @param {string} password 密码
   * @param {number} minLength 最小长度
   * @param {number} maxLength 最大长度
   * @returns {boolean} 结果
   */
  static isPassword(password: string, minLength: number, maxLength: number): boolean
  /**
   * 去除数字左边所有0
   * @param c
   * @returns {*}
   */
  static numberRemoveLeftZero(c: string): string
  /**
   * 通过asc得出字符数值
   * @param {string} ascChar asc字符
   * @returns {number} 数值 A=0; B=1;
   */
  static numberFromASC(ascChar: string): number
  /**
   * 转换字符串到数字
   * @param {string} string 字符串
   * @param {boolean} force 是否强制转换非数字字符 (即为26进制数字)
   * @param {number} offset 非数字时的初始值
   * @returns {number} 数值
   */
  static numberFromString(string:string, force: boolean, offset: number): number
  /**
   * 清除所有空格字符
   * @param {string} string 字符串
   * @returns {string} 结果字符串
   */
  static clearSpace(string: string): string
  /**
   * 清除所有逗号
   * @param {string} string 字符串
   * @returns {string} 结果字符串
   */
  static clearComma(string: string): string
  /**
   * 清除所有竖线
   * @param {string} string 字符串
   * @returns {string} 结果字符串
   */
  static clearVertical(string: string): string
  /**
   * 清除所有特殊字符
   * @param {string} string 字符串
   * @returns {string} 结果字符串
   */
  static clearClutter(string: string): string
}

export declare class JToolUrl {
  /**
   * 合成URL完整地址
   * @param {string} baseUrl 基础地址
   * @param {string} subUrl 相对地址
   * @param {string} parameters 参数
   * @returns {string} 返回拼接后的地址
   */
  static urlFromPortion(baseUrl, subUrl, parameters)
}
