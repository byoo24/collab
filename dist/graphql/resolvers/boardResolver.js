"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _default = {
  Board: {
    user: function user(parent, args, context, info) {
      return parent.getUser();
    },
    lists: function lists(parent, args, context, info) {
      return parent.getLists();
    }
  },
  Query: {
    boards: function boards(parent, args, _ref, info) {
      var db = _ref.db;
      return db.board.findAll({
        where: {
          userId: args.userId
        }
      });
    },
    board: function board(parent, args, _ref2, info) {
      var db = _ref2.db;
      return db.board.findByPk(args.id);
    }
  },
  Mutation: {
    createBoard: function () {
      var _createBoard = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(parent, args, context, info) {
        var db, name, description, userId, personalBoardIds;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                db = context.db; // personalBoardIds: is to keep track of the order of the boards.
                //      when creating a new board, user needs to be updated

                name = args.name, description = args.description, userId = args.userId, personalBoardIds = args.personalBoardIds;
                console.log("=================");
                console.log("args:", args);
                console.log("=================");
                return _context.abrupt("return", db.board.create({
                  name: name,
                  description: description,
                  userId: userId,
                  listIds: []
                }).then(function (board) {
                  var dataValues = board.dataValues;
                  var boardId = dataValues.id; // personalBoardIds is ready only

                  var boardIds = (0, _toConsumableArray2["default"])(personalBoardIds);

                  if (personalBoardIds[0] === "") {
                    boardIds = [boardId];
                  } else {
                    boardIds.push(boardId);
                  }

                  console.log("=============");
                  console.log("boardIds", boardIds);
                  console.log("=============");
                  db.user.update({
                    personalBoardIds: boardIds
                  }, {
                    where: {
                      id: userId
                    }
                  });
                  return board;
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createBoard(_x, _x2, _x3, _x4) {
        return _createBoard.apply(this, arguments);
      }

      return createBoard;
    }(),
    updateBoard: function updateBoard(parent, args, context, info) {
      var db = context.db;
      var id = args.id,
          name = args.name,
          description = args.description;
      var board = db.board.findByPk(id);
      db.board.update({
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