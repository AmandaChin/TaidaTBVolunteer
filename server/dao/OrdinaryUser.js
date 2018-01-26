const ordinaryUser = require('../util/ormSequelize').OrdinaryUser

function insertOrdinaryUser(UserID, Duration, ServedDuration) {
  ordinaryUser.create({
    'UserID': UserID,
    'Duration': Duration,
    'ServedDuration': ServedDuration
  }).then(function(result) {
    console.log('insertOrdinaryUser ok')
    console.log(result.message)
  }).catch(function(err) {
    console.log('insertOrdinaryUser error')
    console.log(err.message)
  })
}

function selectOrdinaryUserByUserID(UserID, count) {
  ordinaryUser.findAndCountAll({
    where: {
      'UserID': UserID
    }
  }).then(function(result) {
    count = result.count
    return count
  }).catch(function(err) {
    console.log('selectOrdinaryUserByUserID error')
    console.log(err.message)
  })
}

function updateOrdinaryUser(UserID, Duration, ServedDuration) {
  ordinaryUser.findAndCountAll({
    where: {
      'UserID': UserID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this OrdinaryUser is not exist.')
      } else {
        ordinaryUser.update({
          'Duration': Duration,
          'ServedDuration': ServedDuration
        }, {
          where: {
            'UserID': UserID
          }
        }
        ).then(function(result) {
          console.log('updateOrdinaryUser ok')
          console.log(result.message)
        }).catch(function(err) {
          console.log('updateOrdinaryUser error')
          console.log(err.message)
        })
      }
    }
  )
}

exports.insertOrdinaryUser = insertOrdinaryUser
exports.selectOrdinaryUserByUserID = selectOrdinaryUserByUserID
exports.updateOrdinaryUser = updateOrdinaryUser
