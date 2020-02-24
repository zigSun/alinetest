require('dotenv').config();
const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

const connection = mysql.createConnection({
  host : process.env.DB_HOST || 'localhost',
  user : process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  Promise : bluebird
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;