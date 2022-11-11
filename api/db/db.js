const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    // // create indexes
    // await mongoose.connection.db.collection("books").createIndex({
    //   title: "text",
    //   author: "text",
    //   genre: "text",
    //   summary: "text",
    //   numberOfPages: "text",
    //   ISBN: "text",
    //   price: "text",
    // });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
