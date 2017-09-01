'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseConfig = UseConfig;

exports.default = function (path, data, mark, otherHandle) {
  if (!data) {
    return;
  }
  var unify = _dataMap;
  if (!unify) {
    return {};
  }
  if (!unify.hasOwnProperty(path)) {
    console.log('Can not find data unify for path:' + path + ', please contact the Author => cuppi');
    return {};
  }
  return unify[path](data, mark, otherHandle);
};

var _dataMap = {};
function UseConfig(dataMap) {
  _dataMap = dataMap;
}