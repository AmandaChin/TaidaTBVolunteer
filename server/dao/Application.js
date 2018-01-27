const application = require('../util/ormSequelize').Application

function insertApplication(ServiceID, UserID, Material1,
  Material2, Material3) {
  application.create({
    'ServiceID': ServiceID,
    'UserID': UserID,
    'Material1': Material1,
    'Material2': Material2,
    'Material3': Material3
  }).then(function(result) {
    console.log('insertApplication ok')
    console.log(result.message)
  }).catch(function(err) {
    console.log('insertApplication error')
    console.log(err.message)
  })
}

function updateApplication(ServiceID, UserID, Material1,
  Material2, Material3) {
  application.findAndCountAll({
    where: {
      'ServiceID': ServiceID,
      'UserID': UserID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this Application is not exist.')
      } else {
        application.update({
          'Material1': Material1,
          'Material2': Material2,
          'Material3': Material3
        }, {
          where: {
            'ServiceID': ServiceID,
            'UserID': UserID
          }
        }
        ).then(function(result) {
          console.log('updateApplication ok')
          console.log(result.message)
        }).catch(function(err) {
          console.log('updateApplication error')
          console.log(err.message)
        })
      }
    }
  )
}

exports.insertApplication = insertApplication
exports.updateApplication = updateApplication
