export default {
    Board: {
        user: (parent, args, context, info) => parent.getUser(),
        lists: (parent, args, context, info) => parent.getLists()
    },
    Query: {
        boards: (parent, args, { db }, info) => db.board.findAll({where: { userId: args.userId } }),
        board: (parent, args, { db }, info) => db.board.findByPk(args.id)
    },
    Mutation: {
        createBoard: (parent, args, context, info) => {
            const { db } = context;
            const { name, description, userId } = args;

            console.log("=============");
            console.log(args);
            console.log("=============");

            return db.board.create({
                name,
                description,
                userId
            });

        },
        updateBoard: (parent, args, context, info) => {
            const { db } = context;
            const { id, name, description } = args;

            const board = db.board.findByPk(id);


            db.board.update({
                name: name
            },
            {
                where: {
                    id: id
                }
            })
        }
    }
};