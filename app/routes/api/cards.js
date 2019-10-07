"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dashboard = require("../../validation/dashboard");

var _default = function _default(app, db) {
  app.post('/api/v1/cards', function (req, res) {
    var _validateCardInput = (0, _dashboard.validateCardInput)(req.body),
        errors = _validateCardInput.errors,
        isValid = _validateCardInput.isValid;

    var _req$body = req.body,
        name = _req$body.name,
        description = _req$body.description,
        listId = _req$body.listId;

    if (!isValid) {
      return res.status(400).json(errors);
    }

    db.card.create({
      name: name,
      description: description,
      listId: listId
    }).then(function (card) {
      var dataValues = card.dataValues;
      var cardId = dataValues.id;
      card.getList().then(function (list) {
        var cardIds = list.cardIds;
        cardIds.push(cardId);
        list.update({
          cardIds: cardIds
        });
        return res.json({
          card: card,
          list: list
        });
      });
    });
  });
  app.put('/api/v1/cards/:cardId', function (req, res) {
    var errors = {};

    if (!req.body.id) {
      errors.cardId = "Card ID is missing";
      return res.status(400).json(errors);
    }

    db.card.findByPk(req.body.id).then(function (card) {
      if (!card) {
        errors.card = "Card wasn't found";
        return res.status(400).json(errors);
      }

      card.update(req.body);
      return res.json({
        card: card
      });
    });
  });
};

exports["default"] = _default;