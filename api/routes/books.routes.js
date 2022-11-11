const express = require("express");
const {
  deleteBook,
  createBook,
  findSingleBook,
  findAllBooks,
  updateBook,
  bulkDeleteBooks,
  bulkUploadBooks,
} = require("../controllers/books.controller");
const { upload } = require("../utils/image.upload");

const router = express.Router();

router.delete("/:id", deleteBook);
router.post("/", upload.single("photo"), createBook);
router.get("/:id", findSingleBook);
router.get("/", findAllBooks);
router.patch("/:id", updateBook);
router.delete("/all/bulk", bulkDeleteBooks);
router.post("/all/bulk", bulkUploadBooks);

module.exports = router;
