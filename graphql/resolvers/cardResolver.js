export default {
    Query: {
        cards: (parent, args, { db }, info) => db.card.findAll(),
        card: (parent, args, { db }, info) => db.card.findByPk(id)
    },
    Mutation: {
        createCard: (parent, args, context, info) => {
            const { db } = context;
            const { name, description, listId } = args;

            return db.card.create({
                name: name,
                description: description,
                listId: listId
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