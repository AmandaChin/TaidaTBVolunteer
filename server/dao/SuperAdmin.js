const superAdmin = require('../util/ormSequelize').SuperAdmin

function insertSuperAdmin(UserID) {
  superAdmin.create({
    'UserID': UserID
  }).then(function(result) {
    console.log('insertSuperAdmin ok')
    console.log(result.message)
  }).catch(function(err) {
    console.log('insertSuperAdmin error')
    console.log(err.message)
  })
}

function selectSuperAdminByUserID(UserID, count) {
  superAdmin.findAndCountAll({
    where: {
      'UserID': UserID
    }
  }).then(function(result) {
    count = result.count
    return count
  }).catch(function(err) {
    console.log('selectSuperAdminByUserID error')
    console.log(err.message)
  })
}

exports.insertSuperAdmin = insertSuperAdmin
exports.selectSuperAdminByUserID = selectSuperAdminByUserID
