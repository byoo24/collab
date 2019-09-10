module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('board', {
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
    },
    {
        freezeTableName: true,
    });

    Board.associate = (models) => {
        Board.belongsTo(models.user);
    };

    Board.associate = (models) => {
        Board.hasMany(models.list);
    };

    

    return Board;
}