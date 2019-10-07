"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n    type Board {\n        id: ID!\n        name: String!\n        description: String\n        boardType: String\n        user: User!\n        userId: ID!\n        lists: [List!]!\n        listIds: [String!]!\n        createdAt: String\n        updatedAt: String\n    }\n    input UserBoardIds {\n        id: String\n    }\n    type Query {\n        boards(userId: ID!): [Board!]!\n        board(id: ID!): Board\n    }\n    type Mutation {\n        createBoard(name: String!, description: String, userId: ID! personalBoardIds: [UserBoardIds]): Board\n        updateBoard(id: ID!, name: String, description: String): Board!\n    }\n";
exports["default"] = _default;