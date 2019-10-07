"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n    type User {\n        id: ID!\n        username: String!\n        email: String!\n        password: String!\n        boards: [Board!]!\n        personalBoardIds: [String!]!\n    }\n    type Query {\n        users: [User!]!\n        user(id: ID!): User\n    }\n";
exports["default"] = _default;