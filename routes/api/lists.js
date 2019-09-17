import { validateListInput } from '../../validation/dashboard';



export default (app, db) => {
    app.post('/api/v1/lists', (req, res) => {
        const { errors, isValid } = validateListInput(req.body);
        const { name, boardId } = req.body;

        if (!isValid) {
            return res.status(400).json(errors);
        }

        db.list.create({
            name,
            boardId
        }).then(list => {
            const { dataValues } = list;
            const listId = dataValues.id;

            list.getBoard().then(board => {
                const { listIds } = board;
                listIds.push(listId);

                board.update({ listIds });

                return res.json({
                    list,
                    board
                });
            });
        });
    });
}




