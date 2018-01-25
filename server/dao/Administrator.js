const AdministratorManage = {
  // 管理员
  Administrator: {
    addAdministrator: 'insert into Administrator(UserID) values (?)'
    // deleteAllUserByAccount: 'delete from AllUser where Account = ?',
    // updateAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
    // searchAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
  }
}

module.exports = AdministratorManage
