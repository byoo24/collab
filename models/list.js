const uuid = require('uuid/v4');


module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('list', {
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
    },
    {
        freezeTableName: true,
    });

    List.associate = (models) => {
        List.belongsTo(models.board);
        List.hasMany(models.card);
    };

    return List;
}