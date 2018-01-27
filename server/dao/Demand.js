const demand = require('../util/ormSequelize').Demand

function insertDemand(ServiceID, UserID, Remark) {
  demand.create({
    'ServiceID': ServiceID,
    'UserID': UserID,
    'Remark': Remark
  }).then(function(result) {
    console.log('insertDemand ok')
    console.log(result.message)
  }).catch(function(err) {
    console.log('insertDemand error')
    console.log(err.message)
  })
}

function updateDemand(ServiceID, UserID, Remark) {
  demand.findAndCountAll({
    where: {
      'ServiceID': ServiceID,
      'UserID': UserID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this Demand is not exist.')
      } else {
        demand.update({
          'Remark': Remark
        }, {
          where: {
            'ServiceID': ServiceID,
            'UserID': UserID
          }
        }
        ).then(function(result) {
          console.log('updateDemand ok')
          console.log(result.message)
        }).catch(function(err) {
          console.log('updateDemand error')
          console.log(err.message)
        })
      }
    }
  )
}

exports.insertDemand = insertDemand
exports.updateDemand = updateDemand
