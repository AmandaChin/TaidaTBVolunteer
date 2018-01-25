const OrdinaryUserManage = {
  // 普通用户
  OrdinaryUser: {
    addOrdinaryUser: 'insert into OrdinaryUser(UserID, Duration ' +
    'ServedDuration) values (?, ?, ?)'
    // deleteAllUserByAccount: 'delete from AllUser where Account = ?',
    // updateAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
    // searchAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
  }
}

module.exports = OrdinaryUserManage
