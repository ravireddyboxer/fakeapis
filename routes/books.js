var express = require("express");
var router = express.Router();

var booksRepo = require("../repositories/booksRepository");
var { validator } = require("../validators/validator");
var {
  createBookValidationRules,
} = require("../validators/bookValidationRules");
const { matchedData, param } = require("express-validator");
const booksStaticList = require("../database/staticData.json");

/** Get all books */
router.get("/", function (request, response) {
  booksRepo
    .getBooksByIp(request.clientIp)
    .then((existingRecords) => {
      if (existingRecords.length === 0) {
        response.send(booksStaticList);
        booksStaticList.forEach((book) => {
          book.clientIpAddress = request.clientIp;
          book.createdAt = new Date();
        });
        booksRepo
          .insertManyBooks(booksStaticList)
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.log(error));
      } else {
        response.send(existingRecords);
      }
    })
    .catch((error) => console.log(error));
});

/** Get book by id */
router.get(
  "/:id",
  param("id").isInt(),
  validator,
  function (request, response) {
    let bookId = parseInt(request.params.id);

    booksRepo
      .getBookById(bookId, request.clientIp)
      .then((data) => {
        console.log(data);
        response.send(data);
      })
      .catch((error) => console.log(error));
  }
);

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
