'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by cuppi on 2017/4/14.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _JNetwork = require('./JNetwork');

var _JNetwork2 = _interopRequireDefault(_JNetwork);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkConfig = function () {
  function NetworkConfig() {
    _classCallCheck(this, NetworkConfig);
  }

  _createClass(NetworkConfig, null, [{
    key: 'setConfig',
    value: function setConfig(obj) {
      _JNetwork2.default.baseUrl = obj.baseUrl;
    }
  }, {
    key: 'setDelegate',
    value: function setDelegate(delegate) {
      _JNetwork2.default.delegate = delegate;
    }
  }]);

  return NetworkConfig;
}();

exports.default = NetworkConfig;