
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrdinaryUser', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'OtherUser',
        key: 'UserID'
      }
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: false
    },
    ServedDuration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'OrdinaryUser'
  })
}
