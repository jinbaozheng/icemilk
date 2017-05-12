
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JNetwork = require('./JNetwork');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../constant/JUrlList');

var _JToolObject = require('../tool/JToolObject');

var _JToolObject2 = _interopRequireDefault(_JToolObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkCityManager = function () {
  function NetworkCityManager() {
    (0, _classCallCheck3.default)(this, NetworkCityManager);
  }

  (0, _createClass3.default)(NetworkCityManager, null, [{
    key: '_netCityToCity',
    value: function _netCityToCity(city) {
      return { id: city.id, name: city.city_name, latin: city.city_en };
    }
  }, {
    key: 'cityList',
    value: function cityList() {
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.cityUrl.jbzCities).then(function (data) {
          resolve(data.cities.map(NetworkCityManager._netCityToCity));
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cityByCoordinate',
    value: function cityByCoordinate(coordinate) {
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.cityUrl.jbzCityByCoordinate, coordinate).then(function (data) {
          var address = data.city.formatAddress;
          _JToolObject2.default.deleteProperty(data.city, 'formatAddress');
          resolve({ city: NetworkCityManager._netCityToCity(data.city), address: address });
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cityNeedCoordinate',
    value: function cityNeedCoordinate() {
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.cityUrl.jbzCityByCoordinate, (0, _extends3.default)({}, _JNetwork2.default.locationParas())).then(function (data) {
          var address = data.city.formatAddress;
          _JToolObject2.default.deleteProperty(data.city, 'formatAddress');
          resolve({ city: NetworkCityManager._netCityToCity(data.city), address: address });
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cityById',
    value: function cityById(cityId) {
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.cityUrl.jbzCityById, { cityId: cityId }).then(function (data) {
          resolve(NetworkCityManager._netCityToCity(data.city));
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cityDistrictList',
    value: function cityDistrictList(cityId) {
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.cityUrl.jbzDistricts, { cityId: cityId }).then(function (data) {
          resolve(data.districts.map(function (district) {
            return { id: district.id, name: district.tails.Name };
          }));
        }, function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'cityHotList',
    value: function cityHotList() {
      return new _promise2.default(function (resolve, reject) {
        _JNetwork2.default.POST(_JUrlList.cityUrl.jbzHotCities).then(function (data) {
          resolve(data.hotCities.map(NetworkCityManager._netCityToCity));
        }, function (error) {
          reject(error);
        });
      });
    }
  }]);
  return NetworkCityManager;
}();

exports.default = NetworkCityManager;