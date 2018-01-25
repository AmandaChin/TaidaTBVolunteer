const ApplicationManage = {
  // 申请
  Application: {
    addApplication: 'insert into Application(ServiceID, UserID, Material1' +
    'Material2, Material3) values (?, ?, ?, ?, ?)'
    // deleteAllUserByAccount: 'delete from AllUser where Account = ?',
    // updateAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
    // searchAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
  }
}

module.exports = ApplicationManage
