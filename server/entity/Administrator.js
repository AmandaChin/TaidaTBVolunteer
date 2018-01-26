
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Administrator', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'OtherUser',
        key: 'UserID'
      }
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'Administrator'
  })
}
