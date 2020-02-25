const BookModel = require('../models/Book');
class BookController {
  static async getBookList(ctx) {
    const {id, title, date, author, limit = 20, offset = 0, order = 'id:asc'} = ctx.query;   
    
    let result = await BookModel.list({ id, title, date, author, limit, offset, order});

    ctx.body = result;
  }

  static async addBook(ctx) {
    const {title, description, image, author, date} = ctx.request.body;
    const book = await BookModel.create({title, description, image, author, date});

    ctx.body = {
      book
    }
  }

  static async editBook(ctx) {
    const { id } = ctx.params;
    const {title, description, image, author, date} = ctx.request.body;

    const book = await BookModel.getById(id);
    
    if(!book) {
      ctx.throw(404, 'Book not found');
    }
    

    await BookModel.edit(id, {title, description, image, author, date})

    ctx.body = {};
  }
}

module.exports = BookController;