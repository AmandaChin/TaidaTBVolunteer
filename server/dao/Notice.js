const NoticeManage = {
  // 用户检查通知
  Notice: {
    addNotice: 'insert into Notice(UserID, Title, Content, Effectiveness, ' +
    'Visibility, ReleaseTime, DeleteTime) values (?, ?, ?, ?, ?, ?, ?)'
    // deleteAllUserByAccount: 'delete from AllUser where Account = ?',
    // updateAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
    // searchAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
  }
}

module.exports = NoticeManage
