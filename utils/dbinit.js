const db = require("../db");

(async () => {
  const client = await db;

  await client.query(
    "CREATE TABLE IF NOT EXISTS `books` ( \
        `id` Int( 10 ) UNSIGNED AUTO_INCREMENT NOT NULL,\
        `title` VarChar( 255 ) NOT NULL,\
        `description` Text NULL,\
        `author` VarChar( 255 ) NULL,\
        `image` VarChar( 255 ) NULL,\
        `date` Date NULL, \
        PRIMARY KEY ( `id` ) ) \
    "
  );

  await client.end();
})();
