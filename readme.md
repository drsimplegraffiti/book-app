<!-- regex search -->
```javascript
exports.findAllBooks = async (req, res) => {
  try {
    //  full-text search atlas search
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
```

<!-- full text search -->
```javascript
exports.findAllBooks = async (req, res) => {
  try {
    //  full-text search atlas search
    const { q } = req.query;
    if (q) {
      const books = await Book.find({
        $text: { $search: q },
      });
      return res.status(200).json(books);
    } else {
      const books = await Book.find();
      return res.status(200).json(books);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};
```

<!-- Aggregate search -->
```javascript
exports.findAllBooks = async (req, res) => {
  try {
    //  full-text search atlas search
    const { q } = req.query;
    if (q) {
      const books = await Book.aggregate([
        {
          $search: {
            index: "default",
            text: {
              query: q,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      return res.status(200).json(books);
    } else {
      const books = await Book.find();
      return res.status(200).json(books);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};
```