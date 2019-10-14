const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('board', {
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
        description: {
            type: DataTypes.TEXT,
            defaultValue: ""
        },
        boardType: {
            type: DataTypes.ENUM('personal', 'team'),
            defaultValue: 'personal'
        },
        listIds: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        }
    },
    {
        freezeTableName: true,
    });

    Board.associate = (models) => {
        Board.belongsTo(models.user);
        Board.hasMany(models.list);
    };

    return Board;
}