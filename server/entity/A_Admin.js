
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('A_Admin', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'AllUser',
        key: 'UserID'
      }
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'A_Admin'
  })
}
