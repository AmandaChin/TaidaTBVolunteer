const model = require('./db_manager')
const mysql = require('mysql')

// 连接数据库
const conn = mysql.createConnection(model.mysql)
conn.connect()

module.exports = conn
