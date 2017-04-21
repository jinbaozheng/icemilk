
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkOtherManager = function () {
  function NetworkOtherManager() {
    (0, _classCallCheck3.default)(this, NetworkOtherManager);
  }

  (0, _createClass3.default)(NetworkOtherManager, null, [{
    key: 'search',
    value: function search(val, lastKey) {
      return _JNetwork2.default.POST(_JUrlList.otherUrl.search, (0, _extends3.default)({}, _JNetwork2.default.locationParas(), {
        queryStr: val,
        lastKey: lastKey
      }));
    }
  }, {
    key: 'searchSearch',
    value: function searchSearch(cityId, query, lastKey) {
      return _JNetwork2.default.POST(_JUrlList.otherUrl.search, {
        cityId: cityId,
        query: query,
        lastKey: lastKey
      });
    }
  }, {
    key: 'hotQuery',
    value: function hotQuery() {
      return _JNetwork2.default.POST(_JUrlList.otherUrl.hotquery);
    }
  }, {
    key: 'bannersNeedCItyIdNeedLocation',
    value: function bannersNeedCItyIdNeedLocation() {
      return _JNetwork2.default.POST(_JUrlList.otherUrl.banner, {
        cityId: _JNetwork2.default.loginParas().cityId
      });
    }
  }, {
    key: 'pageBanners',
    value: function pageBanners() {
      return _JNetwork2.default.POST(_JUrlList.otherUrl.pagebanners, {});
    }
  }]);
  return NetworkOtherManager;
}();

exports.default = NetworkOtherManager;