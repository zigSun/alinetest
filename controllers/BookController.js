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
    const updateData = {}

    if(typeof title !== 'undefined') {
      updateData.title = title;
    }
    if(typeof description !== 'undefined') {
      updateData.description = description;
    }
    if(typeof image !== 'undefined') {
      updateData.image = image;
    }
    if(typeof author !== 'undefined') {
      updateData.author = author;
    }
    if(typeof date !== 'undefined') {
      updateData.date = new Date(date);
    }

    await BookModel.edit(id, updateData)

    ctx.body = {};
  }
}

module.exports = BookController;