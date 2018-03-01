// const ordinaryUser = require('../util/ormSequelize').OrdinaryUser
// const otherUser = require('../util/ormSequelize').OtherUser
// const allUser = require('../util/ormSequelize').AllUser
//
// function ordinaryUserLogin(Account, Password) {
//   allUser.findAndCountAll({
//     where: {
//       Account: Account,
//       Password: Password
//     }
//   })
// }

// function managerLogin(id, password, ErrorHandler) {
//   manager.findAndCountAll({
//     where: {
//       "id":id
//     }
//   }).then(
//     function (result) {
//       if(result.count == 0){
//         return ErrorHandler(new Error("id not exists"));
//       }
//       else {
//         if(result.rows[0].dataValues.password == password) {
//           return ErrorHandler(new Error("password mismatch"));
//         }
//       }
//     }
//   )
// }

exports.ordinaryUserLogin = ordinaryUserLogin
