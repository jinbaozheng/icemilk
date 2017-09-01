'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _JNetwork = require('./JNetwork');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

var _JUrlList = require('../unify/JUrlList');

var _JDataUnify = require('../unify/JDataUnify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JNetworkConfig = function () {
  function JNetworkConfig() {
    (0, _classCallCheck3.default)(this, JNetworkConfig);
  }

  (0, _createClass3.default)(JNetworkConfig, null, [{
    key: 'setConfig',
    value: function setConfig(config) {
      _JNetwork2.default.baseUrl = config.baseUrl;
      _JNetwork2.default.delegate = config.delegate;
      var urlMap = config.urlMap,
          dataMap = config.dataMap;

      if (!urlMap || !dataMap) {
        console.log('Didn\'t find out the urlMap value or dataMap, do you forget it?');
      } else {
        (0, _JUrlList.UseConfig)(urlMap);
        (0, _JDataUnify.UseConfig)(dataMap);
      }
    }
  }]);
  return JNetworkConfig;
}();

exports.default = JNetworkConfig;