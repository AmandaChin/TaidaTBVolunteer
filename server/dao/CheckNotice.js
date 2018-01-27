const checkNotice = require('../util/ormSequelize').CheckNotice

function insertCheckNotice(NoticeID, UserID, Checked) {
  checkNotice.create({
    'NoticeID': NoticeID,
    'UserID': UserID,
    'Checked': Checked
  }).then(function(result) {
    console.log('insertCheckNotice ok')
    console.log(result.message)
  }).catch(function(err) {
    console.log('insertCheckNotice error')
    console.log(err.message)
  })
}

function updateCheckNotice(NoticeID, UserID, Checked) {
  checkNotice.findAndCountAll({
    where: {
      'NoticeID': NoticeID,
      'UserID': UserID
    }
  }).then(
    function(result) {
      if (result.count === 0) {
        console.log('this CheckNotice is not exist.')
      } else {
        checkNotice.update({
          'Checked': Checked
        }, {
          where: {
            'NoticeID': NoticeID,
            'UserID': UserID
          }
        }
        ).then(function(result) {
          console.log('updateCheckNotice ok')
          console.log(result.message)
        }).catch(function(err) {
          console.log('updateCheckNotice error')
          console.log(err.message)
        })
      }
    }
  )
}

exports.insertCheckNotice = insertCheckNotice
exports.updateCheckNotice = updateCheckNotice
