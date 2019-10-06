"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Card: {
    list: function list(parent, args, context, info) {
      return parent.getList();
    }
  },
  Query: {
    cards: function cards(parent, args, _ref, info) {
      var db = _ref.db;
      return db.card.findAll();
    },
    card: function card(parent, args, _ref2, info) {
      var db = _ref2.db;
      return db.card.findByPk(id);
    }
  },
  Mutation: {
    createCard: function createCard(parent, args, context, info) {
      var db = context.db; // cardIds: is to keep track of the order of the cards.
      //      when creating a new card, list needs to be updated

      var name = args.name,
          description = args.description,
          listId = args.listId,
          cardIds = args.cardIds;
      console.log("====================");
      console.log(args);
      console.log("====================");
      return db.card.create({
        name: name,
        description: description,
        listId: listId
      }).then(function (card) {
        var dataValues = card.dataValues;
        var cardId = dataValues.id; // cardIds is read only

        var newCards = cardIds[0] == "" ? [cardId] : cardIds.concat(cardId);
        db.list.update({
          cardIds: newCards
        }, {
          where: {
            id: listId
          }
        });
        return card;
      });
    },
    updateCard: function updateCard(parent, args, context, info) {
      var db = context.db;
      var id = args.id,
          name = args.name;
      db.card.update({
        name: name,
        description: description
      }, {
        where: {
          id: id
        }
      });
    }
  }
};
exports["default"] = _default;