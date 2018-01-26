
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Demand', {
    ServiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Service',
        key: 'ServiceID'
      }
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      references: {
        model: 'OrdinaryUser',
        key: 'UserID'
      }
    },
    Remark: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'Demand'
  })
}
