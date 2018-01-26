
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Application', {
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
    Material1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Material2: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Material3: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'Application'
  })
}
