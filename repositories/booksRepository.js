const client = require("../database/createDatabaseClient");
const database = client.db("fakeapis-dev");

function getBookById(bookId, clientIp) {
  const booksCollection = database.collection("books");
  let query = { id: bookId, clientIpAddress: clientIp };
  let projection = { _id: 0, clientIpAddress: 0, createdAt: 0 };
  return booksCollection.findOne(query, { projection });
}

function getAllBooks() {
  const booksCollection = database.collection("books");
  return booksCollection.find().toArray();
}

function insertBook(book) {
  const booksCollection = database.collection("books");
  return booksCollection.insertOne(book);
}

function insertManyBooks(books) {
  const booksCollection = database.collection("books");
  return booksCollection.insertMany(books);
}

function getBooksByIp(ipAddress) {
  const booksCollection = database.collection("books");
  return booksCollection
    .find({ clientIpAddress: ipAddress })
    .project({ _id: 0, clientIpAddress: 0, createdAt: 0 })
    .toArray();
}

module.exports = {
  getBookById,
  getAllBooks,
  insertBook,
  getBooksByIp,
  insertManyBooks,
};
