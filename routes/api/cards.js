import { validateCardInput } from '../../validation/dashboard';



export default (app, db) => {
    app.post('/api/v1/cards', (req, res) => {
        const { errors, isValid } = validateCardInput(req.body);
        const { name, description, listId } = req.body;

        if (!isValid) {
            return res.status(400).json(errors);
        }

        db.card.create({
            name,
            description,
            listId
        }).then(card => {
            const { dataValues } = card;
            const cardId = dataValues.id;

            card.getList().then(list => {
                const { cardIds } = list;
                cardIds.push(cardId);

                list.update({ cardIds });

                return res.json({
                    card,
                    list
                });
            });
        });
    });
}




