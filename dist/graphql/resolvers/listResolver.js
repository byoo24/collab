"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _default = {
  List: {
    board: function board(parent, args, context, info) {
      return parent.getBoard();
    },
    cards: function cards(parent, args, context, info) {
      return parent.getCards();
    }
  },
  Query: {
    lists: function lists(parent, args, _ref, info) {
      var db = _ref.db;
      return db.list.findAll();
    },
    list: function list(parent, args, _ref2, info) {
      var db = _ref2.db;
      return db.list.findByPk(id);
    }
  },
  Mutation: {
    createList: function () {
      var _createList = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(parent, args, context, info) {
        var db, name, boardId, listIds;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                db = context.db; // listIds: is to keep track of the order of the lists.
                //      when creating a new list, board needs to be updated

                name = args.name, boardId = args.boardId, listIds = args.listIds;
                return _context.abrupt("return", db.list.create({
                  name: name,
                  boardId: boardId
                }).then(function (list) {
                  var dataValues = list.dataValues;
                  var listId = dataValues.id; // listIds is read only

                  var newList = listIds[0] === "" ? [listId] : listIds.concat(listId);
                  db.board.update({
                    listIds: newList
                  }, {
                    where: {
                      id: boardId
                    }
                  });
                  return list;
                }));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createList(_x, _x2, _x3, _x4) {
        return _createList.apply(this, arguments);
      }

      return createList;
    }(),
    updateList: function updateList(parent, args, context, info) {
      var db = context.db;
      var id = args.id,
          name = args.name;
      db.list.update({
        name: name
      }, {
        where: {
          id: id
        }
      });
    }
  }
};
exports["default"] = _default;