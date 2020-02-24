const Router = require('koa-router');
const router = new Router();

const BookController = require('./controllers/BookController');

router.get('/books', BookController.getBookList);

module.exports = router;
