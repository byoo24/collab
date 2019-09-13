module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('list', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            length: 60,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
    });

    List.associate = (models) => {
        List.belongsTo(models.board);
    };

    List.associate = (models) => {
        List.hasMany(models.card);
    };

    return List;
}