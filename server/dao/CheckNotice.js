const CheckNoticeManage = {
  // 用户检查通知
  CheckNotice: {
    addCheckNotice: 'insert into CheckNotice(NoticeID, UserID, Checked)' +
    ' values (?, ?, ?)'
    // deleteAllUserByAccount: 'delete from AllUser where Account = ?',
    // updateAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
    // searchAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
  }
}

module.exports = CheckNoticeManage
