module.exports = {
    Card: {
        list: (parent, args, context, info) => parent.getList()
    },
    Query: {
        cards: (parent, args, { db }, info) => db.card.findAll(),
        card: (parent, args, { db }, info) => db.card.findByPk(id)
    },
    Mutation: {
        createCard: (parent, args, context, info) => {
            const { db } = context;
            // cardIds: is to keep track of the order of the cards.
            //      when creating a new card, list needs to be updated
            const { name, description, listId, cardIds } = args;

            console.log("====================");
            console.log(args);
            console.log("====================");


            return db.card.create({
                name,
                description,
                listId
            }).then((card) => {
                const { dataValues } = card;
                const cardId = dataValues.id;

                // cardIds is read only
                const newCards = cardIds[0] == "" ? [cardId] : cardIds.concat(cardId);

                db.list.update({
                    cardIds: newCards
                }, {
                    where: {id: listId}
                });

                return card;
            });
        },
        updateCard: (parent, args, context, info) => {
            const { db } = context;
            const { id, name } = args;

            db.card.update({
                name: name,
                description: description
            },
                {
                    where: {
                        id: id
                    }
                });
        }
    }
};