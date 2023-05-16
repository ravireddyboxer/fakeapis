var express = require("express");
var router = express.Router();

/**
 *   get book by id
 */
router.get("/:id", function (request, response) {
  let bookId = request.params.id;
  let book = {
    id: bookId,
    title: "Atomic Habits",
    genre: "Life Style",
    language: "English",
    pageCount: 345,
    publisher: "Oreily",
    rating: 8.5,
  };

  response.send(book);
});

module.exports = router;
