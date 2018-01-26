
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CheckNotice', {
    NoticeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Notice',
        key: 'NoticeID'
      }
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'AllUser',
        key: 'UserID'
      }
    },
    Checked: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    createdAt: false,
    updatedAt: false,
    tableName: 'CheckNotice'
  })
}
