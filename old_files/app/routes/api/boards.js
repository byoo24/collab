"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dashboard = require("../../validation/dashboard");

var _default = function _default(app, db) {
  app.post('/api/v1/boards', function (req, res) {
    var _validateBoardInput = (0, _dashboard.validateBoardInput)(req.body),
        errors = _validateBoardInput.errors,
        isValid = _validateBoardInput.isValid;

    var _req$body = req.body,
        name = _req$body.name,
        description = _req$body.description,
        userId = _req$body.userId;

    if (!isValid) {
      return res.status(400).json(errors);
    }

    db.board.create({
      name: name,
      description: description,
      userId: userId
    }).then(function (board) {
      var dataValues = board.dataValues;
      var boardId = dataValues.id;
      board.getUser().then(function (user) {
        var personalBoardIds = user.personalBoardIds;
        personalBoardIds.push(boardId);
        user.update({
          personalBoardIds: personalBoardIds
        });
        delete user.dataValues.password;
        return res.json({
          board: board,
          user: user
        });
      });
    });
  });
  app.put('/api/v1/boards/:boardId', function (req, res) {
    var errors = {};

    if (!req.body.id) {
      errors.boardId = "Board ID is missing";
      return res.state(400).json(errors);
    }

    db.board.findByPk(req.body.id).then(function (board) {
      if (!board) {
        errors.board = "Board wasn't found";
        return res.status(400).json(errors);
      }

      board.update(req.body);
      return res.json({
        board: board
      });
    });
  });
};

exports["default"] = _default;