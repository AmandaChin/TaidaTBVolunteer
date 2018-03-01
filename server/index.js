// 后端服务器入口文件

// const userApi = require('./api/user')
// const bodyParser = require('body-parser')
// const express = require('express')
// const app = express()
//
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
//
// // 后端api路由
// app.use('/api/user', userApi)
//
// // 监听端口
// app.listen(3000)
// console.log('success listen at port:3000......')

const seq = require('./util/ormSequelize')
seq.sequelize.sync({ force: false }).then(function() {
  console.log('Server success to start')
}).catch(function(err) {
  console.log('Server failed to start due to error: %s', err)
})
