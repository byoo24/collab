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
        deleteList: async (parent, args, context, info) => {
            const { db } = context;
            const { id } = args;
            const errors = {};
            let list, board;

            const listRaw = await db.list.findByPk(id);
            if (listRaw) {
                list = listRaw.dataValues;
                const boardRaw = await db.board.findByPk(list.boardId);
                board = boardRaw.dataValues;
            } else {
                errors.list = "List was not found.";
            }

            if (board) {
                const listIndex = board.listIds.indexOf(list.id);
                if(listIndex > -1) {
                    board.listIds.splice(listIndex, 1);
                    await db.board.update(board, {where: {id: board.id}});
                }
                await db.list.destroy({where: {id: list.id}});
                return list;
            } else {
                errors.board = "Board was not found.";
            }

            return errors;
        }
    }
};