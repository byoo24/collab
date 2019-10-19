module.exports = {
    Card: {
        list: (parent, args, context, info) => parent.getList()
    },
    Query: {
        cards: (parent, args, { db }, info) => db.card.findAll(),
        card: (parent, args, { db }, info) => db.card.findByPk(id)
    },
    Mutation: {
        deleteCard: async (parent, args, context, info) => {
            const { db } = context;
            const { id } = args;
            const errors = {};
            let card, list;

            const cardRaw = await db.card.findByPk(id);
            if(cardRaw) {
                card = cardRaw.dataValues;
                const listRaw = await db.list.findByPk(card.listId);
                list = listRaw.dataValues;
            } else {
                errors.card = "Card was not found.";
            }

            if (list) {
                const cardIndex = list.cardIds.indexOf(card.id);
                if(cardIndex > -1) {
                    list.cardIds.splice(cardIndex, 1);
                    await db.list.update(list, { where: { id: list.id}});
                }
                await db.card.destroy({where: {id: card.id}});
                return card;
            } else {
                errors.board = "Board was not found";
            }

            return errors;
        }
    }
};