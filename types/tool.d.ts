import {IToolCommonUrlObj, IToolComplexUrlObj, IToolUrlOption} from "./interface";

export declare type DateString = string;
export declare type SmartDate = Date|DateString|number;

/**
 * 数组工具类
 */
export declare class JToolArray {
}

/**
 * 时间工具类
 */
export declare class JToolDate {
    /**
     * 距离标准时区(STANDARD_TIMEZONE)的位移 --单位为分钟
     */
    static offsetFromStandardTimezone();

    /**
     * 想要日期格式的日期
     * @param _ 多态日期
     * @returns 日期
     */
    static wantDate(_:SmartDate): Date

    /**
     * 想要时间戳格式的日期
     * @param _ 多态日期
     * @returns 时间戳
     */
    static wantTimeInterval(_: SmartDate): number

    /**
     * 日期转换时间戳
     * @param date 日期
     * @returns 时间戳
     */
    static timeIntervalFromDate(date: Date): number;

    /**
     * 时间戳转换日期
     * @param timeInterval 时间戳
     * @returns 日期
     */
    static dateFromTimeInterval(timeInterval: number): Date;

    /**
     * 日期字符串转换时间戳
     * @param dateString 日期
     * @param timezone 时区
     * @returns 时间戳
     */
    static timeIntervalFromDateString(dateString: string, timezone?: number): number;

    /**
     * 时间戳转换日期字符串
     * @param timeInterval 时间戳
     * @param format 日期格式 如: YYYY-MM-DD HH:mm:ss
     * @returns 日期字符串
     */
    static dateStringFromTimeInterval(timeInterval: number, format?: string): string;

    /**
     * 日期字符串转换日期
     * #### 待完善
     * @param dateString 日期字符串
     * @param timezone 时区
     * @returns 日期
     */
    static dateFromDateString(dateString: string, timezone?: number): Date;

    /**
     * 日期转换日期字符串
     * @param date Date对象
     * @param format 格式化信息
     * @returns 日期字符串
     */
    static dateStringFromDate(date: Date, format?: string): string;

    /**
     * 获取当前日期对象
     * @returns 当前日期对象
     */
    static currentDate(): Date;

    /**
     * 获取当前日期字符串
     * @param format 字符串格式
     * @returns 当前日期字符串
     */
    static currentDateString(format?: string): string;

    /**
     * 获取当前时间戳
     * @returns 当前时间戳
     */
    static currentTimeInterval(): number;

    /**
     * 获取日期的距离
     * #### 待完善
     * @param startDate 起始多态日期
     * @param endDate 结束多态日期
     * @param justSeconds 只需要秒的总数
     * @returns [秒，分，小时，天，月, 年]
     */
    static distanceBetweenDate(startDate: Date|string|number, endDate: Date|string|number, justSeconds: boolean): number[];

    /**
     * 变换日期字符串格式
     * #### 待开发
     * @since ~1.1.*
     * @param dateString 日期字符串
     * @param fromFormat 输入格式
     * @param toFormat 输出格式
     * @param timezone 时区
     * @returns 字符串
     */
    static transformDateStringByFormat(dateString: string, fromFormat: string, toFormat?: string, timezone?: number): string;

    /**
     * 获取指定日期为星期几
     * @param date 多态日期
     * @returns 0~6 => 星期一~星期日
     */
    static weekDay(date: Date|string|number): number;

    /**
     * 获取某日期某天后的日期
     * @param beganDate 多态目标日期
     * @param days 天数
     * @returns 目的日期
     */
    static dateAfterDaysLater(beganDate: Date|string|number, days: number): Date;

    /**
     * 获取日期某天后的日期字符串
     * @param beganDate 多态目标日期
     * @param days 天数
     * @param format 格式化信息
     * @returns 目的日期字符串
     */
    static dateStringAfterDaysLater(beganDate: Date|string|number, days: number, format?: string): string;
}

/**
 * 数字工具类
 */
