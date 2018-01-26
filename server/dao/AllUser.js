const allUser = require('../util/ormSequelize').AllUser

function insertAllUser(UserID, Account, Password, ChainHASH) {
  allUser.create({
    'UserID': UserID,
    'Account': Account,
    'Password': Password,
    'ChainHASH': ChainHASH
  }).then(function(result) {
    console.log('insertAllUser ok')
    console.log(result.message)
  }).catch(function(err) {
    console.log('insertAllUser error')
    console.log(err.message)
  })
}

function selectAllUserByUserID(UserID, ReturnList) {
  allUser.findAndCountAll({
    where: {
      'UserID': UserID
    }
  }).then(function(result) {
    var list = []
    for (var i = 0; i < result.count; i++) {
      list.push(result.rows[i])
    }
    return ReturnList(list)
  }).catch(function(err) {
    console.log('selectAdministrator error')
    console.log(err.message)
  })
}

function updateAllUserByUserID(UserID, Account, Password, ChainHASH) {
  allUser.findAndCountAll({
    where: {
      'UserID': UserID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this alluser is not exist.')
      } else {
        allUser.update({
          'Account': Account,
          'Password': Password,
          'ChainHASH': ChainHASH
        }, {
          where: {
            'UserID': UserID
          }
        }
        ).then(function(result) {
          console.log('updateAllUserByUserID ok')
          console.log(result.message)
        }).catch(function(err) {
          console.log('updateAllUserByUserID error')
          console.log(err.message)
        })
      }
    }
  )
}

function deleteAllUserByAccount(Account) {
  allUser.findAndCountAll({
    where: {
      'Account': Account
    }
  }).then(function(result) {
    if (result.count === 0) {
      console.log('this alluser is not exist.')
    } else {
      allUser.destroy({
        where: {
          'Account': Account
        }
      })
    }
  })
}

exports.insertAllUser = insertAllUser
exports.selectAllUserByUserID = selectAllUserByUserID
exports.updateAllUserByUserID = updateAllUserByUserID
exports.deleteAllUserByAccount = deleteAllUserByAccount
