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
      _JNetwork2.default.inType = config.inType;
      _JNetwork2.default.delegate = config.delegate;
      if (config.inType) {
        (0, _JUrlList.UseConfig)(config.inType);
        (0, _JDataUnify.UseConfig)(config.inType);
      } else {
        console.log('Didn\'t find out the inType value, do you forget the inType at config ?');
      }
    }
  }]);
  return JNetworkConfig;
}();

exports.default = JNetworkConfig;