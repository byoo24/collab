export default {
    Query: {
        boards: (parent, args, { db }, info) => db.board.findAll(),
        board: (parent, args, { db }, info) => db.board.findByPk(id)
    },
    Mutation: {
        createBoard: (parent, args, context, info) => {
            const { db } = context;
            const { name, userId } = args;

            console.log("=============");
            console.log(args);
            console.log("=============");

            return db.board.create({
                name: name,
                userId: userId
            });
        },
        updateBoard: (parent, args, context, info) => {
            const { db } = context;
            const { id, name } = args;

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