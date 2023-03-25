const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'holux',
  multipleStatements: true
})

connection.connect(function (err) {
  if (err) throw err
  console.log('Connected to Holux')
})

module.exports = connection
