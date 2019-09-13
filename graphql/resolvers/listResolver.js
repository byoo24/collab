export default {
    List: {
        board: (parent, args, context, info) => parent.getBoard(),
        cards: (parent, args, context, info) => parent.getCards()
    },
    Query: {
        lists: (parent, args, { db }, info) => db.list.findAll(),
        list: (parent, args, { db }, info) => db.list.findByPk(id)
    },
    Mutation: {
        createList: (parent, args, context, info) => {
            const { db } = context;
            const { name, boardId } = args;

            console.log("===================");
            console.log(args);
            console.log("===================");

            return db.list.create({
                name,
                boardId
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