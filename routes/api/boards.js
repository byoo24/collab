const { validateBoardInput } = require('../../validation/dashboard');



module.exports = (app, db) => {
    app.post('/api/v1/boards', (req, res) => {
        const { errors, isValid } = validateBoardInput(req.body);
        const { name, description, userId, bgColor } = req.body;

        if (!isValid) {
            return res.status(400).json(errors);
        }

        db.board.create({
            name,
            description,
            userId,
            bgColor
        }).then(board => {
            const { dataValues } = board;
            const boardId = dataValues.id;

            board.getUser().then(user => {
                const { personalBoardIds } = user;
                personalBoardIds.push(boardId);

                user.update({ personalBoardIds });
                delete user.dataValues.password;

                return res.json({
                    board,
                    user
                });
            });
        });
    });


    app.put('/api/v1/boards/:boardId', (req, res) => {
        const errors = {};

        if (!req.body.id) {
            errors.boardId = "Board ID is missing";
            return res.state(400).json(errors);
        }

        db.board.findByPk(req.body.id)
            .then(board => {
                if (!board) {
                    errors.board = "Board wasn't found";
                    return res.status(400).json(errors);
                }

                board.update(req.body);

                return res.json({
                    board
                });
            });
    });
}




