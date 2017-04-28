
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

var NetworkOtherManager = function () {
  function NetworkOtherManager() {
    (0, _classCallCheck3.default)(this, NetworkOtherManager);
  }

  (0, _createClass3.default)(NetworkOtherManager, null, [{
    key: 'otherSearch',
    value: function otherSearch(cityId, key, lastKey) {
      if (cityId) {} else {
        return _JNetwork2.default.POST(_JUrlList.otherUrl.jbzSearch, {
          queryStr: key,
          lastKey: lastKey
        });
      }
    }
  }, {
    key: 'hotQuery',
    value: function hotQuery() {
      return _JNetwork2.default.POST(_JUrlList.otherUrl.hotquery);
    }
  }, {
    key: 'otherBanners',
    value: function otherBanners(cityId) {
      if (cityId) {
        return _JNetwork2.default.POST(_JUrlList.otherUrl.jbzBanners, {
          cityId: cityId
        });
      } else {
        return _JNetwork2.default.POST(_JUrlList.otherUrl.jbzBanners, {});
      }
    }
  }]);
  return NetworkOtherManager;
}();

exports.default = NetworkOtherManager;