[TOC]
# 斗票WebSDK接口文档#
## <font color='#ff0000' size:>模块：JNetwork(Class) </font> 
###<font color='#0099ff'>类：JNetwork</font>
<font color='#999999'>

* **<mark><font color='#666666'>1. POST请求</font></mark>**
* >
~~~js
static POST(url, parameters, headers){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|url|string|相对地址|
|parameters|string|地址参数|
|headers|string|头参数|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetwork.POST('/main/hotfilms', {a: 1}, {'Accept': 'application/json','Content-Type': 'application/json'}).then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>2. GET请求</font></mark>**
* >
~~~js
static GET(url, parameters, headers){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|url|string|相对地址|
|parameters|string|地址参数|
|headers|string|头参数|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetwork.GET('/main/hotfilms', {a: 1}, {'Accept': 'application/json','Content-Type': 'application/json'}).then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************
</font>

###<font color='#0099ff'>类：JNetworkConfig</font>
<font color='#999999'>

* **<font color='#666666'>1. 获取首页数据</font>**

- > ```js
    static setConfig(config){}
    ```
  
- **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|config|[ConfigModel](#ConfigModel)|object|配置对象|

- **返回参数**
>
|返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>    
~~~js 
JNetworkConfig.setConfig({baseUrl: 'https://jbz-dev.idoupiao.com/openfilm',delegate: this}).then((data) => {
     console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************
</font>
###<font color='#0099ff'>类：JNetworkHome</font>
<font color='#999999'>

* **<font color='#666666'>1. 获取首页数据</font>**

- > ```js
    static homeMainPageNeedLocation(){}
    ```
  
- **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|-|-|

- **返回参数**
>
|返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>    
~~~js 
JNetworkHome.homeMainPageNeedLocation().then((data) => {
     console.log(data)
}, error => {
     console.log(error);
});
~~~
</font>

**************************************************************************************************

###<font color='#0099ff'>类：JNetworkFilm </font>
<font color='#999999'>

* **<mark><font color='#666666' size='3'>1. 获取热门电影</font><mark>**

- ~~~js
  static filmHotfilms(){}
  ~~~
  
* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|-|-|

- **返回参数**
> 
|返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>    
~~~js 
JNetworkFilm.filmHotfilms().then((data) => {
     console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666' size='3'>2. 分页获取热门电影</font></mark>**
* >
  ~~~js
  static filmHotfilmsWithPage(cityId, page = 1){}
  ~~~
  
* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|cityId|string|城市Id|
|page|int|页号|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>    
~~~js 
JNetworkFilm.filmHotfilmsWithPage(2, 1).then((data) => {
     console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666' size='3'>3. 获取待映电影</font></mark>**
* >
  ~~~js
  static filmWaitfilmsWithPage(cityId, page = 1){}
  ~~~
  
* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|cityId|string|城市Id|
|page|int|页号|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>    
~~~js 
JNetworkFilm.filmWaitfilmsWithPage(2, 1).then((data) => {
     console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666' size='3'>4. 获取影片详情</font><mark>**
* >
  ~~~js
  static filmDetail(platformFilmId, platformId){}
  ~~~
  
* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|platformFilmId|string|影片ID|
|platformId|string|平台id|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>    
~~~js 
JNetworkFilm.filmDetail().then((data) => {
     console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>5. 获取所有电影列表</font></mark>**
* >
~~~js
static filmList(){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|filmId|string|影院Id|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkFilm.filmList().then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~


**************************************************************************************************
* **<mark><font color='#666666'>6. 获取指定影片</font></mark>**
* >
~~~js
static filmWithFilmId(filmId){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|filmId|string|影院Id|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkFilm.filmWithFilmId('a123321321').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************
</font>

###<font color='#0099ff'>类：JNetworkCinema </font>
<font color='#999999'>

* **<mark><font color='#666666'>1. 获取影院详情</font></mark>**
* >
~~~js
static cinemaDetail(cinemaId){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|cinemaId|string|影院ID|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaDetail('a123123123').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************
* **<mark><font color='#666666'>2. 根据影片Id获取影院的列表（比价）</font></mark>**
* >
~~~js
static cinemaContrastNeedLocation(filmId, regionName, orderType){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|filmId|string|影片Id|
|regionName|string|地域名字|
|orderType|int|排序类型 1:距离 2:价格|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaContrastNeedLocation('a123123123', '浦东新区', 1).then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>3. 获取影院的列表（比价，不需要影院Id）</font></mark>**
* >
~~~js
static cinemaContrastNoFilmNeedLocation(regionName, orderType){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|regionName|string|地域名字|
|orderType|int|排序类型 1:距离 2:价格|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaContrastNoFilmNeedLocation('浦东新区', 1).then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>4. 指定影院的排片的电影列表及影院本身的信息</font></mark>**
* >
~~~js
static cinemaScreenings(cinemaId){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|cinemaId|string|影院ID|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaScreenings('a123123123').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************
* **<mark><font color='#666666'>5. 指定影院的排片的最近日期列表</font></mark>**
* >
~~~js
static cinemaScreeningsDate(cinemaId, filmId){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|cinemaId|string|影院ID|
|filmId|string|影片ID|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaScreeningsDate('a123123', 'b123123').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>6. 指定影院的某个影片的某天的排片的详细信息</font></mark>**
* >
~~~js
static cinemaScreeningsItem(cinemaId, filmId, date){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|cinemaId|string|影院ID|
|filmId|string|影片ID|
|date|string|日期|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaScreeningsItem('a123123123', 'b123123123', '2017-04-18').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>7. 实时座位图</font></mark>**
* >
~~~js
static cinemaSeat(type, paras){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|type|string|平台类型|
|paras|object|（根据不同平台变化）|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaSeat('meituan', {}).then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>8. 影院列表 （已弃用）（临时使用了）</font></mark>**
* >
~~~js
static cinemaListNeedLocation(filmId){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|filmId|string|影片id|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaListNeedLocation('a123123123').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>9. 整合后的影院列表</font></mark>**
* >
~~~js
static newCinemaListNeedLocation(filmid, region, order, feature, inType, date){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|filmid|string|影片Id|
|region|string|市区|
|order|string|排序|
|feature|string|特色|
|inType|string|后台为了判断请求的类型 （CinemaBuyList：2，CinemaListView：1）|
|date|string|日期|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCinema.newCinemaListNeedLocation().then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>10. 收藏影院</font></mark>**
* >
~~~js
static cinemaFavoriteCinemaNeedLogin(cinemaId, cinemaName){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|cinemaId|string|影院Id|
|cinemaName|string|影院名字|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaFavoriteCinemaNeedLogin('a123123', '上海电影院').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>11. 取消收藏影院</font></mark>**
* >
~~~js
static cinemaCancelFavoriteCinemaNeedLogin(cinemaId){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|cinemaId|string|影院Id|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaCancelFavoriteCinemaNeedLogin('a123123').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************
</font>

###<font color='#0099ff'>类：JNetworkFilmView </font>
<font color='#999999'>

* **<mark><font color='#666666'>1. 获取指定影院基础数据(如影院电影排片和影院电话及地址)</font></mark>**
* >
~~~js
static filmviewFilmview(cinemaId){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|cinemaId|string|影院Id|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkFilmView.filmviewFilmview('a123123').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>2. 获取指定影院排片日期安排</font></mark>**
* >
~~~js
static filmviewDate(cinemaId, filmId){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|cinemaId|string|影院Id|
|filmId|string|影片Id|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkFilmView.filmviewDate('a123123', 'b123123').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>3. 获取指定影院排片放映厅安排</font></mark>**
* >
~~~js
static filmviewItems(cinemaId, filmId, date){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|cinemaId|string|影院Id|
|filmId|string|影片Id|
|date|string|日期|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkFilmView.filmviewItems('a123123', 'b123123', '2017-04-18').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

</font>
###<font color='#0099ff'>类：JNetworkTrade </font>
<font color='#999999'>

* **<mark><font color='#666666'>1. 锁座</font></mark>**
* >
~~~js
static tradeLockSeatNeedLogin(type, paras){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|type|string|平台类型|
|paras|object|锁座参数|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkTrade.tradeLockSeatNeedLogin('maoyan', {}).then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>2. 取消锁座</font></mark>**
* >
~~~js
static cancelLockSeatNeedLogin(orderId){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|orderId|string|订单Id|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkTrade.cancelLockSeatNeedLogin('dd11111111').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>3. 下订单</font></mark>**
* >
~~~js
static tradeConfirmOrderNeedLogin(type, paras){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|type|string|平台类型|
|paras|object|下订单参数|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkTrade.tradeConfirmOrderNeedLogin('maoyan', {}).then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>4. 申请预订单</font></mark>**
* >
~~~js
static tradePrePayOrderNeedLogin(orderId, payType, prizeIds, redIds){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|orderId|string|订单Id|
|payType|string|支付类型|
|prizeIds|string|待定|
|redIds|string|待定|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkTrade.tradePrePayOrderNeedLogin('d123123', 'weixin', '', '').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~
   
**************************************************************************************************
</font>

###<font color='#0099ff'>类：JNetworkMine </font>
<font color='#999999'>

* **<mark><font color='#666666'>n. 我的订单</font></mark>**
* >
~~~js
static mineOrderNeedLogin(){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|-|-|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkMine.mineOrderNeedLogin().then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>2. 我的收藏</font></mark>**
* >
~~~js
static mineFavoriteNeedLogin(){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|-|-|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkMine.mineFavoriteNeedLogin().then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************
</font>

###<font color='#0099ff'>类：JNetworkCity </font>
<font color='#999999'>

* **<mark><font color='#666666'>1. 获取城市列表（需要定位）</font></mark>**
* >
~~~js
static cityListNeedLocation(){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|-|-|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCity.cityListNeedLocation().then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>2. 获取当前城市（需要定位）</font></mark>**
* >
~~~js
static cityListNeedLocation(location){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|location|object|定位信息**（可空）**|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCity.cityListNeedLocation({longitude:121.458858, latitude:23.484588}).then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>3. 获取城市列表</font></mark>**
* >
~~~js
static cityCities(){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|-|-|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkCity.cityCities().then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************
</font>

###<font color='#0099ff'>类：JNetworkAccount </font>
<font color='#999999'>

* **<mark><font color='#666666'>1. 用户登录</font></mark>**
* >
~~~js
static accountLogin(mobile, password){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|mobile|string|登录需要的手机号码|
|password|string|登录需要的密码|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkAccount.accountLogin('13764730291', '123456').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>2. 用户登出</font></mark>**
* >
~~~js
static accountLogout(sessionId){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|sessionId|string|用户登录标识|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkAccount.accountLogout('').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>3. 获取验证码</font></mark>**
* >
~~~js
static accountGetVerifyCode(mobile, type){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|mobile|string|接收验证码的手机号码|
|type|string|验证码类型 （1：注册使用 2：忘记密码使用）|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkAccount.accountGetVerifyCode('13764730291', 2).then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>4. 注册用户</font></mark>**
* >
~~~js
static accountRegister(mobile, verifyCode, password){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|mobile|string|用户的手机号码|
|verifyCode|string|验证码|
|password|string|密码|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkAccount.accountRegister('13764730291', '112525', '123456').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>5. 忘记密码并且找回密码</font></mark>**
* >
~~~js
static accountUpdatepass(mobile, verifyCode, password){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|mobile|string|用户的手机号码|
|verifyCode|string|验证码|
|password|string|新密码|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkAccount.accountUpdatepass('13764730291', '112525', '123456').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

</font>

###<font color='#0099ff'>类：JNetworkOther </font>
<font color='#999999'>

* **<mark><font color='#666666'>1. 搜索</font></mark>**
* >
~~~js
static search(val, lastKey){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|val|string|关键字|
|lastKey|string|目前无用|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkOther.search('上海').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});

**************************************************************************************************

* **<mark><font color='#666666'>2. 按城市搜索</font></mark>**
* >
~~~js
static searchSearch(cityId, query, lastKey){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|cityId|string|城市Id|
|query|string|关键字|
|lastKey|string|目前无用|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkOther.searchSearch().then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>3. 热搜词汇</font></mark>**
* >
~~~js
static hotQuery(){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|-|-|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkOther.hotQuery().then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>4. 广告接口</font></mark>**
* >
~~~js
static bannersNeedCItyIdNeedLocation(){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|-|-|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkOther.bannersNeedCItyIdNeedLocation().then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>5. 广告栏</font></mark>**
* >
~~~js
static pageBanners(){}
~~~

* **请求参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|-|-|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|promise|异步请求封装|

- **调用示例**
>  
~~~js 
JNetworkOther.pageBanners().then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************
</font>

## <font color='#ff0000' size:>模块：JNetwork(Delegate) </font> 

###<font id='JNetworkDelegate' color='#0099ff'>代理：JNetworkDelegate </font>
<font color='#999999'>

* **<mark><font color='#666666'>1. 城市信息请求参数代理</font></mark>**
* >
~~~js
static cityParas(){}
~~~

* **回调参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|-|-|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|[CityModel](#CityModel)|城市模型|

- **调用示例**
>  
~~~js 
 cityParas() {
        return store.getState().location.userLocationCity;
 }
~~~

**************************************************************************************************

* **<mark><font color='#666666'>2. 定位信息请求参数代理</font></mark>**
* >
~~~js
static locationParas(){}
~~~

* **回调参数**
>
| 请求参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|-|-|

- **返回参数**
> |返回参数|参数类型|参数说明|
|:--------|:--------|:------|
|-|[CoordinateModel](#CoordinateModel)|定位信息模型|

- **调用示例**
>  
~~~js 
 locationParas() {
         return {latitude: 41.816804:, 
                 longitude: 123.426065};
 }
~~~

**************************************************************************************************

**************************************************************************************************

**************************************************************************************************

**************************************************************************************************
</font>

## <font color='#ff0000' size:>模块：JNetwork(Model) </font> 

###<font id='CityModel' color='#0099ff'>模型：CityModel </font>
<font color='#999999'>
**************************************************************************************************
</font>

###<font id='ConfigModel' color='#0099ff'>模型：ConfigModel </font>
<font color='#999999'>

* **描述**
> Network配置模型

* **属性**
>
|所属|参数|参数类型|参数说明|
|:--------|:--------|:--------|:------|
|-|baseUrl|string|网络请求基础地址|
|-|delegate|id \<[JNetworkDelegate](#JNetworkDelegate)\>|网络请求代理|

**************************************************************************************************

###<font id='CoordinateModel' color='#0099ff'>模型：CoordinateModel </font>
<font color='#999999'>

* **描述**
> 定位模型

* **属性**
>
|所属|参数|参数类型|参数说明|
|:--------|:--------|:--------|:------|
|-|latitude|double|纬度|
|-|longitude|double|经度|

**************************************************************************************************

</font>