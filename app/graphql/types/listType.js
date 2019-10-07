"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n    type List {\n        id: ID!\n        name: String!\n        board: Board!\n        boardId: ID!\n        cards: [Card!]!\n        cardIds: [String!]!\n        createdAt: String\n        updatedAt: String\n    }\n    type Query {\n        lists: [List!]!\n        list(id: ID!): List\n    }\n    type Mutation {\n        createList(name: String!, boardId: ID!, listIds: [String]): List!\n        updateList(id: ID!, name: String): List!\n    }\n";
exports["default"] = _default;