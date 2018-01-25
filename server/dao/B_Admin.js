const B_AdminManage = {
  // B级管理员
  B_Admin: {
    addB_Admin: 'insert into B_Admin(UserID) values (?)'
    // deleteAllUserByAccount: 'delete from AllUser where Account = ?',
    // updateAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
    // searchAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
  }
}

module.exports = B_AdminManage
