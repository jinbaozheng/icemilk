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
| 请求参数       | 数据类型   | 数据说明 |
| :--------- | :----- | :--- |
| url        | string | 相对地址 |
| parameters | string | 地址参数 |
| headers    | string | 头参数  |

- **返回数据**
> | 返回数据 | 数据类型 | 数据说明    |
> | :--- | :--- | :------ |
> | data | *    | 请求返回的数据 |

- **调用示例**
>  
~~~js 
      JNetwork.POST('/refreshlocation', {
        longitude: 122.0248313589239,
        latitude: 37.33800802417976
      }, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }).then(data => {
        console.log(data);
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
| 请求参数       | 数据类型   | 数据说明 |
| :--------- | :----- | :--- |
| url        | string | 相对地址 |
| parameters | string | 地址参数 |
| headers    | string | 头参数  |

- **返回数据**
> | 返回数据 | 数据类型 | 数据说明    |
> | :--- | :--- | :------ |
> | data | *    | 请求返回的数据 |

- **调用示例**
>  
~~~js 
      JNetwork.GET('/refreshlocation', {
        longitude: 122.0248313589239,
        latitude: 37.33800802417976
      }).then(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
~~~

**************************************************************************************************
</font>

###<font color='#0099ff'>类：JNetworkConfig</font>
<font color='#999999'>

* **<mark><font color='#666666'>1. 获取首页数据</font></mark>**

- > 
```js
static setConfig(config){}
```

- **请求参数**
>
| 请求参数   | 数据类型                        | 数据说明   |
| :----- | :-------------------------- | :----- |
| config | [ConfigModel](#ConfigModel) | object |

- **返回数据**
>
| 返回数据 | 数据类型 | 数据说明 |
| :--- | :--- | :--- |
| -    | -    | -    |

- **调用示例**
>    
~~~js 
JNetworkConfig.setConfig({
        baseUrl: 'https://jbz-dev.idoupiao.com/openfilm/appapi'
      });
~~~

**************************************************************************************************
</font>

###<font color='#0099ff'>类：JNetworkFilm </font>
<font color='#999999'>

* **<mark><font color='#666666'>2. 分页获取热门电影</font></mark>**
* >
  ~~~js
  static filmHotfilms(cityId = empty, page = empty){}
  ~~~

* **请求参数**
>
| 请求参数   | 数据类型 | 数据说明 |
| :----- | :--- | :--- |
| cityId | int  | 城市Id |
| page   | int  | 页号   |

- **返回数据**
> | 返回数据  | 数据类型                                | 数据说明     |
> | :---- | :---------------------------------- | :------- |
> | films | Array                               | 获取到的影片列表 |
> | -     | [FilmDetailModel](#FilmDetailModel) | 影片       |

- **调用示例**
>    
~~~js 
JNetworkFilm.filmHotfilms(2, 1).then((data) => {
     console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>3. 获取待映电影</font></mark>**
* >
  ~~~js
  static filmWaitfilmsWithPage(cityId, page = 1){}
  ~~~

* **请求参数**
>
| 请求参数   | 数据类型   | 数据说明 |
| :----- | :----- | :--- |
| cityId | string | 城市Id |
| page   | int    | 页号   |

- **返回数据**
> | 返回数据 | 数据类型                                | 数据说明 |
> | :--- | :---------------------------------- | :--- |
> | -    | [FilmDetailModel](#FilmDetailModel) | 影片   |

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

* **<mark><font color='#666666'>4. 获取影片详情</font><mark>**
* >
  ~~~js
  static filmDetail(filmId, platform = empty){}
  ~~~

* **请求参数**
>
| 请求参数     | 数据类型                          | 数据说明                                    |
| :------- | :---------------------------- | :-------------------------------------- |
| filmId   | string                        | 影片Id(如果platform为空, 则使用jbz的id,否则使用平台的Id) |
| platform | [EnumPlatform](#EnumPlatform) | 平台类型                                    |

- **返回数据**
> | 返回数据 | 数据类型                                | 数据说明 |
> | :--- | :---------------------------------- | :--- |
> | -    | [FilmDetailModel](#FilmDetailModel) | 影片详情 |

- **调用示例**
>    
~~~js 
JNetworkFilm.filmDetail('248700', 'maoyan').then((data) => {
     console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>5. 获取所有电影列表 (未实现)?</font></mark>**
* >
~~~js
static filmList(cityId = empty){}
~~~

* **请求参数**
>
| 请求参数   | 数据类型 | 数据说明        |
| :----- | :--- | :---------- |
| cityId | int  | 需要获取电影列表的城市 |

- **返回数据**
> | 返回数据           | 数据类型                                | 数据说明   |
> | :------------- | :---------------------------------- | :----- |
> | upcommingFilms | Array                               | 待映影片列表 |
> | -              | [FilmDetailModel](#FilmDetailModel) | 影片     |
> | hotFilms       | Array                               | 热映影片列表 |
> | -              | [FilmDetailModel](#FilmDetailModel) | 影片     |

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

</font>

###<font color='#0099ff'>类：JNetworkCinema </font>
<font color='#999999'>

* **<mark><font color='#666666'>1. 获取影院详情 (暂时不可用)?</font></mark>**
* >
~~~js
static cinemaDetail(cinemaId){}
~~~

* **请求参数**
>
| 请求参数     | 数据类型   | 数据说明 |
| :------- | :----- | :--- |
| cinemaId | string | 影院ID |

- **返回数据**
> | 返回数据 | 数据类型 | 数据说明 |
> | :--- | :--- | :--- |
> | -    | -    | -    |

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
* **<mark><font color='#666666'>2. 比价影院的列表</font></mark>**
* >
~~~js
static cinemaContrastListNeedLocation(filmId = empty, regionName, orderType){}
~~~

* **请求参数**
>
| 请求参数       | 数据类型   | 数据说明           |
| :--------- | :----- | :------------- |
| filmId     | string | 影片Id           |
| regionName | string | 地域名字           |
| orderType  | int    | 排序类型 1:距离 2:价格 |

- **返回数据**
> | 返回数据    | 数据类型                                     | 数据说明  |
> | :------ | :--------------------------------------- | :---- |
> | cinemas | Array                                    | 影院列表  |
> | -       | [CinemaCompareModel](#CinemaCompareModel) | 影院    |
> | regions | Array                                    | 行政区列表 |
> | -       | [RegionModel](#RegionModel)              | 行政区   |

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaContrastListNeedLocation('1a692bb163fa4609b59927055faab749', '', 1).then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>3. 影院列表 </font></mark>**
* >
~~~js
static cinemaListNeedLocation(filmId){}
~~~

* **请求参数**
>
| 请求参数   | 数据类型   | 数据说明 |
| :----- | :----- | :--- |
| filmId | string | 影片id |

- **返回数据**
> | 返回数据            | 数据类型                        | 数据说明 |
> | :-------------- | :-------------------------- | :--- |
> | cinemas         | Array                       | 影院列表 |
> | -               | [CinemaModel](#CinemaModel) | 影院   |
> | recommandCinema | Array                       | 推荐影院 |

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaListNeedLocation('1a692bb163fa4609b59927055faab749').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>4. 实时座位图?</font></mark>**
* >
~~~js
static cinemaSeat(type, paras){}
~~~

* **请求参数**
>
| 请求参数  | 数据类型                              | 数据说明       |
| :---- | :-------------------------------- | :--------- |
| type  | [EnumPlatform](#EnumPlatform)     | 平台类型       |
| paras | [SeatParasModel](#SeatParasModel) | （根据不同平台变化） |
- **返回数据**
> | 返回数据  | 数据类型    | 数据说明   |
> | :---- | :------ | :----- |
> | Array | promise | 异步请求封装 |

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

* **<mark><font color='#666666'>5. 收藏影院</font></mark>**
* >
~~~js
static cinemaFavoriteCinemaNeedLogin(cinemaId, cinemaName){}
~~~

* **请求参数**
>
| 请求参数       | 数据类型   | 数据说明 |
| :--------- | :----- | :--- |
| cinemaId   | string | 影院Id |
| cinemaName | string | 影院名字 |

- **返回数据**
> | 返回数据 | 数据类型 | 数据说明 |
> | :--- | :--- | :--- |
> | -    | -    | -    |

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaFavoriteCinemaNeedLogin('800705', '上海鸿纳国际影城').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>6. 取消收藏影院</font></mark>**
* >
~~~js
static cinemaCancelFavoriteCinemaNeedLogin(cinemaId){}
~~~

* **请求参数**
>
| 请求参数     | 数据类型   | 数据说明 |
| :------- | :----- | :--- |
| cinemaId | string | 影院Id |

- **返回数据**
> | 返回数据 | 数据类型 | 数据说明 |
> | :--- | :--- | :--- |
> | -    | -    | -    |

- **调用示例**
>  
~~~js 
JNetworkCinema.cinemaCancelFavoriteCinemaNeedLogin('800705').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************
</font>

###<font color='#0099ff'>类：JNetworkScreening </font>
<font color='#999999'>

* **<mark><font color='#666666'>1. 指定影院的排片的电影列表及影院本身的信息(如影院电影排片和影院电话及地址)</font></mark>**
* >
~~~js
static screeningFilmList(cinemaId){}
~~~

* **请求参数**
>
| 请求参数     | 数据类型   | 数据说明 |
| :------- | :----- | :--- |
| cinemaId | string | 影院Id |

- **返回数据**
> | 返回数据                | 数据类型                                | 数据说明 |
> | :------------------ | :---------------------------------- | :--- |
> | cinema              | [BaseCinemaModel](#BaseCinemaModel) | 影院信息 |
> | cinemaMobile        | string                              | 影院电话 |
> | films               | Array                               | 电影列表 |
> | -                   | [FilmDetailModel](#FilmDetailModel) | 电影   |
> | isCollected = empty | bool                                | 是否收藏 |

- **调用示例**
>  
~~~js 
JNetworkFilmView.screeningFilmList('800705').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>2. 获取指定影院排片日期安排</font></mark>**
* >
~~~js
static screeningDateList(cinemaId, filmId){}
~~~

* **请求参数**
>
| 请求参数     | 数据类型   | 数据说明 |
| :------- | :----- | :--- |
| cinemaId | string | 影院Id |
| filmId   | string | 影片Id |

- **返回数据**
> | 返回数据  | 数据类型   | 数据说明                |
> | :---- | :----- | :------------------ |
> | dates | Array  | 日期列表                |
> | -     | string | 日期 (格式: 2017-04-21) |

- **调用示例**
>  
~~~js 
JNetworkFilmView.screeningDateList('800705', '1a692bb163fa4609b59927055faab749').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>3. 获取指定影院排片放映厅安排</font></mark>**
* >
~~~js
static screeningItems(cinemaId, filmId, date){}
~~~

* **请求参数**
>
| 请求参数     | 数据类型   | 数据说明 |
| :------- | :----- | :--- |
| cinemaId | string | 影院Id |
| filmId   | string | 影片Id |
| date     | string | 日期   |

- **返回数据**
> | 返回数据      | 数据类型                              | 数据说明  |
> | :-------- | :-------------------------------- | :---- |
> | filmViews | Array                             | 所有的场次 |
> | -         | [ScreeningModel](#ScreeningModel) | 场次信息  |

- **调用示例**
>  
~~~js 
JNetworkFilmView.screeningItems('800705', '1a692bb163fa4609b59927055faab749', '2017-04-21').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

</font>
###<font color='#0099ff'>类：JNetworkTrade </font>
<font color='#999999'>

* **<mark><font color='#666666'>1. 锁座+</font></mark>**
* >
~~~js
static tradeLockSeatNeedLogin(type, paras){}
~~~

* **请求参数**
>
| 请求参数  | 数据类型   | 数据说明 |
| :---- | :----- | :--- |
| type  | string | 平台类型 |
| paras | object | 锁座参数 |

- **返回数据**
> | 返回数据 | 数据类型    | 数据说明   |
> | :--- | :------ | :----- |
> | -    | promise | 异步请求封装 |

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

* **<mark><font color='#666666'>2. 取消锁座+</font></mark>**
* >
~~~js
static cancelLockSeatNeedLogin(orderId){}
~~~

* **请求参数**
>
| 请求参数    | 数据类型   | 数据说明 |
| :------ | :----- | :--- |
| orderId | string | 订单Id |

- **返回数据**
> | 返回数据 | 数据类型    | 数据说明   |
> | :--- | :------ | :----- |
> | -    | promise | 异步请求封装 |

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

* **<mark><font color='#666666'>3. 下订单+</font></mark>**
* >
~~~js
static tradeConfirmOrderNeedLogin(type, paras){}
~~~

* **请求参数**
>
| 请求参数  | 数据类型   | 数据说明  |
| :---- | :----- | :---- |
| type  | string | 平台类型  |
| paras | object | 下订单参数 |

- **返回数据**
> | 返回数据 | 数据类型    | 数据说明   |
> | :--- | :------ | :----- |
> | -    | promise | 异步请求封装 |

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

* **<mark><font color='#666666'>4. 申请预订单+</font></mark>**
* >
~~~js
static tradePrePayOrderNeedLogin(orderId, payType, prizeIds, redIds){}
~~~

* **请求参数**
>
| 请求参数     | 数据类型   | 数据说明 |
| :------- | :----- | :--- |
| orderId  | string | 订单Id |
| payType  | string | 支付类型 |
| prizeIds | string | 待定   |
| redIds   | string | 待定   |

- **返回数据**
> | 返回数据 | 数据类型    | 数据说明   |
> | :--- | :------ | :----- |
> | -    | promise | 异步请求封装 |

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

* **<mark><font color='#666666'>n. 我的订单+</font></mark>**
* >
~~~js
static mineOrderNeedLogin(){}
~~~

* **请求参数**
>
| 请求参数 | 数据类型 | 数据说明 |
| :--- | :--- | :--- |
| -    | -    | -    |

- **返回数据**
> | 返回数据 | 数据类型    | 数据说明   |
> | :--- | :------ | :----- |
> | -    | promise | 异步请求封装 |

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

* **<mark><font color='#666666'>2. 我的收藏+</font></mark>**
* >
~~~js
static mineFavoriteNeedLogin(){}
~~~

* **请求参数**
>
| 请求参数 | 数据类型 | 数据说明 |
| :--- | :--- | :--- |
| -    | -    | -    |

- **返回数据**
> | 返回数据 | 数据类型    | 数据说明   |
> | :--- | :------ | :----- |
> | -    | promise | 异步请求封装 |

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

* **<mark><font color='#666666'>1. 获取城市列表(可以使用定位)</font></mark>**
* >
~~~js
static cityListShouldLocation(){}
~~~

* **请求参数**
>
| 请求参数 | 数据类型 | 数据说明 |
| :--- | :--- | :--- |
| -    | -    | -    |


- **返回数据**
> | 返回数据                | 数据类型                    | 数据说明   |
> | :------------------ | :---------------------- | :----- |
> | hotCities           | Array                   | 热门城市列表 |
> | -                   | [CityModel](#CityModel) | 城市     |
> | cities              | Array                   | 所有城市列表 |
> | -                   | [CityModel](#CityModel) | 城市     |
> | currentCity = empty | [CityModel](#CityModel) | 当前城市   |

- **调用示例**
>  
~~~js 
JNetworkCity.cityListShouldLocation().then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>2. 获取当前城市（需要定位）</font></mark>**
* >
~~~js
static cityCurrentCityNeedLocation(location = empty){}
~~~

* **请求参数**
>
| 请求参数     | 数据类型                                | 数据说明                          |
| :------- | :---------------------------------- | :---------------------------- |
| location | [CoordinateModel](#CoordinateModel) | 定位信息**（可空, 为空则使用location回调）** |

- **返回数据**
> | 返回数据        | 额外信息          | 数据类型                    | 数据说明                 |
> | :---------- | :------------ | :---------------------- | :------------------- |
> | currentCity | -             | [CityModel](#CityModel) | 城市模型                 |
> | -           | formatAddress | string                  | 详细地址， 放在currentCity中 |

- **调用示例**
>  
~~~js 
JNetworkCity.cityCurrentCityNeedLocation({longitude:121.458858, latitude:23.484588}).then((data) => { 
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
| 请求参数     | 数据类型   | 数据说明      |
| :------- | :----- | :-------- |
| mobile   | string | 登录需要的手机号码 |
| password | string | 登录需要的密码   |

- **返回数据**
> | 返回数据       | 数据类型                          | 数据说明 |
> | :--------- | :---------------------------- | :--- |
> | jbzAccount | [AccountModel](#AccountModel) | 用户模型 |
> | jbzSession | [SessionModel](#SessionModel) | 登录模型 |

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

* **<mark><font color='#666666'>2. 用户登出+</font></mark>**
* >
~~~js
static accountLogout(sessionId){}
~~~

* **请求参数**
>
| 请求参数      | 数据类型   | 数据说明   |
| :-------- | :----- | :----- |
| sessionId | string | 用户登录标识 |

- **返回数据**
> | 返回数据 | 数据类型    | 数据说明   |
> | :--- | :------ | :----- |
> | -    | promise | 异步请求封装 |

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
static accountVerifyCode(mobile, type){}
~~~

* **请求参数**
>
| 请求参数   | 数据类型   | 数据说明                    |
| :----- | :----- | :---------------------- |
| mobile | string | 接收验证码的手机号码              |
| type   | string | 验证码类型 （1：注册使用 2：忘记密码使用） |

- **返回数据**
> | 返回数据 | 数据类型    | 数据说明          |
> | :--- | :------ | :------------ |
> | !    | message | 目前这个接口返回数据不规范 |

- **调用示例**
>  
~~~js 
JNetworkAccount.accountVerifyCode('13764730291', 2).then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});
~~~

**************************************************************************************************

* **<mark><font color='#666666'>4. 注册用户+</font></mark>**
* >
~~~js
static accountRegister(mobile, verifyCode, password){}
~~~

* **请求参数**
>
| 请求参数       | 数据类型   | 数据说明    |
| :--------- | :----- | :------ |
| mobile     | string | 用户的手机号码 |
| verifyCode | string | 验证码     |
| password   | string | 密码      |

- **返回数据**
> | 返回数据       | 数据类型                          | 数据说明 |
> | :--------- | :---------------------------- | :--- |
> | jbzAccount | [AccountModel](#AccountModel) | 用户模型 |
> | jbzSession | [SessionModel](#SessionModel) | 登录模型 |

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
| 请求参数       | 数据类型   | 数据说明    |
| :--------- | :----- | :------ |
| mobile     | string | 用户的手机号码 |
| verifyCode | string | 验证码     |
| password   | string | 新密码     |

- **返回数据**
> | 返回数据       | 数据类型                          | 数据说明 |
> | :--------- | :---------------------------- | :--- |
> | jbzAccount | [AccountModel](#AccountModel) | 用户模型 |
> | jbzSession | [SessionModel](#SessionModel) | 登录模型 |

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
static otherSearch(cityId = empty, key, lastKey = empty){}
~~~

* **请求参数**
>
| 请求参数    | 数据类型   | 数据说明   |
| :------ | :----- | :----- |
| cityId  | string | 城市     |
| key     | string | 关键字    |
| lastKey | string | 下一页的句柄 |

- **返回数据**
> | 返回数据        | 数据类型   | 数据说明       |
> | :---------- | :----- | :--------- |
> | cinemas     | Array  | 搜索到的影院列表   |
> | films       | Array  | 搜索到的影片列表   |
> | cinemaTotal | int    | 总共搜索到的影院条数 |
> | filmTotal   | int    | 总共搜索到的影片条数 |
> | lastKey     | string | -          |

- **调用示例**
>  
~~~js 
JNetworkOther.otherSearch(null, '上海').then((data) => { 
    console.log(data)
}, error => {
     console.log(error);
});

**************************************************************************************************

* **<mark><font color='#666666'>2. 广告栏接口</font></mark>**
* >
~~~js
static otherBanners(cityId = empty){}
~~~

* **请求参数**
>
| 请求参数   | 数据类型 | 数据说明 |
| :----- | :--- | :--- |
| cityId | int  | 城市Id |

- **返回数据**
> | 返回数据 | 数据类型    | 数据说明   |
> | :--- | :------ | :----- |
> | -    | promise | 异步请求封装 |

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
| 请求参数 | 数据类型 | 数据说明 |
| :--- | :--- | :--- |
| -    | -    | -    |

- **返回数据**
> | 返回数据 | 数据类型                    | 数据说明 |
> | :--- | :---------------------- | :--- |
> | -    | [CityModel](#CityModel) | 城市模型 |

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
| 请求参数 | 数据类型 | 数据说明 |
| :--- | :--- | :--- |
| -    | -    | -    |

- **返回数据**
> | 返回数据 | 数据类型                                | 数据说明   |
> | :--- | :---------------------------------- | :----- |
> | -    | [CoordinateModel](#CoordinateModel) | 定位信息模型 |

- **调用示例**
>  
~~~js 
 locationParas() {
         return {latitude: 41.816804:, 
                 longitude: 123.426065};
 }
~~~

**************************************************************************************************
</font>

## <font color='#ff0000' size:>模块：JNetwork(Model) </font> 

###<font id='CityModel' color='#0099ff'>模型：CityModel </font>
<font color='#999999'>

* **描述**
> 城市模型

* **属性**
>
| 所属   | 参数      | 数据类型   | 数据说明 | 数据示例     |
| :--- | :------ | :----- | :--- | :------- |
| -    | name    | string | 名称   | 上海       |
| -    | city_en | string | 拼音   | shanghai |
| -    | id      | int    | 标识   | 2        |
**************************************************************************************************
</font>

###<font id='ConfigModel' color='#0099ff'>模型：ConfigModel </font>
<font color='#999999'>

* **描述**
> Network配置模型

* **属性**
>
| 所属   | 参数       | 数据类型                                     | 数据说明     | 数据示例                                     |
| :--- | :------- | :--------------------------------------- | :------- | :--------------------------------------- |
| -    | baseUrl  | string                                   | 网络请求基础地址 | http:https://jbz-dev.idoupiao.com/openfilm/ |
| -    | delegate | id \<[JNetworkDelegate](#JNetworkDelegate)\> | 网络请求代理   | -                                        |

**************************************************************************************************

###<font id='CoordinateModel' color='#0099ff'>模型：CoordinateModel </font>
<font color='#999999'>

* **描述**
> 定位模型

* **属性**
>
| 所属   | 参数        | 数据类型   | 数据说明 | 数据示例          |
| :--- | :-------- | :----- | :--- | :------------ |
| -    | latitude  | double | 纬度   | 122.024831358 |
| -    | longitude | double | 经度   | 37.3380080241 |

**************************************************************************************************
###<font id='BaseFilmModel' color='#0099ff'>模型：BaseFilmModel </font>
<font color='#999999'>

* **描述**
> 影片基础模型

* **属性**
>
| 所属   | 参数          | 数据类型   | 数据说明      | 数据示例                             |
| :--- | :---------- | :----- | :-------- | :------------------------------- |
| -    | name        | string | 名称        | 速度与激情8                           |
| -    | grade       | string | 评分        | 9.2                              |
| -    | dimensional | string | 放映类型      | 2D/3D/IMAX 3D/中国巨幕/全景声           |
| -    | description | string | 描述        | 车主要黑化 家族被击垮                      |
| -    | director    | string | 导演        | F·加里·格雷                          |
| -    | actors      | string | 演员        | 范·迪塞尔,杰森·斯坦森,道恩·强森               |
| -    | showDate    | string | 日期        | 2017-04-14                       |
| -    | duration    | string | 时长(单位:分钟) | 136                              |
| -    | bigImg      | string | 大图        | http://sep9.cn/c4gwtj            |
| -    | id          | string | 金保证Id     | 1a692bb163fa4609b59927055faab749 |
**************************************************************************************************

###<font id='FilmDetailModel' color='#0099ff'>模型：FilmDetailModel : [BaseFilmModel](#BaseFilmModel) </font>
<font color='#999999'>

* **描述**
> 影片详情模型

* **属性**
>
| 所属   | 参数          | 数据类型   | 数据说明         | 数据示例                                     |
| :--- | :---------- | :----- | :----------- | :--------------------------------------- |
| -    | category    | string | 类型           | "动作,惊悚,犯罪"                               |
| -    | language    | string | 语言           | 英语                                       |
| -    | area        | string | 上映国家         | 大陆上映                                     |
| -    | info        | string | 信息           | <p>在这一部中></p>                            |
| -    | isShow      | bool   | 是否已经上映       | true                                     |
| -    | smallImg    | string | 小图           | http://omdf7d8sn.bkt.clouddn.com/film/bd/速度与激情8 |
| -    | photos      | string | 图片列表(','号分离) | http://sep9.cn/x4mbtk,http://sep9.cn/3q2ax1 |
| -    | bdId        | string | 糯米Id         | 94866                                    |
| -    | dcId        | string | 单车Id         | 911                                      |
| -    | myId        | string | 猫眼Id         | 248700                                   |
| -    | mzId        | string | 卖座Id         | 3456                                     |
| -    | wpId        | string | 网票Id         | 26608                                    |
| -    | spiderId    | string | 蜘蛛Id         | 201704760207                             |
| -    | createdTime | int    | 创建时间         | 1492286400000                            |

**************************************************************************************************

###<font id='CommentModel' color='#0099ff'>模型：CommentModel</font>
<font color='#999999'>

* **描述**
> 影片评论模型

* **属性**
>
| 所属   | 参数         | 数据类型   | 数据说明 | 数据示例                                     |
| :--- | :--------- | :----- | :--- | :--------------------------------------- |
| -    | nick       | string | 类型   | cuppi                                    |
| -    | insertTime | string | 插入时间 | 2017-04-19 01:50:26                      |
| -    | score      | string | 评分   | 5                                        |
| -    | sureViewed | string | ?    | 1                                        |
| -    | approve    | int    | 点赞   | 709                                      |
| -    | filmId     | int    | ?    | 248700                                   |
| -    | oppose     | int    | ?    | 0                                        |
| -    | spoiler    | int    | ?    | 0                                        |
| -    | id         | int    | ?    | 102450041                                |
| -    | time       | string | 评论时间 | 2017-04-14 02:57                         |
| -    | content    | string | 内容   | 从2001年的速1一直追到2017年的速8，从不会飙车的毛头小子，到独挡一面团队领袖。保罗的离去让 |

**************************************************************************************************

###<font id='BaseCinemaModel' color='#0099ff'>模型：BaseCinemaModel</font>
<font color='#999999'>

* **描述**
> 影院基础模型

* **属性**
>
| 所属   | 参数           | 数据类型                                    | 数据说明   | 数据示例                 |
| :--- | :----------- | :-------------------------------------- | :----- | :------------------- |
| -    | name         | string                                  | 名称     | 大地影院罗宾森店             |
| -    | address      | string                                  | 地址     | 上海市嘉定区城中路138号罗宾森广场4楼 |
| -    | distance     | int                                     | 距离     | 12351.6              |
| -    | compareCount | int                                     | 平台数量   | 4                    |
| -    | cinemaNames  | Array \<[EnumPlatform](#EnumPlatform)\> | 平台名字列表 | ["dazhong","baidu"]  |
| -    | showTime     | string                                  | ?      | 2017-04-19 18:15     |
| -    | id           | string                                  | 金保证Id  | 802965               |
| -    | minJbzPrice  | int                                     | 金保证价格  | 33                   |
| -    | price        | int                                     | 价格     | 33                   |
| -    | minPrice     | int                                     | 最低价格   | 33                   |

**************************************************************************************************

###<font id='CinemaModel' color='#0099ff'>模型：CinemaModel : [BaseCinemaModel](#BaseCinemaModel) </font>
<font color='#999999'>

* **描述**
> 影院比价的模型

* **属性**
>
| 所属   | 参数           | 数据类型   | 数据说明   | 数据示例                             |
| :--- | :----------- | :----- | :----- | :------------------------------- |
| -    | regionName   | string | 行政区    | 宝山区                              |
| -    | longitude    | double | 经度     | 121.412                          |
| -    | latitude     | double | 纬度     | 31.4595                          |
| -    | cityId       | int    | 城市Id   | 2                                |
| -    | cinemaId     | string | 影院Id   | 800620                           |
| -    | cinemaName   | string | 影院名称   | 上海亿博国际影城                         |
| -    | filmId       | string | 影片Id   | 1a692bb163fa4609b59927055faab749 |
| -    | compareNames | string | 比价名称列表 | spider,baidu                     |
| -    | filmName     | string | ?      | 速度与激情8                           |
| -    | highPrice    | int    | ?      | 3500                             |
| -    | createdTime  | string | ?      | 2017-04-12 09:33:09              |
| -    | showDate     | string | ?      | 2017-04-15                       |
| -    | lowPrice     | int    | ?      | 3300                             |

**************************************************************************************************

###<font id='CinemaCompareModel' color='#0099ff'>模型：CinemaCompareModel : [BaseCinemaModel](#BaseCinemaModel) </font>
<font color='#999999'>

* **描述**
> 影院比价的模型

* **属性**
>
| 所属   | 参数                                       | 数据类型   | 数据说明    | 数据示例             |
| :--- | :--------------------------------------- | :----- | :------ | :--------------- |
| -    | jbzShowTime                              | string | ?       | 2017-04-19 18:15 |
| -    | addDc                                    | bool   | ?       | true             |
| -    | type                                     | string | 当前模型的平台 | baidu            |
| -    | priority                                 | int    | 优先级     | 2                |
| -    | ~[wpId, spId, mzId, dcId, myId, mtId, dzId, bdId] | string | 平台商的Id  | 870              |

**************************************************************************************************

###<font id='ScreeningModel' color='#0099ff'>模型：ScreeningModel </font>
<font color='#999999'>

* **描述**
> 影院场次的模型

* **属性**
>
| 所属   | 参数           | 数据类型   | 数据说明     | 数据示例  |
| :--- | :----------- | :----- | :------- | :---- |
| -    | compareCount | int    | 比价平台个数   | 1     |
| -    | data         | Array  | 比价平台原始数据 | -     |
| -    | dimensional  | string | 放映类型     | 3D    |
| -    | minJbzPrice  | int    | 金保证最低价格  | 43    |
| -    | minPrice     | int    | 最低价格     | 43    |
| -    | showTime     | string | 放映时间     | 15:00 |
| -    | endTime      | string | 结束时间     | 17:16 |
| -    | lg           | string | 语言       | 英语    |
| -    | hallName     | string | 放映厅名字    | 一号厅   |

**************************************************************************************************

###<font id='RegionModel' color='#0099ff'>模型：RegionModel </font>
<font color='#999999'>

* **描述**
> 行政区模型

* **属性**
>
| 所属   | 参数   | 数据类型   | 数据说明  | 数据示例 |
| :--- | :--- | :----- | :---- | :--- |
| -    | ID   | string | 行政区Id | 289  |
| -    | Name | string | 行政区名字 | 宝山区  |

**************************************************************************************************

###<font id='SeatParasModel' color='#0099ff'>模型：SeatParasModel </font>
<font color='#999999'>

* **描述**
> 座位图请求参数模型

* **属性**
>
| 所属   | 参数       | 数据类型   | 数据说明  | 使用平台                                     |
| :--- | :------- | :----- | :---- | :--------------------------------------- |
| -    | cinemaId | string | 影院Id  | wangpiao \| spider                       |
| -    | showId   | string | 场次Id  | wangpiao \| spider \| maizuo \| danche \| maoyan \| meituan \| dazhong \| baidu |
| -    | hallId   | string | 放映厅Id | spider                                   |

**************************************************************************************************

###<font id='AccountModel' color='#0099ff'>模型：AccountModel </font>
<font color='#999999'>

* **描述**
> 用户信息模型

* **属性**
>
| 所属   | 参数             | 数据类型   | 数据说明   | 数据示例                             |
| :--- | :------------- | :----- | :----- | :------------------------------- |
| -    | password       | string | 密码     | E10ADC3949BA59ABBE56E057F20F883E |
| -    | openId         | string | 用户标识   | -                                |
| -    | nickName       | string | 昵称     | -                                |
| -    | mobile         | string | 手机号码   | 13764730291                      |
| -    | createdTime    | string | 创建时间   | 2017-02-23 11:55:07              |
| -    | disabled       | int    | 是否可用   | 0                                |
| -    | id             | int    | 标识     | 125                              |
| -    | source         | ?      | ?      | -                                |
| -    | pufaCardNo     | ?      | ?      | -                                |
| -    | islogin        | int    | 是否登录   | 0                                |
| -    | lastUpdateTime | string | 最后更新时间 | 2017-02-23 11:55:07              |

**************************************************************************************************

###<font id='SessionModel' color='#0099ff'>模型：SessionModel </font>
<font color='#999999'>

* **描述**
> 登录标识模型

* **属性**
>
| 所属   | 参数        | 数据类型   | 数据说明 | 数据示例                             |
| :--- | :-------- | :----- | :--- | :------------------------------- |
| -    | accountId | int    | 用户Id | 125                              |
| -    | disabled  | int    | 是否可用 | 0                                |
| -    | sessionId | string | 登录标识 | c00e5c6713ba45f693c55fb37c45cc06 |
| -    | inType    | string | ?    |                                  |

**************************************************************************************************

</font>

## <font color='#ff0000' size:>模块：JNetwork(Enum) </font> 

###<font id='EnumPlatform' color='#0099ff'>枚举：EnumPlatform </font>
<font color='#999999'>

* **描述**
> 平台枚举

* **属性**
> 
| 类型     | 枚举       | 说明   |
| :----- | :------- | :--- |
| string | wangpiao | 网票   |
| \*     | maizuo   | 卖座   |
| \*     | spider   | 蜘蛛   |
| \*     | danche   | 单车   |
| \*     | maoyan   | 猫眼   |
| \*     | dazhong  | 大众   |
| \*     | meituan  | 美团   |

**************************************************************************************************

</font>
