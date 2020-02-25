const db = require("../db");
const bookRecords = require('./data/Books');

(async () => {
  const client = await db;
  
  for (let i = 0; i < bookRecords.length; i++) {
    await client.query("INSERT INTO `books` SET ?", bookRecords[i]);
  }

  await client.end();
})();


