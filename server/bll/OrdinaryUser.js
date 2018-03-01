const application = require('../util/ormSequelize').Application
const service = require('../util/ormSequelize').Service

/**
 * 根据志愿者的ID查询他所申请的服务记录
 * @param UserId：志愿者ID
 * @param returnList：服务记录，也就是数据库Service表中的n条记录
 */
function volunteerApplicate(UserId, returnList) {
  application.findAndCountAll({
    where: {
      UserId: UserId
    }
  }).then(function(result) {
    var list = []
    for (var i = 0; i < result.count; i++) {
      var serviceId = result.row(i).dataValues.ServiceID
      service.findAndCountAll({
        where: {
          ServiceID: serviceId
        }
      }).then(function(result1) {
        list.push(result1.row(0))
      })
    }
    return returnList(list)
  })
}

exports.volunteerApplicate = volunteerApplicate
