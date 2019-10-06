"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidInputError = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var InvalidInputError =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(InvalidInputError, _Error);

  function InvalidInputError(message) {
    var _this;

    (0, _classCallCheck2["default"])(this, InvalidInputError);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(InvalidInputError).call(this));
    _this.message = message;
    _this.code = 400;
    return _this;
  }

  return InvalidInputError;
}((0, _wrapNativeSuper2["default"])(Error));

exports.InvalidInputError = InvalidInputError;