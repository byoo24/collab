"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n    type Card {\n        id: ID!\n        name: String!\n        description: String\n        list: List!\n        listId: ID!\n        createdAt: String\n        updatedAt: String\n    }\n    type Query {\n        cards: [Card!]!\n        card(id: ID!): Card\n    }\n    type Mutation {\n        createCard(name: String!, description: String, listId: ID!): Card!\n        updateCard(id: ID!, name: String, description: String): Card!\n    }\n";
exports["default"] = _default;