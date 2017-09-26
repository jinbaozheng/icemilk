
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
    key: 'search',
    value: function search(cityId, searchKey, nextPageFirstKey) {
      if (cityId) {
        return _JNetwork2.default.POST(_JUrlList.otherUrl.jbzSearch, {
          cityId: cityId,
          queryStr: searchKey,
          lastKey: nextPageFirstKey
        });
      } else {
        return _JNetwork2.default.POST(_JUrlList.otherUrl.jbzSearch, {
          queryStr: searchKey,
          lastKey: nextPageFirstKey
        });
      }
    }
  }, {
    key: 'hotSearchKeyword',
    value: function hotSearchKeyword() {
      return _JNetwork2.default.POST(_JUrlList.otherUrl.jbzHotSearchKeyword);
    }
  }, {
    key: 'otherBanners',
    value: function otherBanners(position, cityId) {
      return new _promise2.default(function (resolve, reject) {
        return _JNetwork2.default.POST(_JUrlList.otherUrl.jbzBanners, {
          position: position, cityId: cityId
        }).then(function (data) {
          resolve((0, _JDataUnify2.default)('otherUrl.jbzBanners', data));
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'banners',
    value: function banners(position, cityId) {
      return JNetworkOther.otherBanners(position, cityId);
    }
  }]);
  return JNetworkOther;
}();

exports.default = JNetworkOther;