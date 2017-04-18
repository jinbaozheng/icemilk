'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by cuppi on 2016/12/14.
 */

var UrlTool = function () {
  function UrlTool() {
    _classCallCheck(this, UrlTool);
  }

  _createClass(UrlTool, null, [{
    key: 'urlFromPortion',


    /**
     * 自合 URL
     * @param baseUrl
     * @param subUrl
     * @param parameters
     * @returns {*}
     */
    value: function urlFromPortion(baseUrl, subUrl, parameters) {
      if (!parameters) {
        parameters = {};
      }
      var paras = [];
      for (var key in parameters) {
        if (!parameters.hasOwnProperty(key)) {
          continue;
        }
        if (parameters[key] !== undefined) {
          paras.push(key + '=' + parameters[key]);
        }
      }

      var iUrl = baseUrl + subUrl;
      if (paras.length > 0) {
        iUrl = iUrl + '?' + paras.join('&');
      }
      return iUrl;
    }
  }]);

  return UrlTool;
}();

exports.default = UrlTool;