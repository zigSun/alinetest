
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const bookRecords = [];

for (let i = 0; i < 1e2; i++) {
  bookRecords.push({
    title: `book_title_${i}`,
    description: `random description for book_title_${i}`,
    image: `/books/images/book_${i}.png`,
    date: randomDate(new Date(1000, 0, 1), new Date()).toISOString().slice(0, 19).replace('T', ' '),
    author: `author_${i}`
  });
}

module.exports = bookRecords;