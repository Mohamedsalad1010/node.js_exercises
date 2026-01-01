const book = require("../models/books");

// create books
exports.createBook = async (req, res) => {
  const books = new book(req.body);

  try {
    const savedBook = await books.save();
    res.status(201).json({ create: "successFully", saved: savedBook });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  const allBooks = await book.find();
  if (!allBooks) return res.status(404).json("not found books");
  res.json(allBooks);
};

// get bookInfo
exports.getBookInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const bookInfo = await book.findById(id);
    if (!bookInfo) {
      return res.status(404).json("not found books");
    }
    res.json(bookInfo);
  } catch (error) {
    res.status(500).send("server error accured", error.message);
    console.log("server error", error.message);
  }
};

//  update book

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json("not found books");
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).send("server error", error.message);
  }
};

// delete book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBook = await book.findByIdAndDelete(id);
    if (!deleteBook) {
      return res.status(404).json("not found books");
    }
    res.status(200).json({ success: true, BookDeletedInfo: deleteBook });
  } catch (error) {
    res.status(500).send("server error", error.message);
  }
};
