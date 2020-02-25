const Router = require('koa-router');
const router = new Router();

const BookController = require('./controllers/BookController');

router.post('/books', BookController.addBook);
router.get('/books', BookController.getBookList);
router.put('/books/:id', BookController.editBook);

module.exports = router;
