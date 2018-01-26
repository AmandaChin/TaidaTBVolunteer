
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('B_Admin', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Administrator',
        key: 'UserID'
      }
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'B_Admin'
  })
}
