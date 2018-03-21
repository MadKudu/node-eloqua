"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EloquaError = function (_Error) {
  (0, _inherits3.default)(EloquaError, _Error);

  function EloquaError(err) {
    (0, _classCallCheck3.default)(this, EloquaError);
    var _err$response = err.response,
        response = _err$response === undefined ? {} : _err$response;
    var status = response.status,
        statusText = response.statusText,
        data = response.data;

    var message = statusText || err.message;

    var _this = (0, _possibleConstructorReturn3.default)(this, (EloquaError.__proto__ || (0, _getPrototypeOf2.default)(EloquaError)).call(this, message));

    _this.status = status;
    _this.data = data;
    return _this;
  }

  return EloquaError;
}(Error);

module.exports = {
  EloquaError: EloquaError
};