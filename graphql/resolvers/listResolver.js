module.exports = {
    List: {
        board: (parent, args, context, info) => parent.getBoard(),
        cards: (parent, args, context, info) => parent.getCards()
    },
    Query: {
        lists: (parent, args, { db }, info) => db.list.findAll(),
        list: (parent, args, { db }, info) => db.list.findByPk(id)
    },
    Mutation: {
        createList: async (parent, args, context, info) => {
            const { db } = context;
            // listIds: is to keep track of the order of the lists.
            //      when creating a new list, board needs to be updated
            const { name, boardId, listIds } = args;

            return db.list.create({
                name,
                boardId
            }).then((list) => {
                const { dataValues } = list;
                const listId = dataValues.id;

                // listIds is read only
                const newList = listIds[0] === "" ? [listId] : listIds.concat(listId);

                db.board.update({
                    listIds: newList
                }, {
                    where: {id: boardId}
                });

                return list;
            });
        },
        updateList: (parent, args, context, info) => {
            const { db } = context;
            const { id, name } = args;

            db.list.update({
                name: name
            },
            {
                where: {
                    id: id
                }
            });
        }
    }
};