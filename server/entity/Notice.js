
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notice', {
    NoticeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      references: {
        model: 'AllUser',
        key: 'UserID'
      }
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Effectiveness: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ReleaseTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    DeleteTime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'Notice'
  })
}
