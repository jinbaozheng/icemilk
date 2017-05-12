[TOC]

# 斗票WebSDK接口文档(v1.0.55)#
## 模块：JNetwork(Class) 
###类：JNetwork

##### 1.POST请求

* 方法

  > ```java
  > static POST(url, parameters, headers){}
  > ```


* 请求参数

  > | 请求参数       | 数据类型   | 数据说明 |
  > | :--------- | :----- | :--- |
  > | url        | string | 相对地址 |
  > | parameters | string | 地址参数 |
  > | headers    | string | 头参数  |
- 返回数据

  > | 返回数据 | 数据类型 | 数据说明    |
  > | :--- | :--- | :------ |
  > | data | *    | 请求返回的数据 |


- 调用示例

  > ```javascript
  >  JNetwork.POST('/refreshlocation', {
  >         longitude: 122.0248313589239,
  >         latitude: 37.33800802417976
  >       }, {
  >         'Accept': 'application/json',
  >         'Content-Type': 'application/json'
  >       }).then(data => {
  >         console.log(data);
  >       }, error => {
  >         console.log(error);
  >       });
  > ```
**************************************************************************************************

##### 2.GET请求

* 方法

  > ```java
  > static GET(url, parameters, headers){}
  > ```


* 请求参数

  > | 请求参数       | 数据类型   | 数据说明 |
  > | :--------- | :----- | :--- |
  > | url        | string | 相对地址 |
  > | parameters | string | 地址参数 |
  > | headers    | string | 头参数  |
- 返回数据

  > | 返回数据 | 数据类型 | 数据说明    |
  > | :--- | :--- | :------ |
  > | data | *    | 请求返回的数据 |


- 调用示例

  > ```javascript
  >   JNetwork.GET('/refreshlocation', {
  >         longitude: 122.0248313589239,
  >         latitude: 37.33800802417976
  >       }).then(data => {
  >         console.log(data);
  >       }, error => {
  >         console.log(error);
  >       });
  > ```
**************************************************************************************************
###类：JNetworkConfig

##### 1.网络请求配置

- 方法

  > ```java
  > static setConfig(config){}
  > ```


