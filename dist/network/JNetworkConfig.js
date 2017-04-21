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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkConfig = function () {
  function NetworkConfig() {
    (0, _classCallCheck3.default)(this, NetworkConfig);
  }

  (0, _createClass3.default)(NetworkConfig, null, [{
    key: 'setConfig',
    value: function setConfig(config) {
      _JNetwork2.default.baseUrl = config.baseUrl;
      _JNetwork2.default.delegate = config.delegate;
    }
  }]);
  return NetworkConfig;
}();

exports.default = NetworkConfig;