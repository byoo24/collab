const { validateListInput } = require('../../validation/dashboard');



module.exports = (app, db) => {
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


    app.put('/api/v1/lists/:listId', (req, res) => {
        const errors = {};

        if (!req.body.id) {
            errors.listId = "List ID is missing";
            return res.status(400).json(errors);
        }

        db.list.findByPk(req.body.id)
            .then(list => {
                if (!list) {
                    errors.list = "List wasn't found";
                    return res.status(400).json(errors);
                }
                list.update(req.body);

                return res.json({
                    list
                });
            })
    });

    app.put('/api/v1/lists', async (req, res) => {

        const promises = [];
        const listsArr = req.body;

        for (let i = 0; i < listsArr.length; i++) {
            const updateList = listsArr[i];
            const listId = updateList.id;

            await db.list.findByPk(listId)
                .then(list => {
                    list.update(updateList);
                    promises.push(list);
                })
        }

        return await res.json(promises);
    });
}




