const AllUserManage = {
  // 所有的用户
  AllUser: {
    addAllUser: 'insert into AllUser(Account, Password, ChainHASH) values (?, ?, ?)'
    // deleteAllUserByAccount: 'delete from AllUser where Account = ?',
    // updateAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
    // searchAllUser: 'insert into user(id, name, age) values (0, ?, ?)',
  }
}

module.exports = AllUserManage
