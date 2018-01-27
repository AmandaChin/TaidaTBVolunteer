const notice = require('../util/ormSequelize').Notice

function insertNotice(NoticeID, UserID, Title, Content,
  Effectiveness, Visibility, ReleaseTime, DeleteTime) {
  notice.create({
    'NoticeID': NoticeID,
    'UserID': UserID,
    'Title': Title,
    'Content': Content,
    'Effectiveness': Effectiveness,
    'Visibility': Visibility,
    'ReleaseTime': ReleaseTime,
    'DeleteTime': DeleteTime
  }).then(function(result) {
    console.log('insertNotice ok')
    console.log(result.message)
  }).catch(function(err) {
    console.log('insertNotice error')
    console.log(err.message)
  })
}

function updateNotie(UserID, Duration, ServedDuration) {
  notice.findAndCountAll({
    where: {
      'UserID': UserID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this OrdinaryUser is not exist.')
      } else {
        notice.update({
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
  notice.findAndCountAll({
    where: {
      'ServiceID': ServiceID
    }
  }).then(function(result) {
    if (result.count === 0) {
      console.log('this Service is not exist.')
    } else {
      notice.destroy({
        where: {
          'ServiceID': ServiceID
        }
      })
    }
  })
}

exports.insertNotice = insertNotice
exports.updateNotie = updateNotie
exports.deleteServiceByServiceID = deleteServiceByServiceID
