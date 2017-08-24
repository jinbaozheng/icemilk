'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ownKeys = require('babel-runtime/core-js/reflect/own-keys');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

exports.UseConfig = UseConfig;

exports.default = function (path, data, mark, otherHandle) {
  if (!data) {
    return;
  }
  var unify = _TYPE_OBJECT[_inType];
  if (!unify) {
    return {};
  }
  if (!unify.hasOwnProperty(path)) {
    console.log('Can not find data unify for path:' + path + ', please contact the Author => cuppi');
    return {};
  }
  return unify[path](data, mark, otherHandle);
};

var _icbcNetwork = require('../differentiation/icbc.network.unify');

var _icbcNetwork2 = _interopRequireDefault(_icbcNetwork);

var _shanghaiNetwork = require('../differentiation/shanghai.network.unify');

var _shanghaiNetwork2 = _interopRequireDefault(_shanghaiNetwork);

var _icmcNetwork = require('../differentiation/icmc.network.unify');

var _icmcNetwork2 = _interopRequireDefault(_icmcNetwork);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _inType = '';
var _TYPE_OBJECT = { 'ICBC-APP': _icbcNetwork2.default, 'SHANGHAI-APP': _shanghaiNetwork2.default, 'ICMC-APP': _icmcNetwork2.default };
var _VISIBLE_TYPE = (0, _ownKeys2.default)(_TYPE_OBJECT);
function UseConfig(inType) {
  if (_VISIBLE_TYPE.indexOf(inType) === -1) {
    console.log('ERROR: the inType value is non-existent, please look inType at config. \n the inType value is one of ( ' + _VISIBLE_TYPE.join(', ') + ' )');
    return;
  }
  _inType = inType;
}