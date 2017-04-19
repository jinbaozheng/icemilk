'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by cuppi on 2017/4/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSDK = function () {
  function JSDK() {
    _classCallCheck(this, JSDK);
  }

  _createClass(JSDK, null, [{
    key: 'version',
    value: function version() {
      return _package2.default.version;
    }
  }, {
    key: 'readme',
    value: function readme() {
      return 'https://git.oschina.net/cuppi/jbzwebsdk/raw/master/JBZWebSDK%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3-JNetwork.pdf';
    }
  }, {
    key: 'readmemd',
    value: function readmemd() {
      return 'https://git.oschina.net/cuppi/jbzwebsdk/blob/master/JBZWebSDK%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3-JNetwork.md';
    }
  }]);

  return JSDK;
}();

exports.default = JSDK;