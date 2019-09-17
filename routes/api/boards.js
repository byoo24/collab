import { validateBoardInput } from '../../validation/dashboard';



export default (app, db) => {
    app.post('/api/v1/boards', (req, res) => {
        const { errors, isValid } = validateBoardInput(req.body);
        const { name, description, userId } = req.body;

        if (!isValid) {
            return res.status(400).json(errors);
        }

        db.board.create({
            name,
            description,
            userId
        }).then(board => {
            const { dataValues } = board;
            const boardId = dataValues.id;

            board.getUser().then(user => {
                const { personalBoardIds } = user;
                personalBoardIds.push(boardId);

                user.update({personalBoardIds});
                delete user.dataValues.password;

                return res.json({
                    board,
                    user
                });
            });
        });
    });
}




