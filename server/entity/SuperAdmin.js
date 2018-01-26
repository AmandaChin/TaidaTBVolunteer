
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SuperAdmin', {
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
    tableName: 'SuperAdmin'
  })
}
