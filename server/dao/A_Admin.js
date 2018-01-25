const A_AdminManage = {
  // A级管理员
  A_Admin: {
    addA_Admin: 'insert into A_Admin(UserID) values (?)'
    // deleteAllUserByAccount: 'delete from AllUser where Account = ?',
    // updateAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
    // searchAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
  }
}

module.exports = A_AdminManage
