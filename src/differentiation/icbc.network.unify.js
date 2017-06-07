/**
 * Created by cuppi on 2017/5/15.
 */

import ObjectTool from '../tool/JToolObject';
import DateTool from '../tool/JToolDate';

function _netCityToCity(city) {
  return {id: city.id, name: city.city_name, latin: city.city_en};
}

export default {
  'cityUrl.jbzCities': data => data.cities.map(_netCityToCity),
  'cityUrl.jbzCityByCoordinate': data => {
    let address = data.city.formatAddress;
    ObjectTool.deleteProperty(data.city, 'formatAddress');
    return {city: _netCityToCity(data.city), address};
  },
  'cityUrl.jbzCityById': data => _netCityToCity(data.city),
  'cityUrl.jbzDistricts': data => data.districts.map(district => {
    return {id: district.id, name: district.tails.Name};
  }),
  'cityUrl.jbzHotCities': data => data.hotCities.map(_netCityToCity),


  'filmUrl.jbzHotFilms': data => data.hotFilms,
  'filmUrl.jbzHotFilmsPage': data => data.hotFilms,
  'filmUrl.jbzHotFilmsSimple': data => data.hotFilms.map(film => {
    ObjectTool.deleteProperty(film, 'tails');
    return film;
  }),
  'filmUrl.jbzWaitFilms': data => data.filmsList,
  'filmUrl.jbzWaitFilmsPage': data => data.filmsList,
  'filmUrl.jbzFilmDetailByPartner': data => {
    ObjectTool.deleteProperty(data.film, 'tails');
    return {film: data.film, filmVideo: data.filmVideo, comments: data.hotComments};
  },
  'filmUrl.jbzFilmDetail': data => {
    ObjectTool.deleteProperty(data.film, 'tails');
    return {film: data.film, filmVideo: data.filmVideo, comments: data.hotComments};
  },
  'filmUrl.jbzFilmDate': data => data.filmDate.map(dateString => {
    return DateTool.timeIntervalFromDate(dateString);
  }),


  'cinemaUrl.jbzDetail': (data, mark) => {
    let optional = {};
    if (mark === 0) {
      optional = {phone: data.phone};
    }
    if (mark === 1) {
      optional = {phone: data.phone, isCollected: data.isCollected};
    }
    data.cinema.optional = optional;
    ObjectTool.deleteProperty(data.cinema, 'tails');
    return data.cinema;
  },
  'cinemaUrl.jbzList': data => data.cinemalist,
  'cinemaUrl.jbzScreeningFilmList': data => data.films.map(film => {
    ObjectTool.deleteProperty(film, 'tails');
    return film;
  }),
  'cinemaUrl.jbzScreeningDateList': data => data.filmShowDates.map(date => {
    return DateTool.timeIntervalFromDate(date);
  }),
  'cinemaUrl.jbzScreeningItems': data => data.filmShows,
  'cinemaUrl.jbzRealtimeSeat': data => data.realTimeSeats,
  'cinemaUrl.jbzRealtimeSmartSeat': data => {
    return data.realTimeSeats;
  },

  'tradeUrl.jbzLockSeat': data => data.orderId,
  'tradeUrl.jbzWebAtAppApplyTicket': data => data.order,

  'mineUrl.jbzMineCinema': data => data.collection,

  'otherUrl.jbzBanners': data => data.banner.map(banner => {
    ObjectTool.deleteProperty(banner, 'tails');
    return banner;
  })
};
