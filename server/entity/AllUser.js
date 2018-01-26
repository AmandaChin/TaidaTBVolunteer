
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AllUser', {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Account: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ChainHASH: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'AllUser'
  })
}
