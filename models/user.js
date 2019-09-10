module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            limit: 60,
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