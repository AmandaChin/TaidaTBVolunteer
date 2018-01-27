const service = require('../util/ormSequelize').Service

function insertService(ServiceID, CreateTime, Duration, Content,
  DemandStartTime, DemandEndTime, RealStartTime, RealEndTime, Status,
  ChainHASH) {
  service.create({
    'ServiceID': ServiceID,
    'CreateTime': CreateTime,
    'Duration': Duration,
    'Content': Content,
    'DemandStartTime': DemandStartTime,
    'DemandEndTime': DemandEndTime,
    'RealStartTime': RealStartTime,
    'RealEndTime': RealEndTime,
    'Status': Status,
    'ChainHASH': ChainHASH
  }).then(function(result) {
    console.log('insertService ok')
    console.log(result.message)
  }).catch(function(err) {
    console.log('insertService error')
    console.log(err.message)
  })
}

function selectServiceByServiceID(ServiceID, ReturnList) {
  service.findAndCountAll({
    where: {
      'ServiceID': ServiceID
    }
  }).then(function(result) {
    var list = []
    for (var i = 0; i < result.count; i++) {
      list.push(result.rows[i])
    }
    return ReturnList(list)
  }).catch(function(err) {
    console.log('selectServiceByServiceID error')
    console.log(err.message)
  })
}

function updateService(UserID, Duration, ServedDuration) {
  service.findAndCountAll({
    where: {
      'UserID': UserID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this OrdinaryUser is not exist.')
      } else {
        service.update({
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

function deleteServiceByServiceID(ServiceID) {
  service.findAndCountAll({
    where: {
      'ServiceID': ServiceID
    }
  }).then(function(result) {
    if (result.count === 0) {
      console.log('this Service is not exist.')
    } else {
      service.destroy({
        where: {
          'ServiceID': ServiceID
        }
      })
    }
  })
}

exports.insertService = insertService
exports.selectServiceByServiceID = selectServiceByServiceID
exports.updateService = updateService
exports.deleteServiceByServiceID = deleteServiceByServiceID
