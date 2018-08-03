import NetworkTrade from "../src/network/JNetworkTrade";
import TradeManager from "../src/util/JManagerTrade";

export declare class JManagerSeat {
  /**
   * 单例方法
   * @returns {SeatManager}
   */
  static defaultManager()
  /**
   * 智能选座
   * @param smartSeats
   * @param count
   * @returns {Promise}
   */
  static smartAutoSelected(smartSeats, count)
  /**
   * 获取座位图时需要的参数
   * @param platform 平台类型
   * @param screening 平台数据
   * @returns {Object} 平台需要的参数
   */
  static seatParasFromScreening(platform, screening)
  /**
   * 对原始座位图进行智能转换
   * @param type 平台类型
   * @param seatData 座位图原始数据
   * @returns {Array} 智能座位图列表
   */
  smartSeatsFromSeats(type, seatData)
  /**
   * 获取智能座位图元数据
   * @param type 平台类型
   * @param smartSeats 智能座位图
   * @returns {{smartSeats: Array, seatRowData: Array.<*>}} 智能座位图详细信息
   */
  smartSeatDataFromSmartSeats(type, smartSeats)
  /**
   * 对原始座位图进行智能转换
   * @param type 平台类型
   * @param seatData 座位图原始数据
   * @returns {{smartSeats: Array, seatRowData: Array.<*>}} 智能座位图详细信息
   */
  smartSeatDataFromSeats(type, seatData)
}

export declare class JManagerTrade {
  /**
   * 获取交易商务参数（与座位无关的）
   * @param platform 平台类型
   * @param platformData 平台数据
   * @param filmId 电影Id
   * @param filmName 电影名称
   * @param cinemaId 影院Id
   * @param cinemaName 影院名称
   * @returns {*} 商务参数
   */
  static tradeParasFromPlatform(platform, platformData, filmId, filmName, cinemaId, cinemaName): any
  /**
   * 获取锁座处理者
   * @param type 平台类型
   * @param paras 参数
   * @returns {*} 返回请求promise
   */
  lockSeatHandlerFrom(type, paras): Promise<any>
  /**
   * 获取下订单处理者
   * @param type 平台类型
   * @param paras 参数
   * @returns {{terminate, then}|*} 返回请求promise
   */
  confirmOrderHandlerFrom(type, paras): Promise<any>
  /**
   * 获取锁座时需要的座位参数
   * @param type 平台类型
   * @param seatList 座位列表（需要购买的）
   * @param mobile 手机号码
   * @param openId 身份标识符（目前跟手机号码一样）
   * @returns {*} 返回参数对象
   */
  seatInforParas(type, seatList, mobile, openId?): any
  /**
   * 购票（执行锁座 下订单 的事务）
   * @param type 平台类型
   * @param tradeParas 商务参数（与座位无关的参数集合）
   * @param seatList 座位列表
   * @param mobile 手机号码
   * @returns {*} 返回请求promise
   */
  buyTicket(type, tradeParas, seatList, mobile): {next}
  /**
   * 锁座
   * @param type 平台类型
   * @param tradeParas 商务参数（与座位无关的参数集合）
   * @param seatList 座位列表
   * @param mobile 手机号码
   * @returns {Promise} 返回请求promise
   */
  lockSeat(type, tradeParas, seatList, mobile): Promise<any>
  /**
   * 确认订单
   * @param type 平台类型
   * @param lockSeatResultData 锁座成功返回的数据
   * @returns {Promise}
   */
  applyOrder(type, lockSeatResultData): Promise<any>

}
