
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JNetwork = require('./JNetwork.js');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../unify/JUrlList');

var _JDataUnify = require('../unify/JDataUnify');

var _JDataUnify2 = _interopRequireDefault(_JDataUnify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JNetworkOther = function () {
  function JNetworkOther() {
    (0, _classCallCheck3.default)(this, JNetworkOther);
  }

  (0, _createClass3.default)(JNetworkOther, null, [{
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
    value: function otherBanners(location, cityId) {
      return new _promise2.default(function (resolve, reject) {
        return _JNetwork2.default.POST(_JUrlList.otherUrl.jbzBanners, {
          location: location, cityId: cityId
        }).then(function (data) {
          resolve((0, _JDataUnify2.default)('otherUrl.jbzBanners', data));
        }, function (error) {
          reject(error);
        });
      });
    }
  }]);
  return JNetworkOther;
}();

exports.default = JNetworkOther;