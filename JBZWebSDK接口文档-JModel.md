[TOC]

# 斗票WebSDK接口文档

## 模块：JModel(Class)

### 模型：CityModel

- **描述**

  > 城市模型


- 属性

  > | 所属   | 参数    | 数据类型   | 数据说明 | 数据示例     |
  > | ---- | ----- | ------ | ---- | -------- |
  > | -    | name  | string | 名称   | 上海       |
  > | -    | latin | string | 拼音   | shanghai |
  > | -    | id    | int    | 标识   | 2        |

*******

### 模型：DistrictModel

- 描述

  > 行政区模型


- 属性

  > | 所属   | 参数   | 数据类型   | 数据说明 | 数据示例 |
  > | ---- | ---- | ------ | ---- | ---- |
  > | -    | id   | number | 标识   | 1128 |
  > | -    | name | string | 名称   | 徐汇区  |

******

### 模型：ConfigModel 

- **描述**

  > Network配置模型


- 属性

  > | 所属   | 参数       | 数据类型                                     | 数据说明     | 数据示例                                     |
  > | ---- | -------- | ---------------------------------------- | -------- | ---------------------------------------- |
  > | -    | baseUrl  | string                                   | 网络请求基础地址 | http:https://jbz-dev.idoupiao.com/openfilm/ |
  > | -    | delegate | id \<[JNetworkDelegate](#JNetworkDelegate)> | 网络请求代理   | -                                        |
  > | -    | inType   | [EnumInType](#EnumInType)                | 请求类型     | android                                  |

******

### 模型：CoordinateModel

- **描述**

  > 经纬度模型


- 属性

  > | 所属   | 参数        | 数据类型   | 数据说明 | 数据示例          |
  > | ---- | --------- | ------ | ---- | ------------- |
  > | -    | latitude  | double | 纬度   | 122.024831358 |
  > | -    | longitude | double | 经度   | 37.3380080241 |

******

### 模型：LocationModel

- 描述

  > 位置模型


- 属性

  > | 所属   | 参数        | 数据类型   | 数据说明 | 数据示例          |
  > | ---- | --------- | ------ | ---- | ------------- |
  > | -    | latitude  | double | 纬度   | 122.024831358 |
  > | -    | longitude | double | 经度   | 37.3380080241 |
  > | -    | cityId    | number | 城市id | 2             |

******

### 模型：BaseFilmModel

- **描述**

  > 影片基础模型


- 属性

  > | 所属   | 参数          | 数据类型   | 数据说明      | 数据示例                             |
  > | :--- | :---------- | :----- | :-------- | :------------------------------- |
  > | -    | name        | string | 名称        | 速度与激情8                           |
  > | -    | grade       | string | 评分        | 9.2                              |
  > | -    | dimensional | string | 放映类型      | 2D/3D/IMAX 3D/中国巨幕/全景声           |
  > | -    | description | string | 描述        | 车主要黑化 家族被击垮                      |
  > | -    | director    | string | 导演        | F·加里·格雷                          |
  > | -    | actors      | string | 演员        | 范·迪塞尔,杰森·斯坦森,道恩·强森               |
  > | -    | showDate    | string | 日期        | 2017-04-14                       |
  > | -    | duration    | string | 时长(单位:分钟) | 136                              |
  > | -    | bigImg      | string | 大图        | http://sep9.cn/c4gwtj            |
  > | -    | id          | string | 金保证Id     | 1a692bb163fa4609b59927055faab749 |

******

### 模型：FilmDetailModel : [BaseFilmModel](#BaseFilmModel)

- **描述**

  > 影片详情模型


- 属性

  > | 所属   | 参数          | 数据类型   | 数据说明         | 数据示例                                     |
  > | :--- | :---------- | :----- | :----------- | :--------------------------------------- |
  > | -    | category    | string | 类型           | "动作,惊悚,犯罪"                               |
  > | -    | language    | string | 语言           | 英语                                       |
  > | -    | area        | string | 上映国家         | 大陆上映                                     |
  > | -    | info        | string | 信息           | <p>在这一部中></p>                            |
  > | -    | isShow      | bool   | 是否已经上映       | true                                     |
  > | -    | smallImg    | string | 小图           | http://omdf7d8sn.bkt.clouddn.com/film/bd/速度与激情8 |
  > | -    | photos      | string | 图片列表(','号分离) | http://sep9.cn/x4mbtk,http://sep9.cn/3q2ax1 |
  > | -    | bdId        | string | 糯米Id         | 94866                                    |
  > | -    | dcId        | string | 单车Id         | 911                                      |
  > | -    | myId        | string | 猫眼Id         | 248700                                   |
  > | -    | mzId        | string | 卖座Id         | 3456                                     |
  > | -    | wpId        | string | 网票Id         | 26608                                    |
  > | -    | spiderId    | string | 蜘蛛Id         | 201704760207                             |
  > | -    | createdTime | int    | 创建时间         | 1492286400000                            |

******

### 模型：CommentModel

- **描述**

  > 影片评论模型


- 属性

  > | 所属   | 参数         | 数据类型   | 数据说明 | 数据示例                  |
  > | :--- | :--------- | :----- | :--- | :-------------------- |
  > | -    | nick       | string | 类型   | cuppi                 |
  > | -    | insertTime | string | 插入时间 | 2017-04-19 01:50:26   |
  > | -    | score      | string | 评分   | 5                     |
  > | -    | sureViewed | string | ?    | 1                     |
  > | -    | approve    | int    | 点赞   | 709                   |
  > | -    | filmId     | int    | ?    | 248700                |
  > | -    | oppose     | int    | ?    | 0                     |
  > | -    | spoiler    | int    | ?    | 0                     |
  > | -    | id         | int    | ?    | 102450041             |
  > | -    | time       | string | 评论时间 | 2017-04-14 02:57      |
  > | -    | content    | string | 内容   | 从2001年的速1一直追到2017年的速8 |

******

### 模型：BaseCinemaModel

- **描述**

  > 影院基础模型


- 属性

  | 所属   | 参数           | 数据类型                                    | 数据说明     | 数据示例                 |
  | :--- | :----------- | :-------------------------------------- | :------- | :------------------- |
  | -    | name         | string                                  | 名称       | 大地影院罗宾森店             |
  | -    | address      | string                                  | 地址       | 上海市嘉定区城中路138号罗宾森广场4楼 |
  | -    | distance     | int                                     | 距离       | 12351.6              |
  | -    | compareCount | int                                     | 平台数量     | 4                    |
  | -    | cinemaNames  | Array \<[EnumPlatform](#EnumPlatform)\> | 平台名字列表   | ["dazhong","baidu"]  |
  | -    | showTime     | string                                  | ?        | 2017-04-19 18:15     |
  | -    | id           | string                                  | 金保证Id    | 802965               |
  | -    | minJbzPrice  | int                                     | 金保证价格    | 33                   |
  | -    | price        | int                                     | 价格       | 33                   |
  | -    | minPrice     | int                                     | 最低价格     | 33                   |
  | -    | phone        | string                                  | 影院电话（可空） | 021-12345678         |

*****

### 模型：CinemaModel : [BaseCinemaModel](#BaseCinemaModel)

- **描述**

  > 影院比价的模型


- 属性

  > | 所属   | 参数           | 数据类型   | 数据说明   | 数据示例                             |
  > | :--- | :----------- | :----- | :----- | :------------------------------- |
  > | -    | regionName   | string | 行政区    | 宝山区                              |
  > | -    | longitude    | double | 经度     | 121.412                          |
  > | -    | latitude     | double | 纬度     | 31.4595                          |
  > | -    | cityId       | int    | 城市Id   | 2                                |
  > | -    | cinemaId     | string | 影院Id   | 800620                           |
  > | -    | cinemaName   | string | 影院名称   | 上海亿博国际影城                         |
  > | -    | filmId       | string | 影片Id   | 1a692bb163fa4609b59927055faab749 |
  > | -    | compareNames | string | 比价名称列表 | spider,baidu                     |
  > | -    | filmName     | string | ?      | 速度与激情8                           |
  > | -    | highPrice    | int    | ?      | 3500                             |
  > | -    | createdTime  | string | ?      | 2017-04-12 09:33:09              |
  > | -    | showDate     | string | ?      | 2017-04-15                       |
  > | -    | lowPrice     | int    | ?      | 3300                             |

*****

### 模型：CinemaCompareModel : [BaseCinemaModel](#BaseCinemaModel)

- **描述**

  > 影院比价的模型


- 属性

  > | 所属   | 参数                                       | 数据类型   | 数据说明    | 数据示例             |
  > | :--- | :--------------------------------------- | :----- | :------ | :--------------- |
  > | -    | jbzShowTime                              | string | ?       | 2017-04-19 18:15 |
  > | -    | addDc                                    | bool   | ?       | true             |
  > | -    | type                                     | string | 当前模型的平台 | baidu            |
  > | -    | priority                                 | int    | 优先级     | 2                |
  > | -    | ~[wpId, spId, mzId, dcId, myId, mtId, dzId, bdId] | string | 平台商的Id  | 870              |

*****

### 模型：ScreeningModel

- 描述

  > 影院场次的模型


- 属性

  | 所属   | 参数           | 数据类型   | 数据说明     | 数据示例  |
  | :--- | :----------- | :----- | :------- | :---- |
  | -    | compareCount | int    | 比价平台个数   | 1     |
  | -    | showItems    | Array  | 比价平台原始数据 | -     |
  | -    | dimensional  | string | 放映类型     | 3D    |
  | -    | minJbzPrice  | int    | 金保证最低价格  | 43    |
  | -    | minPrice     | int    | 最低价格     | 43    |
  | -    | showTime     | string | 放映时间     | 15:00 |
  | -    | endTime      | string | 结束时间     | 17:16 |
  | -    | language     | string | 语言       | 英语    |
  | -    | hallName     | string | 放映厅名字    | 一号厅   |

******

### 模型：RegionModel

- **描述**

  > 行政区模型


- 属性

  > | 所属   | 参数   | 数据类型   | 数据说明  | 数据示例 |
  > | :--- | :--- | :----- | :---- | :--- |
  > | -    | ID   | string | 行政区Id | 289  |
  > | -    | Name | string | 行政区名字 | 宝山区  |

******

### 模型：SeatParasModel 

- **描述**

  > 座位图请求参数模型


- 属性

  | 所属   | 参数       | 数据类型   | 数据说明  | 使用平台                                     |
  | :--- | :------- | :----- | :---- | :--------------------------------------- |
  | -    | cinemaId | string | 影院Id  | wangpiao \| spider                       |
  | -    | showId   | string | 场次Id  | wangpiao \| spider \| maizuo \| danche \| maoyan \| meituan \| dazhong \| baidu |
  | -    | hallId   | string | 放映厅Id | spider                                   |

******

### 模型：AccountModel 

- **描述**

  > 用户信息模型


- 属性

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

*****

### 模型：SessionModel 

- **描述**

  > 登录标识模型


- 属性

  | 所属   | 参数        | 数据类型   | 数据说明 | 数据示例                             |
  | :--- | :-------- | :----- | :--- | :------------------------------- |
  | -    | accountId | int    | 用户Id | 125                              |
  | -    | disabled  | int    | 是否可用 | 0                                |
  | -    | sessionId | string | 登录标识 | c00e5c6713ba45f693c55fb37c45cc06 |
  | -    | inType    | string | ?    |                                  |

***

### 模型：LoginModel

- 描述

  > 登录请求模型


- 属性

  > | 所属   | 参数   | 数据类型 | 数据说明 | 数据示例 |
  > | ---- | ---- | ---- | ---- | ---- |
  > | -    |      |      |      |      |
  > | -    |      |      |      |      |
  > | -    |      |      |      |      |

***

### 模型：SmartRowModel

- 描述

  > 座位图行号模型


- 属性

  | 所属   | 参数          | 数据类型   | 数据说明 | 数据示例 |
  | ---- | ----------- | ------ | ---- | ---- |
  | -    | rowNumber   | Number | 行号   | 3    |
  | -    | colLocation | Number | y轴坐标 | 60   |

*****

### 模型：SmartSeatDataModel

- 描述

  > 智能座位数据模型


- 属性

  > | 所属   | 参数                | 数据类型                                     | 数据说明     | 数据示例 |
  > | ---- | ----------------- | ---------------------------------------- | -------- | ---- |
  > | -    | smartSeats        | Array<[SmartSeatModel](#SmartSeatModel)> | 智能座位列表   | -    |
  > | -    | seatRowData       | Array<[SmartRowModel](#SmartRowModel)>   | 座位图的行号数据 | -    |
  > | -    | seatCellSpace     | Number                                   | 座位之间的间隔  | -    |
  > | -    | seatCellWidth     | Number                                   | 座位宽度     | -    |
  > | -    | seatCellHeight    | Number                                   | 座位高度     | -    |
  > | -    | seatContentWidth  | Number                                   | 座位图宽度    | -    |
  > | -    | seatContentHeight | Number                                   | 座位图高度    | -    |

*****

### 模型：SmartSeatModel

- 描述

  > 智能座位模型


- 属性

  > | 所属   | 参数          | 数据类型                                    | 数据说明   | 数据示例 |
  > | ---- | ----------- | --------------------------------------- | ------ | ---- |
  > | -    | col         | number                                  | 抽象列坐标  | 1    |
  > | -    | row         | number                                  | 抽象行坐标  | 1    |
  > | -    | colNumber   | number                                  | 列号     | 1    |
  > | -    | rowNumber   | number                                  | 行号     | 1    |
  > | -    | colLocation | number                                  | 列坐标    | 38   |
  > | -    | rowLocation | number                                  | 行坐标    | 38   |
  > | -    | loveIndex   | [EnumSeatLoveIndex](#EnumSeatLoveIndex) | 情侣座标识  | 0    |
  > | -    | status      | [EnumSeatStatus](#EnumSeatStatus)       | 座位状态标识 | 1    |
  > | -    | seatModel   | number                                  | 原生座位模型 | -    |

*****

### 模型：PageModel

- 描述

  > 分页模型


- 属性

  > | 所属   | 参数    | 数据类型   | 数据说明 | 数据示例 |
  > | ---- | ----- | ------ | ---- | ---- |
  > | -    | index | number | 页号索引 | 1    |
  > | -    | size  | number | 每页尺寸 | 5    |

*******

### 模型：CinemaFilterModel

- 描述

  > 影院筛选条件


- 属性

  > | 所属   | 参数      | 数据类型   | 数据说明    | 数据示例                             |
  > | ---- | ------- | ------ | ------- | -------------------------------- |
  > | -    | filmId  | string | 金保证影片id | c28429848bc448b98164d6ad6c2db1d7 |
  > | -    | feature | string | 特色      | 3D                               |
  > | -    | region  | string | 地区名字    | 徐汇区                              |
  > | -    | sort    | number | 排序方式    | 1                                |
  > | -    | limit   | string | 查询数量    | 10                               |

******

## 模块：JNetwork(Enum)

### 枚举：EnumSeatLoveIndex

- 描述

  > 情侣座标识


- 属性

  | 类型     | 枚举   | 说明     |
  | ------ | ---- | ------ |
  | number | 0    | 非情侣座   |
  | *      | 1    | 情侣座（左） |
  | *      | 2    | 情侣座（右） |

*******

### 枚举：EnumSeatStatus

- 描述

  > 座位状态标识

- 属性

  > | 类型     | 枚举   | 说明      |
  > | ------ | ---- | ------- |
  > | number | 0    | 座位可以选定  |
  > | *      | 1    | 座位已经被选定 |