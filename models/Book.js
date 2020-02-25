const db = require('../db');

class BookModel {
  constructor({title, description, author, image, date}) {
    this.title = title;
    this.description = description;
    this.image = image; 
    this.date = date; 
    this.author = author;
  }

  static async create({title, description, image, author, date}) {
    const connection = await db;

    const createQuery = 'INSERT `books`(title, description, image, author, date) VALUES(?, ?, ?, ?, ?)';

    const [rows, fields] = await connection.execute(createQuery, [title, description, image, author, date]);

    return [rows, fields];
  }

  static async list(filter = {}) {
    const connection = await db;

    const buildFilter = (filter) => {
      const where = [];
      const order = [];
      let limit = null;
      let offset = null;
      const values = [];

      if(typeof filter.id !== 'undefined') {
        where.push("`id`=?");
        values.push(filter.id)
      }
      if(typeof filter.title !== 'undefined') {
        where.push("`title` LIKE ?");
        values.push(`%${filter.title}%`);
      }
      if(typeof filter.description !== 'undefined') {
        where.push("description LIKE ?");
        values.push(`%${filter.description}%`);
      }
      if(typeof filter.image !== 'undefined') {
        where.push("`image` LIKE ?");
        values.push(`%${filter.image}%`);
      }
      if(typeof filter.author !== 'undefined') {
        where.push("`author` LIKE ?");
        values.push(`%${filter.author}%`);
      }
      if(typeof filter.date !== 'undefined') {
        where.push("`date`=?");
        values.push(`${filter.date}`);
      }
      if(typeof filter.order !== 'undefined') {
        filter.order.split(',').map(orderItem => {
          let col = orderItem.split(':')[0];
          let dir = orderItem.split(':')[1];
          if(!dir) {
            order.push('?? ASC')
          } else {
            if(dir === 'asc' || dir === 'ASC') {
              order.push('?? ASC')
            } else if (dir === 'desc' || dir === 'DESC') {
              order.push('?? DESC')
            }
          }
          values.push(col)
        });
      }

      if(typeof filter.limit !== 'undefined') {
        limit = '?';
        values.push(filter.limit)
      }
      if(typeof filter.offset !== 'undefined') {
        offset = filter.offset
        values.push(`${filter.offset}`)
      }

      return {
        where : where.length ? where.join(' AND ') : '1',
        order : order.length ? order.join(',') : '',
        limit,
        offset,
        values
      }
    }

    const filterParts = buildFilter(filter);



    const listQuery =
      'SELECT * FROM `books` '+
      'WHERE ' + filterParts.where + 
      (filterParts.order ? ' ORDER BY ' + filterParts.order : '') +
      (filterParts.limit ? ' LIMIT '+ filterParts.limit : '') + 
      (filterParts.offset && filterParts.limit ? ' OFFSET ' + filterParts.offset : '');

    const [ list ] = await connection.query(listQuery, filterParts.values)
    


    const countListQuery =
      'SELECT COUNT(*) as `where_total` FROM `books` ' + 
      'WHERE ' + filterParts.where;

    const [ count ] = await connection.query(countListQuery, filterParts.values);



    return {
      list : list,
      total : count[0].where_total 
    };
  }

  static async getById(id) {
    const connection = await db;

    const getByIdQuery = 'SELECT * FROM `books` WHERE `id` = ?';

    const [book] = await connection.query(getByIdQuery, [id]);
    
    if(!book[0]) {
      return null
    }

    return book[0]
  }

  static async edit(id, updateData) {
    const connection = await db;

    let update = ""

    Object.keys(updateData).forEach(key => {
      update += `${key}="${updateData[key]}" `
    });

    const updateQuery = `
      UPDATE \`books\` 
      SET ${update}
      WHERE \`id\` = ${id} 
    `;

    await connection.query(updateQuery,[updateData, id]);
  }
}

module.exports = BookModel;