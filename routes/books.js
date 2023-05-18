var express = require("express");
var router = express.Router();
var booksRepo = require("../repositories/booksRepository");
var { validator } = require("../validators/validator");
var {
  createBookValidationRules,
} = require("../validators/bookValidationRules");
const { matchedData } = require("express-validator");

/** Get all books */
router.get("/", function (request, response) {
  booksRepo
    .getAllBooks()
    .then((data) => {
      console.log(data);
      response.send(data);
    })
    .catch((error) => console.log(error));
});

/** Get book by id */
router.get("/:id", function (request, response) {
  let bookId = request.params.id;

  booksRepo
    .getBookById(bookId)
    .then((data) => {
      console.log(data);
      response.send(data);
    })
    .catch((error) => console.log(error));
});

/** Create a book  */
router.post("/", createBookValidationRules, validator, function (req, res) {
  let book = matchedData(req, { locations: ["body"] });
  book.clientIpAddress = req.clientIp;
  booksRepo
    .insertBook(book)
    .then((data) => {
      res.status(200).send({ success: true });
    })
    .catch((error) => {
      res.status(500).send({ success: false });
    });
});

module.exports = router;
