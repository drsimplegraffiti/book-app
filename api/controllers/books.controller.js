const { default: mongoose } = require("mongoose");
const Book = require("../models/books.model.js");
const { cloudinary } = require("../utils/image.upload");
const bookData = require("../data/books.json");

exports.createBook = async (req, res) => {
  try {
    const {
      title,
      numberOfPages,
      ISBN,
      author,
      summary,
      price,
      genre,
      bookUrl,
    } = req.body;
    if (
      !title ||
      !numberOfPages ||
      !ISBN ||
      !price ||
      !author ||
      !summary ||
      !genre ||
      !bookUrl
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // check if book already exists
    const bookExists = await Book.findOne({ ISBN });
    if (bookExists) {
      return res.status(400).json({ message: "Book already exists" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);

    const book = new Book({
      title,
      numberOfPages,
      ISBN,
      author,
      summary,
      price,
      genre,
      bookUrl,
      bookImage: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.findSingleBook = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found with id " + req.params.id });
    }
    res.status(200).json({ message: "Book found successfully", book });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

exports.findAllBooks = async (req, res) => {
  try {
    const { search } = req.query;
    if (search) {
      const books = await Book.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { summary: { $regex: search, $options: "i" } },
          { genre: { $regex: search, $options: "i" } },
          { ISBN: { $regex: search, $options: "i" } },
          { bookImage: { $regex: search, $options: "i" } },
          { bookUrl: { $regex: search, $options: "i" } },
        ],
      });
      res.status(200).json(books);
    } else {
      const books = await Book.find();
      res.status(200).json(books);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const {
      title,
      numberOfPages,
      ISBN,
      published,
      author,
      summary,
      price,
      genre,
      bookUrl,
    } = req.body;
    // if bookImage is updated then delete the old image from cloudinary
    if (req.file) {
      const book = await Book.findById(id);
      await cloudinary.uploader.destroy(book.cloudinary_id);
      const result = await cloudinary.uploader.upload(req.file.path);
      const bookImage = result.secure_url;
      const cloudinary_id = result.public_id;
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        {
          title,
          numberOfPages,
          ISBN,
          price,
          published,
          author,
          summary,
          genre,
          bookUrl,
          bookImage,
          cloudinary_id,
        },
        { new: true }
      );
      if (!updatedBook) {
        return res
          .status(404)
          .json({ message: "Book not found with id " + req.params.id });
      }
      res
        .status(200)
        .json({ message: "Book updated successfully", updatedBook });
    } else {
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        {
          title,
          numberOfPages,
          ISBN,
          price,
          published,
          author,
          summary,
          genre,
          bookUrl,
        },
        { new: true }
      );
      if (!updatedBook) {
        return res
          .status(404)
          .json({ message: "Book not found with id " + req.params.id });
      }
      res
        .status(200)
        .json({ message: "Book updated successfully", updatedBook });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // delete the image from cloudinary
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found with id " + req.params.id });
    }
    await cloudinary.uploader.destroy(book.cloudinary_id);

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res
        .status(404)
        .json({ message: "Book not found with id " + req.params.id });
    }
    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

// bulk delete books
exports.bulkDeleteBooks = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids) {
      return res.status(400).json({ message: "Please provide ids" });
    }
    const books = await Book.find({ _id: { $in: ids } });
    if (!books) {
      return res.status(404).json({ message: "Books not found" });
    }
    // delete the images from cloudinary
    books.forEach(async (book) => {
      await cloudinary.uploader.destroy(book.cloudinary_id);
    });
    const deletedBooks = await Book.deleteMany({ _id: { $in: ids } });
    if (!deletedBooks) {
      return res.status(404).json({ message: "Books not found" });
    }
    res
      .status(200)
      .json({ message: "Books deleted successfully", deletedBooks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

// Bulk upload books
exports.bulkUploadBooks = async (req, res) => {
  try {
    if (!bookData) {
      return res.status(400).json({ message: "Please provide books" });
    }
    const newBooks = await Book.insertMany(bookData);
    if (!newBooks) {
      return res.status(404).json({ message: "Books not found" });
    }
    res.status(200).json({ message: "Books uploaded successfully", newBooks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

// stats
exports.getStats = async (req, res) => {
  try {
    const stats = await Book.aggregate([
      {
        $group: {
          _id: "$genre",
          count: { $sum: 1 },
        },
      },
    ]);
    console.log(stats);
    res.status(200).json(stats);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};


