const administrator = require('../util/ormSequelize').Administrator

function insertAdministrator(UserID) {
  administrator.create({
    'UserID': UserID
  }).then(function(result) {
    console.log('inserted Administrator ok')
    console.log(result.message)
  }).catch(function(err) {
    console.log('inserted Administrator error')
    console.log(err.message)
  })
}

function selectAdministratorByUserID(UserID, count) {
  administrator.findAndCountAll({
    where: {
      'UserID': UserID
    }
  }).then(function(result) {
    count = result.count
    return count
  }).catch(function(err) {
    console.log('selectAdministrator error')
    console.log(err.message)
  })
}

exports.insertAdministrator = insertAdministrator
exports.selectAdministratorByUserID = selectAdministratorByUserID
