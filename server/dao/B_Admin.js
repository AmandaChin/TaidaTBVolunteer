const b_admin = require('../util/ormSequelize').B_Admin

function insertB_Admin(UserID) {
  b_admin.create({
    'UserID': UserID
  }).then(function(result) {
    console.log('inserted B_Admin ok')
    console.log(result.message)
  }).catch(function(err) {
    console.log('inserted B_Admin error')
    console.log(err.message)
  })
}

function selectB_AdminByUserID(UserID, count) {
  b_admin.findAndCountAll({
    where: {
      'UserID': UserID
    }
  }).then(function(result) {
    count = result.count
    return count
  }).catch(function(err) {
    console.log('selectB_AdminByUserID error')
    console.log(err.message)
  })
}

exports.insertB_Admin = insertB_Admin
exports.selectB_AdminByUserID = selectB_AdminByUserID
