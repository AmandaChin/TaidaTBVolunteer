const DemandManage = {
  // 用户检查通知
  Demand: {
    addDemand: 'insert into Demand(ServiceID, UserID, Remark)' +
    ' values (?, ?, ?)'
    // deleteAllUserByAccount: 'delete from AllUser where Account = ?',
    // updateAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
    // searchAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
  }
}

module.exports = DemandManage
