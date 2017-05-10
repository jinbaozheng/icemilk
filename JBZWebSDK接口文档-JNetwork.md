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
###类：JNetworkFilm 

##### 1.分页获取热门电影

* 方法

  > ```java
  > static filmHotfilms(cityId = empty, page = empty){}
  > ```

* 请求参数

  > | 请求参数   | 数据类型 | 数据说明 |
  > | :----- | :--- | :--- |
  > | cityId | int  | 城市Id |
  > | page   | int  | 页号   |
- 返回数据

  > | 返回数据  | 数据类型                                | 数据说明     |
  > | :---- | :---------------------------------- | :------- |
  > | films | Array                               | 获取到的影片列表 |
  > | -     | [FilmDetailModel](#FilmDetailModel) | 影片       |


- 调用示例

  > ```javascript
  > JNetworkFilm.filmHotfilms(2, 1).then((data) => {
  >      console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 2.获取待映电影

* 方法

  > ```java
  > static filmWaitfilmsWithPage(cityId, page = 1){}
  > ```

* 请求参数

  > | 请求参数   | 数据类型   | 数据说明 |
  > | :----- | :----- | :--- |
  > | cityId | string | 城市Id |
  > | page   | int    | 页号   |
- 返回数据

  > | 返回数据 | 数据类型                                | 数据说明 |
  > | :--- | :---------------------------------- | :--- |
  > | -    | [FilmDetailModel](#FilmDetailModel) | 影片   |


- 调用示例

  > ```javascript
  > JNetworkFilm.filmWaitfilmsWithPage(2, 1).then((data) => {
  >      console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 3.获取影片详情

* 方法

  > ```javascript
  > static filmDetail(filmId, platform = empty){}
  > ```

* 请求参数

  > | 请求参数     | 数据类型                          | 数据说明                                    |
  > | :------- | :---------------------------- | :-------------------------------------- |
  > | filmId   | string                        | 影片Id(如果platform为空, 则使用jbz的id,否则使用平台的Id) |
  > | platform | [EnumPlatform](#EnumPlatform) | 平台类型                                    |
- 返回数据

  > | 返回数据 | 数据类型                                | 数据说明 |
  > | :--- | :---------------------------------- | :--- |
  > | -    | [FilmDetailModel](#FilmDetailModel) | 影片详情 |


- 调用示例

  > ```javascript
  > JNetworkFilm.filmDetail('248700', 'maoyan').then((data) => {
  >      console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 4.获取所有电影列表 (未实现)?

* 方法

  > ```java
  > static filmList(cityId = empty){}
  > ```


* 请求参数

  > | 请求参数   | 数据类型 | 数据说明        |
  > | :----- | :--- | :---------- |
  > | cityId | int  | 需要获取电影列表的城市 |
- 返回数据

  > | 返回数据           | 数据类型                                | 数据说明   |
  > | :------------- | :---------------------------------- | :----- |
  > | upcommingFilms | Array                               | 待映影片列表 |
  > | -              | [FilmDetailModel](#FilmDetailModel) | 影片     |
  > | hotFilms       | Array                               | 热映影片列表 |
  > | -              | [FilmDetailModel](#FilmDetailModel) | 影片     |


- 调用示例

  > ```javascript
  > JNetworkFilm.filmList().then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

###类：JNetworkCinema 
##### 1.获取影院详情 (暂时不可用)?

* 方法

  > ```java
  > static cinemaDetail(cinemaId){}
  > ```


* 请求参数

  > | 请求参数     | 数据类型   | 数据说明 |
  > | :------- | :----- | :--- |
  > | cinemaId | string | 影院ID |
- 返回数据

  > | 返回数据 | 数据类型 | 数据说明 |
  > | :--- | :--- | :--- |
  > | -    | -    | -    |


- 调用示例

  > ```javascript
  > JNetworkCinema.cinemaDetail('a123123123').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 2.比价影院的列表

* 方法

  > ```java
  > static cinemaContrastListNeedLocation(filmId = empty, regionName, orderType){}
  > ```


* 请求参数

  > | 请求参数       | 数据类型   | 数据说明           |
  > | :--------- | :----- | :------------- |
  > | filmId     | string | 影片Id           |
  > | regionName | string | 地域名字           |
  > | orderType  | int    | 排序类型 1:距离 2:价格 |
- 返回数据

  > | 返回数据    | 数据类型                                     | 数据说明  |
  > | :------ | :--------------------------------------- | :---- |
  > | cinemas | Array                                    | 影院列表  |
  > | -       | [CinemaCompareModel](#CinemaCompareModel) | 影院    |
  > | regions | Array                                    | 行政区列表 |
  > | -       | [RegionModel](#RegionModel)              | 行政区   |


- 调用示例

  > ```javascript
  > JNetworkCinema.cinemaContrastListNeedLocation('1a692bb163fa4609b59927055faab749', '', 1).then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 3.影院列表 

* 方法

  > ```javascript
  > static cinemaListNeedLocation(filmId){}
  > ```


* 请求参数

  > | 请求参数   | 数据类型   | 数据说明 |
  > | :----- | :----- | :--- |
  > | filmId | string | 影片id |
- 返回数据

  > | 返回数据            | 数据类型                        | 数据说明 |
  > | :-------------- | :-------------------------- | :--- |
  > | cinemas         | Array                       | 影院列表 |
  > | -               | [CinemaModel](#CinemaModel) | 影院   |
  > | recommandCinema | Array                       | 推荐影院 |


- 调用示例

  > ```javascript
  > JNetworkCinema.cinemaListNeedLocation('1a692bb163fa4609b59927055faab749').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 4.实时座位图?

* 方法

  > ```java
  > static cinemaSeats(type, paras){}
  > ```


* 请求参数

  > | 请求参数  | 数据类型                              | 数据说明       |
  > | :---- | :-------------------------------- | :--------- |
  > | type  | [EnumPlatform](#EnumPlatform)     | 平台类型       |
  > | paras | [SeatParasModel](#SeatParasModel) | （根据不同平台变化） |
- 返回数据

  > | 返回数据  | 数据类型    | 数据说明   |
  > | :---- | :------ | :----- |
  > | Array | promise | 异步请求封装 |


- 调用示例

  > ```javascript
  > JNetworkCinema.cinemaSeats('meituan', {}).then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 5.收藏影院

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

##### 6.取消收藏影院

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
###类：JNetworkScreening 
##### 1.指定影院的排片的电影列表及影院本身的信息(如影院电影排片和影院电话及地址)

* 方法

  > ```java
  > static screeningFilmList(cinemaId){}
  > ```


* 请求参数

  > | 请求参数     | 数据类型   | 数据说明 |
  > | :------- | :----- | :--- |
  > | cinemaId | string | 影院Id |
- 返回数据

  > | 返回数据                | 数据类型                                | 数据说明 |
  > | :------------------ | :---------------------------------- | :--- |
  > | cinema              | [BaseCinemaModel](#BaseCinemaModel) | 影院信息 |
  > | cinemaMobile        | string                              | 影院电话 |
  > | films               | Array                               | 电影列表 |
  > | -                   | [FilmDetailModel](#FilmDetailModel) | 电影   |
  > | isCollected = empty | bool                                | 是否收藏 |


- 调用示例

  > ```javascript
  > JNetworkScreening.screeningFilmList('800705').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 2.获取指定影院排片日期安排

* 方法

  > ```java
  > static screeningDateList(cinemaId, filmId){}
  > ```


* 请求参数

  > | 请求参数     | 数据类型   | 数据说明 |
  > | :------- | :----- | :--- |
  > | cinemaId | string | 影院Id |
  > | filmId   | string | 影片Id |
- 返回数据

  > | 返回数据  | 数据类型   | 数据说明                |
  > | :---- | :----- | :------------------ |
  > | dates | Array  | 日期列表                |
  > | -     | string | 日期 (格式: 2017-04-21) |


- 调用示例

  > ```javascript
  > JNetworkScreening.screeningDateList('800705', '1a692bb163fa4609b59927055faab749').then((data) => { 
  >     console.log(data)
  > }, error => {
  >      console.log(error);
  > });
  > ```
**************************************************************************************************

##### 3.获取指定影院排片放映厅安排

* 方法

  > ```java
  > static screeningItems(cinemaId, filmId, date){}
  > ```


* 请求参数

  > | 请求参数     | 数据类型   | 数据说明 |
  > | :------- | :----- | :--- |
  > | cinemaId | string | 影院Id |
  > | filmId   | string | 影片Id |
  > | date     | string | 日期   |
- 返回数据

  > | 返回数据      | 数据类型                              | 数据说明  |
  > | :-------- | :-------------------------------- | :---- |
  > | filmViews | Array                             | 所有的场次 |
  > | -         | [ScreeningModel](#ScreeningModel) | 场次信息  |


- 调用示例

  > ```javascript
  > JNetworkScreening.screeningItems('800705', '1a692bb163fa4609b59927055faab749', '2017-04-21').then((data) => { 
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
  > static locationParas(){}
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
  >  locationParas() {
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


