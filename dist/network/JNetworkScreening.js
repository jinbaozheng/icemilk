
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

var NetworkScreeningManager = function () {
  function NetworkScreeningManager() {
    (0, _classCallCheck3.default)(this, NetworkScreeningManager);
  }

  (0, _createClass3.default)(NetworkScreeningManager, null, [{
    key: 'screeningFilmList',
    value: function screeningFilmList(cinemaId) {
      var loginParas = _JNetwork2.default.loginParas();
      return _JNetwork2.default.POST(_JUrlList.screeningUrl.jbzFilmList, {
        cinemaId: cinemaId
      }, loginParas.hasAccount ? {
        openId: loginParas.openId
      } : {});
    }
  }, {
    key: 'screeningDateList',
    value: function screeningDateList(cinemaId, filmId) {
      return _JNetwork2.default.POST(_JUrlList.screeningUrl.jbzDateList, { cinemaId: cinemaId, filmId: filmId });
    }
  }, {
    key: 'screeningItems',
    value: function screeningItems(cinemaId, filmId, date) {
      return _JNetwork2.default.POST(_JUrlList.screeningUrl.jbzItems, { cinemaId: cinemaId, filmId: filmId, date: date });
    }
  }]);
  return NetworkScreeningManager;
}();

exports.default = NetworkScreeningManager;