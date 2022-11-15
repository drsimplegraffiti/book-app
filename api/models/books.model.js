const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
       
    },
    numberOfPages: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ISBN: {
        type: String,
        required: true,
       
    },
    published: {
        type: Boolean,
        default: false,
       
    },
    author: {
        type: String,
        required: true,
       
    },
    summary: {
        type: String,
        required: true,
       
    },
    genre: {
        type: String,
        required: true,
       
    },
    bookUrl: {
        type: String,
    },
    bookImage: {
        type: String,
       
    },
    cloudinary_id: {
        type: String,
    },
}, {
    timestamps: true,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
