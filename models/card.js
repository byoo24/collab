const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('card', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuid()
        },
        name: {
            type: DataTypes.STRING,
            length: 60,
            allowNull: false
        },
        description: DataTypes.TEXT
    },
    {
        freezeTableName: true,
    });

    Card.associate = (models) => {
        Card.belongsTo(models.list);
    };

    return Card;
}