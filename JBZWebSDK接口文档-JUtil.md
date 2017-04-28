[TOC]

# 斗票WebSDK接口文档

## 模块：JUtil(Class) 

### 类：JManagerSeat

- ##### 1. 获取单例实例

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

- 调用实例

  > ```java
  > JManagerSeat.defaultManager();
  > ```

******

- ##### 2.智能选座

  > ```java
  >   static autoSelected(smartSeats, count) {}
  > ```


- 请求参数

  > | smartSeats | Array                             | 座位图列表  |
  > | ---------- | --------------------------------- | ------ |
  > | 请求参数       | 数据类型                              | 数据说明   |
  > | -          | [SmartSeatModel](#SmartSeatModel) | 智能座位模型 |
  > | count      | int                               | 需要的座位  |


- 返回数据

  > | 返回数据 | 数据类型    | 数据说明 |
  > | ---- | ------- | ---- |
  > | -    | promise |      |


- 调用实例

  > ```java
  > JManagerSeat.autoSelected([$1, $2, $3], 4);
  > ```

********

- ##### 3.获取座位图时需要的参数

  > ```java
  >  static seatParasFromPlatform(type, platform){}
  > ```

- 请求参数

  |      |      |      |
  | ---- | ---- | ---- |
  |      |      |      |
  |      |      |      |