const a_admin = require('../util/ormSequelize').A_Admin

function insertA_Admin(UserID) {
  a_admin.create({
    'UserID': UserID
  }).then(function(result) {
    console.log('inserted A_Admin ok')
    console.log(result.message)
  }).catch(function(err) {
    console.log('inserted A_Admin error')
    console.log(err.message)
  })
}

function selectA_AdminByUserID(UserID, count) {
  a_admin.findAndCountAll({
    where: {
      'UserID': UserID
    }
  }).then(function(result) {
    count = result.count
    return count
  }).catch(function(err) {
    console.log('selectA_AdminByUserID error')
    console.log(err.message)
  })
}

exports.insertA_Admin = insertA_Admin
exports.selectA_AdminByUserID = selectA_AdminByUserID
