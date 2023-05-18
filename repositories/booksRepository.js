const client = require("../database/createDatabaseClient");
const database = client.db("fakeapis-dev");

function getBookById(id) {
  const booksCollection = database.collection("books");
  return booksCollection.findOne({ id: 1 });
}

function getAllBooks() {
  const booksCollection = database.collection("books");
  return booksCollection.find().toArray();
}

function insertBook(book) {
  const booksCollection = database.collection("books");
  return booksCollection.insertOne(book);
}
module.exports = { getBookById, getAllBooks, insertBook };
