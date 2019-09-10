export default {
    Query: {
        lists: (parent, args, { db }, info) => db.list.findAll(),
        list: (parent, args, { db }, info) => db.list.findByPk(id)
    },
    Mutation: {
        createList: (parent, args, context, info) => {
            const { db } = context;
            const { name, boardId } = args;

            return db.board.create({
                name: name,
                boardId: boardId
            });
        },
        updateList: (parent, args, context, info) => {
            const { db } = context;
            const { id, name } = args;

            db.board.update({
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