/**
 * Created by cuppi on 2017/3/6.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkFilmViewManager = function () {
  function NetworkFilmViewManager() {
    _classCallCheck(this, NetworkFilmViewManager);
  }

  _createClass(NetworkFilmViewManager, null, [{
    key: 'filmviewFilmview',
    value: function filmviewFilmview(cinemaId) {
      var loginParas = _JNetwork2.default.loginParas();
      return _JNetwork2.default.post(_JUrlList.filmViewUrl.filmview, {
        cinemaId: cinemaId
      }, loginParas.hasAccount ? {
        openId: loginParas.openId
      } : {});
    }
  }, {
    key: 'filmviewDate',
    value: function filmviewDate(paras) {
      return _JNetwork2.default.post(_JUrlList.filmViewUrl.foretelldates, paras);
    }
  }, {
    key: 'filmviewItems',
    value: function filmviewItems(paras) {
      return _JNetwork2.default.post(_JUrlList.filmViewUrl.filmviewitems, paras);
    }
  }]);

  return NetworkFilmViewManager;
}();

exports.default = NetworkFilmViewManager;