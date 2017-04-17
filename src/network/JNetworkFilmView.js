/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';
import NetworkManager from './JNetwork.js';
import {filmViewUrl} from '../constant/JUrlList';

class NetworkFilmViewManager {
  static filmviewFilmview(cinemaId) {
    let loginParas = NetworkManager.loginParas();
    return NetworkManager.post(filmViewUrl.filmview, {
      cinemaId: cinemaId
    }, loginParas.hasAccount ? {
        openId: loginParas.openId
      } : {});
  }

  static filmviewDate(paras) {
    return NetworkManager.post(filmViewUrl.foretelldates, paras);
  }

  static filmviewItems(paras) {
    return NetworkManager.post(filmViewUrl.filmviewitems, paras);
  }
}

export default NetworkFilmViewManager;
