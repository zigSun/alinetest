require("dotenv").config();
const mysql = require("mysql2/promise");
const bluebird = require("bluebird");

let connection;

module.exports = (async () => {
  if(connection)  {
    return connection;
  }
  let db = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    Promise: bluebird
  });
  
  connection = db;
  return connection;
})();
