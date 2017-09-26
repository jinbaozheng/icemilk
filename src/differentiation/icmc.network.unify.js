/**
 * Created by cuppi on 2017/5/15.
 */

import ObjectTool from '../tool/JToolObject';
import DateTool from '../tool/JToolDate';

function _netCityToCity(city) {
  return {id: ObjectTool.safeGet(city, 'id'), name: ObjectTool.safeGet(city, 'city_name'), latin: ObjectTool.safeGet(city, 'city_en')};
}

export default {
  'cityUrl.jbzCities': data => data.map(_netCityToCity),
  'cityUrl.jbzCityByCoordinate': data => {
    console.log(data);
    let address = data.formatAddress;
    ObjectTool.deleteProperty(data, 'formatAddress');
    return {city: _netCityToCity(data), address};
  },
  'cityUrl.jbzCityById': data => _netCityToCity(data),
  'cityUrl.jbzDistricts': data => data.map(district => {
    return {id: district.id, name: district.tails.Name};
  }),
  'cityUrl.jbzHotCities': data => data.map(_netCityToCity),
  'filmUrl.jbzHotFilms': data => data,
  'filmUrl.jbzHotFilmsPage': data => data,
  'filmUrl.jbzHotFilmsSimple': data => data.map(film => {
    // ObjectTool.deleteProperty(film, 'tails');
    return film;
  }),
  'filmUrl.jbzWaitFilms': data => data,
  'filmUrl.jbzWaitFilmsPage': data => data,
  'filmUrl.jbzFilmDetailByPartner': data => {
    return data;
    // ObjectTool.deleteProperty(data.film, 'tails');
    // return {film: data.film, filmVideo: data.filmVideo, comments: data.hotComments};
  },
  'filmUrl.jbzFilmDetail': data => {
    console.log(data);
    return {film: data.film, filmVideo: data.filmVideo, comments: data.hotComments};
  },
  'filmUrl.jbzFilmDate': data => data.map(dateString => {
    return DateTool.timeIntervalFromDate(dateString);
  }),
  'cinemaUrl.jbzDetail': (data, mark) => {
    let optional = {};
    if (mark === 0) {
      optional = {phone: data.cinemaPhone};
    }
    if (mark === 1) {
      optional = {phone: data.cinemaPhone, isCollected: ObjectTool.safeGet(data, 'isCollected')};
    }
    data = {...data, optional}
    ObjectTool.deleteProperty(data, 'cinemaPhone');
    ObjectTool.deleteProperty(data, 'tails');
    return data;
  },
  'cinemaUrl.jbzList': data => data,
  'cinemaUrl.jbzScreeningFilmList': data => data.map(film => {
    ObjectTool.deleteProperty(film, 'tails');
    return film;
  }),
  'cinemaUrl.jbzScreeningDateList': data => data.map(date => {
    return DateTool.timeIntervalFromDate(date);
  }),
  'cinemaUrl.jbzScreeningItems': data => data,
  'cinemaUrl.jbzRealtimeSeat': data => data,
  'cinemaUrl.jbzRealtimeSmartSeat': data => data,
  'tradeUrl.jbzLockSeat': data => data.orderId,
  'tradeUrl.jbzWebAtAppApplyTicket': data => data.order,
  'mineUrl.jbzMineCinema': data => data.collection,
  'otherUrl.jbzBanners': data => data.map(banner => {
    ObjectTool.deleteProperty(banner, 'tails');
    return banner;
  }),
  'otherUrl.jbzHotSearchKeyword': data => data
};
