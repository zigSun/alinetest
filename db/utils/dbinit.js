const db = require("../db");

(async () => {
  const connection = await db;

  await connection.query(
    "CREATE TABLE IF NOT EXISTS `books` ( \
      `id` Int UNSIGNED AUTO_INCREMENT NOT NULL,\
      `title` VarChar( 255 ) NOT NULL,\
      `description` Text NULL,\
      `author` VarChar( 255 ) NULL,\
      `image` VarChar( 255 ) NULL,\
      `date` Date NULL, \
      PRIMARY KEY (`id`) \
    )"
  );

  await connection.end();
})();
