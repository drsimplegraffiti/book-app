const express = require("express");
const {
  deleteBook,
  createBook,
  findSingleBook,
  findAllBooks,
  updateBook,
  bulkDeleteBooks,
  bulkUploadBooks,
  getStats,
} = require("../controllers/books.controller");
const { upload } = require("../utils/image.upload");
const { requireAuth } = require("../middleware/auth");
const router = express.Router();

router.delete("/:id", deleteBook);
router.post("/", requireAuth, upload.single("image"), createBook);
router.get("/:id", findSingleBook);
router.get("/", findAllBooks);
router.patch("/:id", updateBook);
router.delete("/all/bulk", bulkDeleteBooks);
router.post("/all/bulk", bulkUploadBooks);
router.get("/aggregate/stats", getStats);



module.exports = router;
