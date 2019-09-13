module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('card', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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