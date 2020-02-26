const Router = require('koa-router');
const router = new Router();
const validate = require('./validators/validator');
/** controllers */
const BookController = require('./controllers/BookController');

/** validators */
const { createBodySchema, udpdateBodySchema, getListQuerySchema, idParamsSchema } = require('./validators/Book');

router.post('/books', validate({body : createBodySchema}), BookController.addBook);
router.get('/books', validate({query : getListQuerySchema}), BookController.getBookList);
router.put('/books/:id', validate({params: idParamsSchema}), validate({body : udpdateBodySchema}), BookController.editBook);

module.exports = router;
