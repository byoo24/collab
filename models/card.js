module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('card', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            limit: 60,
            allowNull: false
        },
        description: DataTypes.STRING
    },
    {
        freezeTableName: true,
    });

    Card.associate = (models) => {
        Card.belongsTo(models.list);
    };

    return Card;
}