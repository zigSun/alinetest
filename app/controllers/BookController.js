const BookModel = require('../../db/models/Book');

class BookController {

  static async getBookList(ctx) {    
    let {list, total} = await BookModel.findAll(ctx.QUERY);

    ctx.body = {
      list,
      total,
      limit : ctx.QUERY.limit,
      offset: ctx.QUERY.offset
    };
  }

  static async addBook(ctx) {   
    const id = await BookModel.create(ctx.BODY)
    const book = await BookModel.getById(id);
    
    ctx.body = book;
  }

  static async editBook(ctx) {
    const { id } = ctx.PARAMS;

    const book = await BookModel.getById(id);
    
    if(!book) {
      ctx.throw(404, 'Book not found');
    }

    await BookModel.edit(id, ctx.BODY)

    ctx.body = {};
  }
}

module.exports = BookController;