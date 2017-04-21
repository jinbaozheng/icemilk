
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkFilmViewManager = function () {
  function NetworkFilmViewManager() {
    (0, _classCallCheck3.default)(this, NetworkFilmViewManager);
  }

  (0, _createClass3.default)(NetworkFilmViewManager, null, [{
    key: 'filmviewFilmview',
    value: function filmviewFilmview(cinemaId) {
      var loginParas = _JNetwork2.default.loginParas();
      return _JNetwork2.default.POST(_JUrlList.filmViewUrl.filmview, {
        cinemaId: cinemaId
      }, loginParas.hasAccount ? {
        openId: loginParas.openId
      } : {});
    }
  }, {
    key: 'filmviewDate',
    value: function filmviewDate(cinemaId, filmId) {
      return _JNetwork2.default.POST(_JUrlList.filmViewUrl.foretelldates, { cinemaId: cinemaId, filmId: filmId });
    }
  }, {
    key: 'filmviewItems',
    value: function filmviewItems(cinemaId, filmId, date) {
      return _JNetwork2.default.POST(_JUrlList.filmViewUrl.filmviewitems, { cinemaId: cinemaId, filmId: filmId, date: date });
    }
  }]);
  return NetworkFilmViewManager;
}();

exports.default = NetworkFilmViewManager;