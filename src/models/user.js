const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuid()
        },
        username: {
            type: DataTypes.STRING,
            length: 60,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            length: 60,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            length: 60,
            allowNull: false
        },
        personalBoardIds: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        }
    },
    {
        freezeTableName: true,
    });

    User.associate = (models) => {
        User.hasMany(models.board);
    };

    return User;
}