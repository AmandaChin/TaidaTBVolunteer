const allUser = require('../util/ormSequelize').AllUser
const superAdmin = require('../util/ormSequelize').SuperAdmin
const a_Admin = require('../util/ormSequelize').A_Admin
const b_Admin = require('../util/ormSequelize').B_Admin
const ordinaryUser = require('../util/ormSequelize').OrdinaryUser

/**
 * 用户登陆
 * @param Account
 * @param Password
 * @param theRes
 * theRes:-1--用户不存在；0--超级管理员；1--A级管理员；2--B级管理员；3--普通用户
 */
function allUserLogin(Account, Password, theRes) {
  allUser.findAndCountAll({
    where: {
      Account: Account,
      Password: Password
    }
  }).then(function(result) {
    if (result.count() === 0) {
      theRes = -1
      return
    }
    const userId = result.row(0).dataValues.UserID
    var count = -1
    // 检查是否是超级管理员
    superAdmin.selectSuperAdminByUserID(userId, count)
    if (count === 1) {
      theRes = 0
      return
    }
    // 检查是否是A级管理员
    a_Admin.selectA_AdminByUserID(userId, count)
    if (count === 1) {
      theRes = 1
      return
    }
    // 检查是否是B级管理员
    b_Admin.selectB_AdminByUserID(userId, count)
    if (count === 1) {
      theRes = 2
      return
    }
    // 检查是否是普通用户
    ordinaryUser.selectOrdinaryUserByUserID(userId, count)
    if (count === 1) {
      theRes = 3
      return
    }
  })
}

exports.allUserLogin = allUserLogin
