[TOC]

# 斗票WebSDK接口文档（v1.0.61）

## 模块：JUtil(Class) 

### 类：JManagerSeat

##### 1.获取单例实例

- 方法

  > ```java
  > static defaultManager()
  > ```


- 请求参数

  > | 请求参数 | 数据类型 | 数据说明 |
  > | :--- | :--- | :--- |
  > | -    | -    | -    |



- 返回数据

  > | 返回数据 | 数据类型   | 数据说明              |
  > | ---- | ------ | ----------------- |
  > | -    | Object | JManagerSeat的单例实例 |

- 调用示例

  > ```javascript
  > console.log(JManagerSeat.defaultManager());
  > ```

******

##### 2.智能选座

- 方法

  > ```java
  >   static smartAutoSelected(smartSeats, count) {}
  > ```


- 请求参数

  > | 请求参数       | 数据类型                              | 数据说明   |
  > | ---------- | --------------------------------- | ------ |
  > | smartSeats | Array                             | 座位图列表  |
  > | -          | [SmartSeatModel](#SmartSeatModel) | 智能座位模型 |
  > | count      | int                               | 需要的座位  |


- 返回数据

  > | 返回数据 | 数据类型    | 数据说明      |
  > | ---- | ------- | --------- |
  > | -    | promise | 智能选座的异步封装 |


- 调用示例

  > ```javascript
  > JManagerSeat.smartAutoSelected([], 4).then(data => {
  >   console.log(data);
  > }, error => {
  >   console.log(error);
  > });
  > ```

********

##### 3.获取座位图时需要的参数

- 方法

  > ```java
  >  static seatParasFromScreening(platform, screening){}
  > ```

- 请求参数

  > | 请求参数      | 数据类型         | 数据说明 |
  > | --------- | ------------ | ---- |
  > | platform  | EnumPlatform | 平台类型 |
  > | screening | Object       | 场次数据 |

- 返回数据

  > | 返回数据 | 数据类型                              | 数据说明           |
  > | ---- | --------------------------------- | -------------- |
  > | -    | [SeatParasModel](#SeatParasModel) | 座位图相关请求需要的参数模型 |


- 调用示例

  > ```javascript
  > var seatParas = JManagerSeat.seatParasFromScreening('maoyang', seatData);
  > ```

******

##### 4.对原始座位图进行智能转换

- 方法

  > ```java
  > smartSeatsFromSeats(seatData);
  > ```


- 请求参数

  > | 请求参数     | 数据类型   | 数据说明                   |
  > | -------- | ------ | ---------------------- |
  > | seatData | Object | 座位图信息(通过请求获取座位图时返回的数据) |


- 返回数据

  > | 返回数据 | 数据类型                                     | 数据说明    |
  > | ---- | ---------------------------------------- | ------- |
  > | -    | [SmartSeatDataModel](#SmartSeatDataModel) | 智能座位图信息 |

- 调用示例

  > ```javascript
  > JManagerSeat.defaultManager().smartSeatsFromSeats(seatData);
  > ```

******

##### 5.通过请求获取智能转换的座位图

- 方法

  > ```javascript
  > smartSeatsFromNetSeats(platform, paras)
  > ```


- 请求参数

  | 请求参数     | 数据类型                              | 数据说明     |
  | -------- | --------------------------------- | -------- |
  | platform | [EnumPlatform](#EnumPlatform)     | 平台类型     |
  | paras    | [SeatParasModel](#SeatParasModel) | 座位图请求的参数 |


- 返回数据

  > | 返回数据 | 数据类型    | 数据说明 |
  > | ---- | ------- | ---- |
  > | -    | promise | 异步封装 |


- promise结构

  > | 回调参数 | 数据类型               | 数据说明    |
  > | ---- | ------------------ | ------- |
  > | -    | SmartSeatDataModel | 智能座位图信息 |


- 调用实例

  > ```javascript
  > JManagerSeat.defaultManager().smartSeatsFromNetSeats('maoyan', {}).then(data => {
  >   console.log(data);
  > }, error => {
  >   console.log(error);
  > });
  > ```

*****

### 类：JManagerTrade

##### 1.获取单例实例

- 方法

  > ```java
  > static defaultManager()
  > ```


- 请求参数

  > | 请求参数 | 数据类型 | 数据说明 |
  > | ---- | ---- | ---- |
  > | -    | -    | -    |


- 返回数据

  > | 返回数据 | 数据类型   | 数据说明               |
  > | ---- | ------ | ------------------ |
  > | -    | Object | JManagerTrade的单例实例 |


- 调用示例

  > ```javascript
  > console.log(JManagerTrade.defaultManager());
  > ```

*****

##### 2.获取交易商务参数（与座位无关的）+

- 方法

  > ```
  > tradeParasFromPlatform(platform, platformData, filmId, filmName, cinemaId, cinemaName);
  > ```


- 请求参数

  > | 请求参数         | 数据类型                          | 数据说明 |
  > | ------------ | ----------------------------- | ---- |
  > | platform     | [EnumPlatform](#EnumPlatform) | 平台类型 |
  > | platformData |                               |      |
  > | filmId       |                               |      |
  > | filmName     |                               |      |
  > | cinemaId     |                               |      |
  > | cinemaName   |                               |      |


- 返回数据

  > | 返回数据 | 数据类型 | 数据说明 |
  > | ---- | ---- | ---- |
  > | *    | *    | *    |


- 调用示例

  > ```javascript
  > JManagerTrade.defaultManager().tradeParasFromPlatform();
  > ```

*****

##### 3.获取锁座时需要的座位参数

- 方法

  > ```
  > seatInforParas(platform, seatList, mobile);
  > ```


- 请求参数

  > | 请求参数     | 数据类型                                     | 数据说明 |
  > | -------- | ---------------------------------------- | ---- |
  > | platform | [EnumPlatform](#EnumPlatform)            | 平台类型 |
  > | seatList | Array<[SmartSeatModel](#SmartSeatModel)> | 座位列表 |
  > | mobile   | *                                        | *    |


- 返回数据

  > | 返回数据 | 数据类型 | 数据说明 |
  > | ---- | ---- | ---- |
  > | *    | *    | *    |


- 调用示例

  > ```
  > JManagerTrade.defaultManager().seatInforParas();
  > ```

*****

##### 4.购票（执行锁座 下订单 的事务）

- 方法

  > ```javascript
  > buyTicket(platform, tradeParas, seatList, mobile);
  > ```


- 请求参数

  > | 请求参数       | 数据类型                                     | 数据说明             |
  > | ---------- | ---------------------------------------- | ---------------- |
  > | platform   | [EnumPlatform](#EnumPlatform)            | 平台类型             |
  > | tradeParas | *                                        | 商务参数（与座位无关的参数集合） |
  > | seatList   | Array<[SmartSeatModel](#SmartSeatModel)> | 座位列表             |
  > | mobile     | string                                   | 手机号码             |


- 返回数据

  > | 返回数据 | 数据类型   | 数据说明   |
  > | ---- | ------ | ------ |
  > | -    | Object | 返回事务对象 |


- 调用示例

  > ```javascript
  >      JNetworkTrade.defaultManager().buyTicket({}).next((error, lockSeat) => {
  >         if (error) {
  >           console.log(error);
  >         } else {
  >           console.log(lockSeat);
  >         }
  >       }).next((error, confirmOrder) => {
  >         if (error) {
  >           console.log(error);
  >         } else {
  >           console.log(confirmOrder);
  >         }
  >       });
  > ```

*****

##### 5.锁座

- 方法

  > ```javascript
  > lockSeat(type, tradeParas, seatList, mobile);
  > ```


- 请求参数

  > | 请求参数       | 数据类型                                     | 数据说明             |
  > | ---------- | ---------------------------------------- | ---------------- |
  > | platform   | [EnumPlatform](#EnumPlatform)            | 平台类型             |
  > | tradeParas | *                                        | 商务参数（与座位无关的参数集合） |
  > | seatList   | Array<[SmartSeatModel](#SmartSeatModel)> | 座位列表             |
  > | mobile     | string                                   | 手机号码             |


- 返回数据

  > | 返回数据 | 数据类型    | 数据说明 |
  > | ---- | ------- | ---- |
  > | -    | promise | 异步封装 |


- promise结构

  > | 回调参数 | 数据类型 | 数据说明     |
  > | ---- | ---- | -------- |
  > | -    | *    | 锁座成功返回数据 |


- 调用示例

  > ```javascript
  > JNetworkTrade.defaultManager().lockSeat({}).then(data => {
  >   console.log(data);
  > }, error => {
  >   console.log(error);
  > });
  > ```

*****

##### 6.确认订单

- 方法

  > ```javascript
  > applyOrder(platform, lockSeatResultData);
  > ```


- 请求参数

  > | 请求参数               | 数据类型                          | 数据说明      |
  > | ------------------ | ----------------------------- | --------- |
  > | platform           | [EnumPlatform](#EnumPlatform) | 平台类型      |
  > | lockSeatResultData | *                             | 锁座成功返回的数据 |


- 返回数据

  > | 返回数据 | 数据类型    | 数据说明 |
  > | ---- | ------- | ---- |
  > | -    | promise | 异步封装 |


- promise结构

  > | 回调参数 | 数据类型 | 数据说明 |
  > | ---- | ---- | ---- |
  > | *    | *    | *    |