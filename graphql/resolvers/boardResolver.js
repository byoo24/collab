module.exports = {
    Board: {
        user: (parent, args, context, info) => parent.getUser(),
        lists: (parent, args, context, info) => parent.getLists()
    },
    Query: {
        boards: (parent, args, { db }, info) => db.board.findAll({where: { userId: args.userId } }),
        board: (parent, args, { db }, info) => db.board.findByPk(args.id)
    },
    Mutation: {
        deleteBoard: async(parent, args, context, info) => {
            const { db } = context;
            const { id } = args;
            const errors = {};
            let board, user;

            const boardRaw = await db.board.findByPk(id);
            if (boardRaw) {
                board = boardRaw.dataValues;
                const userRaw = await db.user.findByPk(board.userId);
                user = userRaw.dataValues;
            } else {
                errors.board = "Board was not found";
            }

            if (user) {
                const boardIndex = user.personalBoardIds.indexOf(board.id);
                if(boardIndex > -1) {
                    user.personalBoardIds.splice(boardIndex, 1);
                    await db.user.update(user, {where: {id: user.id}});
                }
                await db.board.destroy({where: {id: board.id}});
                return board;
            } else {
                errors.user = "User was not found";
            }

            return errors;
        }
    }
};