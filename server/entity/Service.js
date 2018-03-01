
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Service', {
    ServiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CreateTime: {
      type: DataTypes.TIME,
      allowNull: true,
      primaryKey: false
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DemandStartTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    DemandEndTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    RealStartTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    RealEndTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ChainHASH: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'Service'
  })
}
