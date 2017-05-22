/**
 * Created by cuppi on 2017/5/15.
 */

/**
 * Created by cuppi on 2017/5/15.
 */

import ObjectTool from '../tool/JToolObject';
import DateTool from '../tool/JToolDate';
import SeatManager from '../util/JManagerSeat';

function _netCityToCity(city) {
  return {id: city.id, name: city.city_name, latin: city.city_en};
}

export default {
  'cityUrl.jbzCities': data => data.map(_netCityToCity),
  'cityUrl.jbzCityByCoordinate': data => {
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
    ObjectTool.deleteProperty(film, 'tails');
    return film;
  }),
  'filmUrl.jbzWaitFilms': data => data,
  'filmUrl.jbzWaitFilmsPage': data => data,
  'filmUrl.jbzFilmDetailByPartner': data => {
    ObjectTool.deleteProperty(data, 'tails');
    return data;
  },
  'filmUrl.jbzFilmDetail': data => {
    ObjectTool.deleteProperty(data, 'tails');
    return data;
  },
  'filmUrl.jbzFilmDate': data => data.map(dateString => {
    return DateTool.timeIntervalFromDate(dateString);
  }),


  'cinemaUrl.jbzDetail': data => {
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
  'cinemaUrl.jbzRealtimeSmartSeat': data => {
    return data;
  },

  'tradeUrl.jbzLockSeat': data => data,
  'tradeUrl.jbzWebAtAppApplyTicket': data => data,

  'otherUrl.jbzBanners': data => data.map(banner => {
    ObjectTool.deleteProperty(banner, 'tails');
    return banner;
  })
};
