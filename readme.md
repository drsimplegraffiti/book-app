


![1](https://user-images.githubusercontent.com/70065792/201936835-9ba6b7fb-857b-4b7e-b02a-c00217ca4816.png)
![2](https://user-images.githubusercontent.com/70065792/201936849-e6de7a2a-af81-4647-b0a0-8884ae2418f1.png)

![3](https://user-images.githubusercontent.com/70065792/201936870-3aa7b8cf-446e-48dd-8999-4863b0072077.png)

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