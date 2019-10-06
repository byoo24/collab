"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _userResolver = _interopRequireDefault(require("./resolvers/userResolver"));

var _boardResolver = _interopRequireDefault(require("./resolvers/boardResolver"));

var _listResolver = _interopRequireDefault(require("./resolvers/listResolver"));

var _cardResolver = _interopRequireDefault(require("./resolvers/cardResolver"));

var resolvers = [_userResolver["default"], _boardResolver["default"], _listResolver["default"], _cardResolver["default"]];

var _default = (0, _mergeGraphqlSchemas.mergeResolvers)(resolvers);

exports["default"] = _default;