- 请求参数

  > | 请求参数   | 数据类型                        | 数据说明   |
  > | :----- | :-------------------------- | :----- |
  > | config | [ConfigModel](#ConfigModel) | object |


- 返回数据

  > | 返回数据 | 数据类型 | 数据说明 |
  > | :--- | :--- | :--- |
  > | -    | -    | -    |


- 调用示例

  > ```javascript
  > JNetworkConfig.setConfig({
  >         baseUrl: 'https://jbz-dev.idoupiao.com/openfilm/appapi'
  >       });
  > ```
**************************************************************************************************

###类：JNetworkCity 
##### 1.获取城市列表

* 方法

  > ```java
  > static cityList(){}
  > ```


* 请求参数

  > | 请求参数 | 数据类型 | 数据说明 |
  > | ---- | ---- | ---- |
  > | -    | -    | -    |


- 返回数据

  > | 返回数据 | 数据类型                           | 数据说明 |
  > | :--- | :----------------------------- | :--- |
  > | -    | Array<[CityModel](#CityModel)> | 城市列表 |


- 调用示例

  > ```javascript
  > JNetworkCity.cityList().then((list) => { 
  >     console.log(list)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 2.通过经纬度获取城市

* 方法

  > ```java
  > static cityByCoordinate(coordinate){}
  > ```


* 请求参数

  > | 请求参数       | 数据类型                                | 数据说明 |
  > | :--------- | :---------------------------------- | :--- |
  > | coordinate | [CoordinateModel](#CoordinateModel) | 定位信息 |
- 返回数据

  > | 返回数据    | 数据类型                    | 数据说明 |
  > | :------ | :---------------------- | :--- |
  > | city    | [CityModel](#CityModel) | 城市模型 |
  > | address | string                  | 详细地址 |


- 调用示例

  > ```javascript
  > JNetworkCity.cityByCoordinate({longitude:121.458858, latitude:23.484588}).then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 3.通过经纬度获取城市（通过代理传递）

- 方法

  > ```java
  > static cityNeedCoordinate(){}
  > ```


- 请求参数

  > | 请求参数 | 数据类型 | 数据说明 |
  > | ---- | ---- | ---- |
  > | -    | -    | -    |

- 返回数据

  > | 返回数据    | 数据类型                    | 数据说明 |
  > | ------- | ----------------------- | ---- |
  > | city    | [CityModel](#CityModel) | 城市模型 |
  > | address | string                  | 详细地址 |

- 调用示例

  > ```javascript
  > JNetworkCity.cityNeedCoordinate().then((data) => { 
  >     console.log(data.city);
  >     console.log(data.address);
  > }, error => {
  >     console.log(error);
  > });
  > ```

*******

##### 4.通过城市id获取城市

- 方法

  > ```java
  > static cityById(cityId){}
  > ```


- 请求参数

  > | 请求参数   | 数据类型   | 数据说明 |
  > | ------ | ------ | ---- |
  > | cityId | string | 城市id |

- 返回数据

  > | 返回数据 | 数据类型                    | 数据说明 |
  > | ---- | ----------------------- | ---- |
  > | -    | [CityModel](#CityModel) | 城市模型 |

- 调用示例

  > ```javascript
  > JNetworkCity.cityById(2).then((city) => {
  > 	console.log(city)
  > }, error => {
  >     console.log(error);
  > });
  > ```

*******

##### 5.获取地区列表

- 方法

  > ```java
  > static cityDistrictList(cityId){}
  > ```


- 请求参数

  > | 请求参数   | 数据类型   | 数据说明 |
  > | ------ | ------ | ---- |
  > | cityId | string | 城市id |

- 返回数据

  > | 返回数据 | 数据类型                                   | 数据说明  |
  > | ---- | -------------------------------------- | ----- |
  > | -    | Array<[DistrictModel](#DistrictModel)> | 行政区列表 |

- 调用示例

  > ```javascript
  > JNetworkCity.cityDistrictList(2).then((list) => {
  >   list.forEach(district => {
  >     console.log(district)
  >   });
  > }, error => {
  >   console.log(error);
  > });
  > ```

*******

##### 6.获取热门城市列表

- 方法

  > ```java
  > static cityHotList(){}
  > ```


- 请求参数

  > | 请求参数 | 数据类型 | 数据说明 |
  > | ---- | ---- | ---- |
  > | -    | -    | -    |

- 返回数据

  > | 返回数据 | 数据类型                           | 数据说明   |
  > | ---- | ------------------------------ | ------ |
  > | -    | Array<[CityModel](#CityModel)> | 热门城市列表 |


- 调用示例

  > ```javascript
  > JNetworkCity.cityHotList(2).then((list) => {
  >     console.log(list)
  > }, error => {
  >   console.log(error);
  > });
  > ```

*******

###类：JNetworkFilm 

##### 1.获取热门电影

* 方法

  > ```java
  > static filmHotfilms(page = empty){}
  > ```

* 请求参数

  > | 请求参数 | 数据类型                    | 数据说明 |
  > | :--- | :---------------------- | :--- |
  > | page | [PageModel](#PageModel) | 分页模型 |
- 返回数据

  > | 返回数据 | 数据类型                                     | 数据说明     |
  > | :--- | :--------------------------------------- | :------- |
  > | -    | Array<[FilmDetailModel](#FilmDetailModel)> | 获取到的影片列表 |


- 调用示例

  > ```javascript
  > JNetworkFilm.filmHotfilms({index: 1, size: 5}).then((list) => {
  >      console.log(list)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************
##### 2.获取热门电影(基础数据)

* 方法

  > ```java
  > static filmHotfilmsSimple(){}
  > ```


* 请求参数

  > | 请求参数 | 数据类型 | 数据说明 |
  > | :--- | :--- | :--- |
  > | -    | -    | -    |
- 返回数据

  > | 返回数据 | 数据类型                                     | 数据说明     |
  > | :--- | :--------------------------------------- | :------- |
  > | -    | Array<[FilmDetailModel](#FilmDetailModel)> | 获取到的影片列表 |


- 调用示例

  > ```javascript
  > JNetworkFilm.filmList().then((list) => { 
  >     console.log(list)
  > }, error => {
  >      console.log(error);
  > });
  > ```
##### 3.获取待映电影

* 方法

  > ```java
  > static filmWaitfilms(page = empty){}
  > ```

* 请求参数

  > | 请求参数 | 数据类型                    | 数据说明 |
  > | :--- | :---------------------- | :--- |
  > | page | [PageModel](#PageModel) | 分页模型 |
- 返回数据

  > | 返回数据 | 数据类型                                     | 数据说明     |
  > | :--- | :--------------------------------------- | :------- |
  > | -    | Array<[FilmDetailModel](#FilmDetailModel)> | 获取到的影片列表 |


- 调用示例

  > ```javascript
  > JNetworkFilm.filmWaitfilms({index: 1, size: 5}).then((list) => {
  >      console.log(list)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 4.获取影片详情

* 方法

  > ```javascript
  > static filmDetail(filmId, platform = jbz){}
  > ```

* 请求参数

  > | 请求参数     | 数据类型                          | 数据说明            |
  > | :------- | :---------------------------- | :-------------- |
  > | filmId   | string                        | 影片Id            |
  > | platform | [EnumPlatform](#EnumPlatform) | 平台类型(默认使用jbz平台) |
- 返回数据

  > | 返回数据 | 数据类型                                | 数据说明 |
  > | :--- | :---------------------------------- | :--- |
  > | -    | [FilmDetailModel](#FilmDetailModel) | 影片详情 |


- 调用示例

  > ```javascript
  > JNetworkFilm.filmDetail('248700', 'maoyan').then((film) => {
  >      console.log(film)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 5.获取热门电影

* 方法

  > ```java
  > static filmHotfilmsSimple(){}
  > ```


* 请求参数

  > | 请求参数 | 数据类型 | 数据说明 |
  > | :--- | :--- | :--- |
  > | -    | -    | -    |
- 返回数据

  > | 返回数据 | 数据类型  | 数据说明   |
  > | :--- | :---- | :----- |
  > | -    | Array | 待映影片列表 |


- 调用示例

  > ```javascript
  > JNetworkFilm.filmList().then((data) => { 
  >     console.log(data)
  > }, error => {
  >     console.log(error);
  > });
  > ```
**************************************************************************************************

##### 6.获取影片排片日期列表

- 方法

  > ```java
  > static filmDateList(filmId, cityId){}
  > static filmDateListNeedCity(filmId){}
  > ```

- 请求参数

  > | 请求参数   | 数据类型   | 数据说明 |
  > | ------ | ------ | ---- |
  > | filmId | string | 影片Id |
  > | cityId | string | 城市Id |

- 返回数据

  > | 返回数据 | 数据类型          | 数据说明        |
  > | ---- | ------------- | ----------- |
  > | -    | Array<number> | 返回日期的时间戳的列表 |

- 调用实例

  > ```javascript
  > JNetworkFilm.filmDateList('f1af9c0f14c6442592f93f421dbf56e3', 2).then(list => {
  >     console.log(list);
  > }, error => {
  >     console.log(error);
  > });
  > JNetworkFilm.filmDateListNeedCity('f1af9c0f14c6442592f93f421dbf56e3').then(list => {
  >     console.log(list);
  > }, error => {
  >     console.log(error);
  > });
  > ```

**************************************************************************************************

###类：JNetworkCinema 
##### 1.获取影院详情

* 方法

  > ```java
  > static cinemaDetail(cinemaId){}
  > ```


* 请求参数

  > | 请求参数     | 数据类型   | 数据说明 |
  > | :------- | :----- | :--- |
  > | cinemaId | string | 影院ID |
- 返回数据

  > | 返回数据 | 数据类型                                | 数据说明 |
  > | :--- | :---------------------------------- | :--- |
  > | -    | [BaseCinemaModel](#BaseCinemaModel) | 影院信息 |


- 调用示例

  > ```javascript
  > JNetworkCinema.cinemaDetail('a123123123').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 2.影院的列表

* 方法

  > ```java
  > static cinemaList(location, cinemaFilter = empty){}
  > static cinemaListNeedLocation(cinemaFilter = empty){}
  > ```


* 请求参数

  > | 请求参数         | 数据类型                                    | 数据说明   |
  > | :----------- | :-------------------------------------- | :----- |
  > | location     | [LocationModel](#LocationModel)         | 位置信息   |
  > | cinemaFilter | [CinemaFilterModel](#CinemaFilterModel) | 影院筛选条件 |
- 返回数据

  > | 返回数据    | 数据类型                                     | 数据说明 |
  > | :------ | :--------------------------------------- | :--- |
  > | cinemas | Array<[CinemaCompareModel](#CinemaCompareModel)> | 影院列表 |


- 调用示例

  > ```javascript
  > JNetworkCinema.cinemaListNeedLocation({
  >   filmId: 'c28429848bc448b98164d6ad6c2db1d7',
  >   sort: 2
  > }).then(list => {
  >   console.log(list);
  > }, error => {
  >   console.log(error);
  > });
  > ```
**************************************************************************************************

##### 3.获取指定影院排片

- 方法

  > ```java
  > static cinemaScreeningFilmList(cinemaId)
  > ```


- 请求参数

  > | 请求参数     | 数据类型   | 数据说明 |
  > | -------- | ------ | ---- |
  > | cinemaId | string | 影院Id |


- 返回数据

  > | 返回数据 | 数据类型                                     | 数据说明 |
  > | ---- | ---------------------------------------- | ---- |
  > | -    | Array<[FilmDetailModel](#FilmDetailModel)> | 影片列表 |

- 调用示例

  > ```javascript
  > JNetworkCinema.cinemaScreeningFilmList('800633').then(list => {
  >   console.log(list);
  > }, error => {
  >   console.log(error);
  > });
  > ```

**************************************************************************************************

##### 4.获取指定影院排片日期安排


- 方法

  > ```java
  > static cinemaScreeningDateList(cinemaId, filmId){}
  > ```

- 请求参数

  > | 请求参数     | 数据类型   | 数据说明 |
  > | -------- | ------ | ---- |
  > | cinemaId | string | 影院Id |
  > | filmId   | string | 影片id |

- 返回数据

  > | 返回数据 | 数据类型          | 数据说明        |
  > | ---- | ------------- | ----------- |
  > | -    | Array<number> | 返回日期的时间戳的列表 |

- 调用示例

  > ```javascript
  > JNetworkCinema.cinemaScreeningDateList('800633', 'c49285494f66425abc8ab6756167cdbc').then(list => {
  >   console.log(list);
  > }, error => {
  >   console.log(error);
  > });
  > ```

**************************************************************************************************

##### 5.获取指定影院排片放映厅安排

- 方法

  > ```java
  > static cinemaScreeningItems(cinemaId, filmId, date) 
  > ```

- 请求参数

  > | 请求参数     | 数据类型   | 数据说明      |
  > | -------- | ------ | --------- |
  > | cinemaId | string | 影院Id      |
  > | filmId   | string | 影片Id      |
  > | date     | number | 日期（时间戳标示） |

- 返回数据

  > | 返回数据 | 数据类型                                     | 数据说明   |
  > | ---- | ---------------------------------------- | ------ |
  > | -    | Array<[ScreeningModel](#ScreeningModel)> | 放映模型列表 |

- 调用示例

  > ```javascript
  > JNetworkCinema.cinemaScreeningItems('800633', 'c49285494f66425abc8ab6756167cdbc', 1494547200).then(list => {
  >   console.log(list);
  > }, error => {
  >   console.log(error);
  > });
  > ```

**************************************************************************************************

##### 6.实时座位图

* 方法

  > ```java
  > static cinemaSmartSeats(type, paras){}
  > ```


* 请求参数

  > | 请求参数  | 数据类型                              | 数据说明       |
  > | :---- | :-------------------------------- | :--------- |
  > | type  | [EnumPlatform](#EnumPlatform)     | 平台类型       |
  > | paras | [SeatParasModel](#SeatParasModel) | （根据不同平台变化） |
- 返回数据

  > | 返回数据 | 数据类型             | 数据说明   |
  > | :--- | :--------------- | :----- |
  > | -    | Array<[Smart]()> | 异步请求封装 |


- 调用示例

  > ```javascript
  > JNetworkCinema.cinemaSeats('maoyan', {
  >   cinemaId: '117',
  >   showId: '201705110132895'
  > }).then(list => {
  >   console.log(list);
  > }, error => {
  >   console.log(error);
  > });
  > ```
**************************************************************************************************

##### 7.收藏影院

* 方法

  > ```java
  > static cinemaFavoriteCinemaNeedLogin(cinemaId, cinemaName){}
  > ```


* 请求参数

  > | 请求参数       | 数据类型   | 数据说明 |
  > | :--------- | :----- | :--- |
  > | cinemaId   | string | 影院Id |
  > | cinemaName | string | 影院名字 |
- 返回数据

  > | 返回数据 | 数据类型 | 数据说明 |
  > | :--- | :--- | :--- |
  > | -    | -    | -    |


- 调用示例

  > ```javascript
  > JNetworkCinema.cinemaFavoriteCinemaNeedLogin('800705', '上海鸿纳国际影城').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 8.取消收藏影院

* 方法

  > ```java
  > static cinemaCancelFavoriteCinemaNeedLogin(cinemaId){}
  > ```


* 请求参数

  > | 请求参数     | 数据类型   | 数据说明 |
  > | :------- | :----- | :--- |
  > | cinemaId | string | 影院Id |
- 返回数据

  > | 返回数据 | 数据类型 | 数据说明 |
  > | :--- | :--- | :--- |
  > | -    | -    | -    |


- 调用示例

  > ```javascript
  > JNetworkCinema.cinemaCancelFavoriteCinemaNeedLogin('800705').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

###类：JNetworkTrade 
##### 1.锁座+

* 方法

  > ```java
  > static tradeLockSeatNeedLogin(type, paras){}
  > ```


* 请求参数

  > | 请求参数  | 数据类型   | 数据说明 |
  > | :---- | :----- | :--- |
  > | type  | string | 平台类型 |
  > | paras | object | 锁座参数 |
- 返回数据

  > | 返回数据 | 数据类型    | 数据说明   |
  > | :--- | :------ | :----- |
  > | -    | promise | 异步请求封装 |


- 调用示例

  > ```javascript
  > JNetworkTrade.tradeLockSeatNeedLogin('maoyan', {}).then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 2.取消锁座+

* 方法

  > ```java
  > static cancelLockSeatNeedLogin(orderId){}
  > ```


* 请求参数

  > | 请求参数    | 数据类型   | 数据说明 |
  > | :------ | :----- | :--- |
  > | orderId | string | 订单Id |
- 返回数据

  > | 返回数据 | 数据类型    | 数据说明   |
  > | :--- | :------ | :----- |
  > | -    | promise | 异步请求封装 |


- 调用示例

  > ```javascript
  > JNetworkTrade.cancelLockSeatNeedLogin('dd11111111').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 3.下订单+

* 方法

  > ```java
  > static tradeConfirmOrderNeedLogin(type, paras){}
  > ```


* 请求参数

  > | 请求参数  | 数据类型   | 数据说明  |
  > | :---- | :----- | :---- |
  > | type  | string | 平台类型  |
  > | paras | object | 下订单参数 |
- 返回数据

  > | 返回数据 | 数据类型    | 数据说明   |
  > | :--- | :------ | :----- |
  > | -    | promise | 异步请求封装 |


- 调用示例

  > ```javascript
  > JNetworkTrade.tradeConfirmOrderNeedLogin('maoyan', {}).then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 4.申请预订单+

* 方法

  > ```java
  > static tradePrePayOrderNeedLogin(orderId, payType, prizeIds, redIds){}
  > ```


* 请求参数

  > | 请求参数     | 数据类型   | 数据说明 |
  > | :------- | :----- | :--- |
  > | orderId  | string | 订单Id |
  > | payType  | string | 支付类型 |
  > | prizeIds | string | 待定   |
  > | redIds   | string | 待定   |
- 返回数据

  > | 返回数据 | 数据类型    | 数据说明   |
  > | :--- | :------ | :----- |
  > | -    | promise | 异步请求封装 |


- 调用示例

  > ```javascript
  > JNetworkTrade.tradePrePayOrderNeedLogin('d123123', 'weixin', '', '').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************
###类：JNetworkMine 
##### 1.我的订单+

* 方法

  > ```java
  > static mineOrderNeedLogin(){}
  > ```


* 请求参数

  > | 请求参数 | 数据类型 | 数据说明 |
  > | :--- | :--- | :--- |
  > | -    | -    | -    |
- 返回数据

  > | 返回数据 | 数据类型    | 数据说明   |
  > | :--- | :------ | :----- |
  > | -    | promise | 异步请求封装 |


- 调用示例

  > ```javascript
  > JNetworkMine.mineOrderNeedLogin().then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 2.我的收藏+

* 方法

  > ```java
  > static mineFavoriteNeedLogin(){}
  > ```


* 请求参数

  > | 请求参数 | 数据类型 | 数据说明 |
  > | :--- | :--- | :--- |
  > | -    | -    | -    |
- 返回数据

  > | 返回数据 | 数据类型    | 数据说明   |
  > | :--- | :------ | :----- |
  > | -    | promise | 异步请求封装 |


- 调用示例

  > ```javascript
  > JNetworkMine.mineFavoriteNeedLogin().then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

###类：JNetworkAccount 

##### 1.用户登录

* 方法

  > ```java
  > static accountLogin(mobile, password){}
  > ```


* 请求参数

  > | 请求参数     | 数据类型   | 数据说明      |
  > | :------- | :----- | :-------- |
  > | mobile   | string | 登录需要的手机号码 |
  > | password | string | 登录需要的密码   |
- 返回数据

  > | 返回数据       | 数据类型                          | 数据说明 |
  > | :--------- | :---------------------------- | :--- |
  > | jbzAccount | [AccountModel](#AccountModel) | 用户模型 |
  > | jbzSession | [SessionModel](#SessionModel) | 登录模型 |


- 调用示例

  > ```javascript
  > JNetworkAccount.accountLogin('13764730291', '123456').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 2.用户登出

* 方法

  > ```java
  > static accountLogout(sessionId){}
  > ```


* 请求参数

  > | 请求参数      | 数据类型   | 数据说明   |
  > | :-------- | :----- | :----- |
  > | sessionId | string | 用户登录标识 |
- 返回数据

  > | 返回数据 | 数据类型    | 数据说明   |
  > | :--- | :------ | :----- |
  > | -    | promise | 异步请求封装 |


- 调用示例

  > ```javascript
  > JNetworkAccount.accountLogout('').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 3.获取验证码

* 方法

  > ```java
  > static accountVerifyCode(mobile, type){}
  > ```


* 请求参数

  > | 请求参数   | 数据类型   | 数据说明                    |
  > | :----- | :----- | :---------------------- |
  > | mobile | string | 接收验证码的手机号码              |
  > | type   | string | 验证码类型 （1：注册使用 2：忘记密码使用） |
- 返回数据

  > | 返回数据 | 数据类型    | 数据说明          |
  > | :--- | :------ | :------------ |
  > | !    | message | 目前这个接口返回数据不规范 |


- 调用示例

  > ```javascript
  > JNetworkAccount.accountVerifyCode('13764730291', 2).then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 4.注册用户+

* 方法

  > ```java
  > static accountRegister(mobile, verifyCode, password){}
  > ```


* 请求参数

  > | 请求参数       | 数据类型   | 数据说明    |
  > | :--------- | :----- | :------ |
  > | mobile     | string | 用户的手机号码 |
  > | verifyCode | string | 验证码     |
  > | password   | string | 密码      |
- 返回数据

  > | 返回数据       | 数据类型                          | 数据说明 |
  > | :--------- | :---------------------------- | :--- |
  > | jbzAccount | [AccountModel](#AccountModel) | 用户模型 |
  > | jbzSession | [SessionModel](#SessionModel) | 登录模型 |


- 调用示例

  > ```javascript
  > JNetworkAccount.accountRegister('13764730291', '112525', '123456').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 5.忘记密码并且找回密码

* 方法

  > ```java
  > static accountUpdatepass(mobile, verifyCode, password){}
  > ```


* 请求参数

  > | 请求参数       | 数据类型   | 数据说明    |
  > | :--------- | :----- | :------ |
  > | mobile     | string | 用户的手机号码 |
  > | verifyCode | string | 验证码     |
  > | password   | string | 新密码     |
- 返回数据

  > | 返回数据       | 数据类型                          | 数据说明 |
  > | :--------- | :---------------------------- | :--- |
  > | jbzAccount | [AccountModel](#AccountModel) | 用户模型 |
  > | jbzSession | [SessionModel](#SessionModel) | 登录模型 |


- 调用示例

  > ```javascript
  > JNetworkAccount.accountUpdatepass('13764730291', '112525', '123456').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

###类：JNetworkOther 
##### 1.搜索

* 方法

  > ```javascript
  > static otherSearch(cityId = empty, key, lastKey = empty){}
  > ```


* 请求参数

  > | 请求参数    | 数据类型   | 数据说明   |
  > | :------ | :----- | :----- |
  > | cityId  | string | 城市     |
  > | key     | string | 关键字    |
  > | lastKey | string | 下一页的句柄 |
- 返回数据

  > | 返回数据        | 数据类型   | 数据说明       |
  > | :---------- | :----- | :--------- |
  > | cinemas     | Array  | 搜索到的影院列表   |
  > | films       | Array  | 搜索到的影片列表   |
  > | cinemaTotal | int    | 总共搜索到的影院条数 |
  > | filmTotal   | int    | 总共搜索到的影片条数 |
  > | lastKey     | string | -          |


- 调用示例

  > ```javascript
  > JNetworkOther.otherSearch(null, '上海').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
*****

##### 2.广告栏接口

- 方法

  > ```java
  > static otherBanners(cityId = empty){}
  > ```

* 请求参数

  > | 请求参数   | 数据类型 | 数据说明 |
  > | :----- | :--- | :--- |
  > | cityId | int  | 城市Id |
- 返回数据

  > | 返回数据 | 数据类型    | 数据说明   |
  > | :--- | :------ | :----- |
  > | -    | promise | 异步请求封装 |


- 调用示例

  > ```javascript
  > JNetworkOther.bannersNeedCItyIdNeedLocation().then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************
## 模块：JNetwork(Delegate)  

###代理：JNetworkDelegate 

##### 1.城市信息请求参数代理

- 方法

  > ```java
  > static cityParas(){}
  > ```

* 回调参数

  > | 请求参数 | 数据类型 | 数据说明 |
  > | :--- | :--- | :--- |
  > | -    | -    | -    |
- 返回数据

  > | 返回数据 | 数据类型                    | 数据说明 |
  > | :--- | :---------------------- | :--- |
  > | -    | [CityModel](#CityModel) | 城市模型 |


- 调用示例

  > ```javascript
  >  cityParas() {
  >         return store.getState().location.userLocationCity;
  >  }
  > ```
**************************************************************************************************

##### 2.定位信息请求参数代理

* 方法

  > ```java
  > static coordinateParas(){}
  > ```


* 回调参数

  > | 请求参数 | 数据类型 | 数据说明 |
  > | :--- | :--- | :--- |
  > | -    | -    | -    |
- 返回数据

  > | 返回数据 | 数据类型                                | 数据说明   |
  > | :--- | :---------------------------------- | :----- |
  > | -    | [CoordinateModel](#CoordinateModel) | 定位信息模型 |


- 调用示例

  > ```javascript
  >  coordinateParas() {
  >          return {latitude: 41.816804:, 
  >                  longitude: 123.426065};
  >  }
  > ```
**************************************************************************************************
## 模块：JNetwork(Enum)  

####枚举：EnumPlatform 
* 描述

  > 平台类型


* ##### 属性

  > | 类型     | 枚举       | 说明   |
  > | :----- | :------- | :--- |
  > | string | wangpiao | 网票   |
  > | \*     | maizuo   | 卖座   |
  > | \*     | spider   | 蜘蛛   |
  > | \*     | danche   | 单车   |
  > | \*     | maoyan   | 猫眼   |
  > | \*     | dazhong  | 大众   |
  > | \*     | meituan  | 美团   |
**************************************************************************************************

#### 枚举：EnumInType

- 描述

  > 请求类型


- 属性

  > | 类型     | 枚举      | 说明    |
  > | ------ | ------- | ----- |
  > | string | android | 安卓app |
  > | *      | iOS     | ios   |
  > | *      | web     | web端  |

**************************************************************************************************


