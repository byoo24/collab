"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _userType = _interopRequireDefault(require("./types/userType"));

var _boardType = _interopRequireDefault(require("./types/boardType"));

var _listType = _interopRequireDefault(require("./types/listType"));

var _cardType = _interopRequireDefault(require("./types/cardType"));

var types = [_userType["default"], _boardType["default"], _listType["default"], _cardType["default"]];

var _default = (0, _mergeGraphqlSchemas.mergeTypes)(types);

exports["default"] = _default;