import {JPromise} from "./structure";
import {PageModel} from "./model"
import {CinemaFilterParas} from './paras'

export declare class JNetworkRoot {
  otherParas: Array<string|object>;
  otherHeaders: Array<string|object>;
  static useParas(...paras: Array<string|object>): JNetworkRoot
  static useHeaders(...headers: Array<string|object>): JNetworkRoot
  static instance(): any
  useParas(...paras: Array<string|object>): JNetworkRoot
  useHeaders(...headers: Array<string|object>): JNetworkRoot
  prefixPromise(url, paras?: object, headers?: object, options?: object): Promise<any>
}

export declare class JNetwork{
  otherParas: Array<string|object>;
  otherHeaders: Array<string|object>;
  static useParas(...paras: Array<string|object>)
  static useHeaders(...headers: Array<string|object>)
  useParas(...paras: Array<string|object>): JNetwork
  useHeaders(...headers: Array<string|object>): JNetwork
  static instance(): any
  static freedomPOST(baseUrl, url, parameters, headers, otherObject): JPromise<any>
  static freedomGET(baseUrl: string, url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
  static POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
  static GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
  fetchRequest(method: string, baseUrl: string, url: string, parameters: object, headers: object, otherObject: any): JPromise<any>
  freedomPOST(baseUrl, url, parameters, headers, otherObject): JPromise<any>
  freedomGET(baseUrl: string, url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
  POST(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>
  GET(url: string, parameters?: object, headers?: object, otherObject?: object): JPromise<any>

}

export declare class JNetworkTrade extends JNetworkRoot{
  tradeLockSeat(type, paras): Promise<any>
  tradeCancelLockSeat(orderId): Promise<any>
  tradeApplyOrder(type, paras): Promise<any>
  tradePrePayOrder(orderId, payType, prizeIds, redIds): Promise<any>
  static tradeLockSeat(type, paras): Promise<any>
  static tradeCancelLockSeat(orderId): Promise<any>
  static tradeApplyOrder(type, paras): Promise<any>
  static tradePrePayOrder(orderId, payType, prizeIds, redIds): Promise<any>

}

export declare class JNetworkAccount extends JNetworkRoot{
  accountLogin(mobile, password): Promise<any>
  accountLogout(sessionId): Promise<any>
  accountVerifyCode(mobile, type): Promise<any>
  accountRegister(mobile, verifyCode, password): Promise<any>
  accountUpdatepass(mobile, verfyCode, password): Promise<any>
  static accountLogin(mobile, password): Promise<any>
  static accountLogout(sessionId): Promise<any>
  static accountVerifyCode(mobile, type): Promise<any>
  static accountRegister(mobile, verifyCode, password): Promise<any>
  static accountUpdatepass(mobile, verfyCode, password): Promise<any>
}

export declare class JNetworkCity extends JNetworkRoot{
  cityList(): Promise<any>
  cityByCoordinate(coordinate): Promise<any>
  cityNeedCoordinate(): Promise<any>
  cityById(cityId): Promise<any>
  cityDistrictList(cityId): Promise<any>
  cityHotList(): Promise<any>
  static cityList(): Promise<any>
  static cityByCoordinate(coordinate): Promise<any>
  static cityNeedCoordinate(): Promise<any>
  static cityById(cityId): Promise<any>
  static cityDistrictList(cityId): Promise<any>
  static cityHotList(): Promise<any>
}

export declare class JNetworkFilm extends JNetworkRoot{
  filmHotfilms(page: PageModel): Promise<any>
  filmHotfilmsSimple(): Promise<any>
  filmWaitfilms(page): Promise<any>
  filmDetail(filmId, platform?): Promise<any>
  filmDateList(filmId): Promise<any>
  static filmHotfilms(page: PageModel): Promise<any>
  static filmHotfilmsSimple(): Promise<any>
  static filmWaitfilms(page): Promise<any>
  static filmDetail(filmId, platform?): Promise<any>
  static filmDateList(filmId): Promise<any>
}

export declare class JNetworkCinema extends JNetworkRoot{
  cinemaDetail(cinemaId): Promise<any>
  cinemaList(location: any, cinemaFilter: CinemaFilterParas);
  cinemaList(cinemaFilter: CinemaFilterParas);
  cinemaList(location: any, cinemaFilter?: any): Promise<any>
  cinemaScreeningFilmList(cinemaId): Promise<any>
  cinemaScreeningDateList(cinemaId, filmId): Promise<any>
  cinemaScreeningItems(cinemaId, filmId, date): Promise<any>
  cinemaSeats(type, paras): Promise<any>
  cinemaSmartSeats(type, paras): Promise<any>
  cinemaFavoriteCinema(cinemaId, cinemaName): Promise<any>
  cinemaCancelFavoriteCinema(cinemaId): Promise<any>
  static cinemaDetail(cinemaId): Promise<any>
  static cinemaList(cinemaFilter: CinemaFilterParas);
  static cinemaList(location: any, cinemaFilter: CinemaFilterParas);
  static cinemaList(a: any, b?: any): Promise<any>
  static cinemaScreeningFilmList(cinemaId): Promise<any>
  static cinemaScreeningDateList(cinemaId, filmId): Promise<any>
  static cinemaScreeningItems(cinemaId, filmId, date): Promise<any>
  static cinemaSeats(type, paras): Promise<any>
  static cinemaSmartSeats(type, paras): Promise<any>
  static cinemaFavoriteCinema(cinemaId, cinemaName): Promise<any>
  static cinemaCancelFavoriteCinema(cinemaId): Promise<any>
}

export declare class JNetworkConfig extends JNetworkRoot{
  static setConfig(config: any)
}

export declare class JNetworkOther extends JNetworkRoot{
  search(cityId, searchKey, nextPageFirstKey): Promise<any>
  hotSearchKeyword(): Promise<any>
  otherBanners(location, cityId): Promise<any>
  banners(position, cityId): Promise<any>
  static search(cityId, searchKey, nextPageFirstKey): Promise<any>
  static hotSearchKeyword(): Promise<any>
  static otherBanners(location, cityId): Promise<any>
  static banners(position, cityId): Promise<any>
}

export declare class JNetworkMine extends JNetworkRoot{
  mineOrder(): Promise<any>
  mineFavoriteCinema(): Promise<any>
  mineFavorite(): Promise<any>
  static mineOrder(): Promise<any>
  static mineFavoriteCinema(): Promise<any>
  static mineFavorite(): Promise<any>
}
