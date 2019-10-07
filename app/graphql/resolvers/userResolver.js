"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  User: {
    boards: function boards(parent, args, context, info) {
      return parent.getBoards();
    }
  },
  Query: {
    users: function users(parent, args, _ref, info) {
      var db = _ref.db;
      return db.user.findAll();
    },
    user: function user(parent, args, _ref2, info) {
      var db = _ref2.db;
      return db.user.findByPk(args.id);
    }
  }
};
exports["default"] = _default;