const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan  = require('morgan');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./db/db');
const bookRoutes = require('./routes/books.routes');
const userRoutes = require("./routes/users.routes");
const app = express();

const port = process.env.PORT || 7890;

connectDB();

app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});


