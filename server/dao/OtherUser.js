const OtherUserManage = {
  // 除超级管理员之外的其它用户
  OtherUser: {
    addOtherUser: 'insert into OtherUser(UserID, UserName, Gender, Photo, ' +
    'Name, IDNumber, Email, Phone, Address) values (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    // deleteAllUserByAccount: 'delete from AllUser where Account = ?',
    // updateAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
    // searchAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
  }
}

module.exports = OtherUserManage
