"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dashboard = require("../../validation/dashboard");

var _default = function _default(app, db) {
  app.post('/api/v1/lists', function (req, res) {
    var _validateListInput = (0, _dashboard.validateListInput)(req.body),
        errors = _validateListInput.errors,
        isValid = _validateListInput.isValid;

    var _req$body = req.body,
        name = _req$body.name,
        boardId = _req$body.boardId;

    if (!isValid) {
      return res.status(400).json(errors);
    }

    db.list.create({
      name: name,
      boardId: boardId
    }).then(function (list) {
      var dataValues = list.dataValues;
      var listId = dataValues.id;
      list.getBoard().then(function (board) {
        var listIds = board.listIds;
        listIds.push(listId);
        board.update({
          listIds: listIds
        });
        return res.json({
          list: list,
          board: board
        });
      });
    });
  });
  app.put('/api/v1/lists/:listId', function (req, res) {
    var errors = {};

    if (!req.body.id) {
      errors.listId = "List ID is missing";
      return res.status(400).json(errors);
    }

    db.list.findByPk(req.body.id).then(function (list) {
      if (!list) {
        errors.list = "List wasn't found";
        return res.status(400).json(errors);
      }

      list.update(req.body);
      return res.json({
        list: list
      });
    });
  });
  app.put('/api/v1/lists',
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var promises, listsArr, _loop, i;

      return _regenerator["default"].wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              promises = [];
              listsArr = req.body;
              _loop =
              /*#__PURE__*/
              _regenerator["default"].mark(function _loop(i) {
                var updateList, listId;
                return _regenerator["default"].wrap(function _loop$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        updateList = listsArr[i];
                        listId = updateList.id;
                        _context.next = 4;
                        return db.list.findByPk(listId).then(function (list) {
                          list.update(updateList);
                          promises.push(list);
                        });

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _loop);
              });
              i = 0;

            case 4:
              if (!(i < listsArr.length)) {
                _context2.next = 9;
                break;
              }

              return _context2.delegateYield(_loop(i), "t0", 6);

            case 6:
              i++;
              _context2.next = 4;
              break;

            case 9:
              _context2.next = 11;
              return res.json(promises);

            case 11:
              return _context2.abrupt("return", _context2.sent);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports["default"] = _default;