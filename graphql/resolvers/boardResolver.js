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
        createBoard: async (parent, args, context, info) => {
            const { db } = context;
            // personalBoardIds: is to keep track of the order of the boards.
            //      when creating a new board, user needs to be updated
            const { name, description, userId, personalBoardIds } = args;

            console.log("=================");
            console.log("args:", args);
            console.log("=================");

            return db.board.create({
                name,
                description,
                userId,
                listIds: []
            }).then((board) => {
                const { dataValues } = board;
                const boardId = dataValues.id;


                
                // personalBoardIds is ready only
                let boardIds = [...personalBoardIds];

                if (personalBoardIds[0] === "") {
                    boardIds = [boardId];
                } else {
                    boardIds.push(boardId);
                }
                

                console.log("=============");
                console.log("boardIds", boardIds);
                console.log("=============");


                
                db.user.update({
                    personalBoardIds: boardIds
                }, {
                    where: {id: userId}
                });

                return board;
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