export declare class JToolNumber {
    /**
     * 整数补0
     * @param number 整数
     * @param length 最终的长度
     * @returns 整数字符串
     */
    static zeroPad(number: number, length: number): string
    /**
     * 字符补位
     * @param pad 字符
     * @param length 最终的长度
     * @param placeholder 补全字符
     * @returns 字符串
     */
    static leftPad(pad: string | number, length: number, placeholder: string | number): string
    /**
     * 小数部分有效数字保留
     * @param number 数字
     * @param digits 小数保留位数
     * @returns 数字的字符串
     */
    static fixDigits(number: number, digits: number): string

    /**
     * 返回正整数的字符串
     * @description 非正整数返回指定字符串或空字符串
     * @param number 数字
     * @param text 非正整数的返回（可空）
     * @returns 正整数字符串或者指定字符串
     */
    static positiveText(number: number, text: string): string
}

/**
 * 对象工具类
 */
export declare class JToolObject {
    /**
     * 删除对象某个属性
     * @param target 对象
     * @param propertyKey 属性
     * @returns 是否删除成功
     */
    static deleteProperty(target: object, propertyKey: string): boolean
    /**
     * 安全的获取链式属性
     * @example a.b.c.d
     * @param target 目标对象
     * @param pChain 对象链式属性
     * @returns {*}
     */
    static safeGet(target: object, ...pChain: any[]): any
}

export declare class JToolString {
    /**
     * 校验是否为手机号码
     * @param mobile 手机号码
     * @returns 结果
     */
    static isMobile(mobile: string): boolean
    /**
     * 校验是否为电话号码
     * @param phone 电话号码
     * @returns 结果
     */
    static isPhoneNumber(phone: string): boolean
    /**
     * 检验是否为邮箱
     * @param email 邮箱
     * @returns 结果
     */
    static isEmail(email: string): boolean
    /**
     * 校验是否为空字符串
     * @param string 字符串
     * @returns 结果
     */
    static isEmpty(string: string): boolean
    /**
     * 校验是否为验证码
     * @description 0~9 6位数字
     * @param verifyCode 验证码
     * @returns 结果
     */
    static isVerifyCode(verifyCode: string): boolean
    /**
     * 校验是否为密码
     * @param password 密码
     * @param minLength 最小长度
     * @param maxLength 最大长度
     * @returns 结果
     */
    static isPassword(password: string, minLength: number, maxLength: number): boolean
    /**
     * 去除数字字符串左边的补位0
     * @param c 数字字符串
     * @returns {*}
     */
    static numberRemoveLeftZero(c: string): string
    /**
     * 通过asc得出字符数值
     * @param ascChar asc字符
     * @returns 数值 A=0; B=1;
     */
    static numberFromASC(ascChar: string): number
    /**
     * 转换字符串到数字
     * @param string 字符串
     * @param force 是否强制转换非数字字符 (即为26进制数字)
     * @param offset 非数字时的初始值
     * @returns 数值
     */
    static numberFromString(string:string, force: boolean, offset?: number): number
    /**
     * 清除所有空格字符
     * @param string 字符串
     * @returns 结果字符串
     */
    static clearSpace(string: string): string
    /**
     * 清除所有逗号
     * @param string 字符串
     * @returns 结果字符串
     */
    static clearComma(string: string): string
    /**
     * 清除所有竖线
     * @param string 字符串
     * @returns 结果字符串
     */
    static clearVertical(string: string): string
    /**
     * 清除所有特殊字符
     * @description 即空格 逗号 及竖线
     * @param string 字符串
     * @returns 结果字符串
     */
    static clearClutter(string: string): string
}

/**
 * 网络地址工具类
 */
export declare class JToolUrl {
    /**
     * 合成URL完整地址
     * @param baseUrl 基础地址
     * @param subUrl 相对地址
     * @param parameters 参数
     * @returns 返回拼接后的地址
     */
    static urlFromPortion(baseUrl: string, subUrl: string, parameters: object): string
    /**
     * 分析Url并解析为对象结构
     * @param url 待分析Url
     * @param options 分析Url配置
     * @return 返回解析后的结果，url无效时返回Null
     */
    static portionFromUrl(url: string, options?: IToolUrlOption): IToolCommonUrlObj | IToolComplexUrlObj
}
