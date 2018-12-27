# icemilk changelog

## 1.0.7
 * 增加Network的body中的data的支持
 * 更改JNetworkRoot 为 JNetwork 及 JNetworkGroup父类
 * INetworkConfig可选

## 1.0.6
 * 优化链式调用
 
## 1.0.5
 * 修复Network嵌套掉用问题
 
## 1.0.4
 * 更改Network单例方法定义
 
## 1.0.3
 * 增加Network单例方法
 
## 1.0.2
 * 更改库CommonJS格式指向

## 1.0.1
 * 更新ts依赖项
 * 更新babel依赖项

## 1.0.0
*2018-11-15*
 
 * 版本开始
 * 分离通用工具类
 * 修改JNetwork实现方式，去除大部分类方法
 * 修改JNetworkConfig类为JNetwork配置类
 * 去除JNetwork.wrongInType方法
 * 去除 errorCode == 10022 的判断
 * 修改JPromise由类变为接口