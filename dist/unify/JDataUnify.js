'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseConfig = UseConfig;

exports.default = function (path, data) {
  if (!data) {
    return;
  }
  if (_inType === 'ICBC-APP') {
    return _icbcNetwork2.default[path](data);
  }

  if (_inType === 'SHANGHAI-APP') {
    return _shanghaiNetwork2.default[path](data);
  }
  return {};
};

var _shanghaiNetwork = require('../differentiation/shanghai.network.unify');

var _shanghaiNetwork2 = _interopRequireDefault(_shanghaiNetwork);

var _icbcNetwork = require('../differentiation/icbc.network.unify');

var _icbcNetwork2 = _interopRequireDefault(_icbcNetwork);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _inType = '';
var _VISIBLE_TYPE = ['ICBC-APP', 'SHANGHAI-APP'];

function UseConfig(inType) {
  if (_VISIBLE_TYPE.indexOf(inType) === -1) {
    console.log('ERROR: the inType value is non-existent, please look inType at config. \n the inType value is one of ( ' + _VISIBLE_TYPE.join(', ') + ' )');
    return;
  }
  _inType = inType;
}