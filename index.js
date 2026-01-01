const express = require("express");

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Back");
});

//  list of books
let books = [
  { id: 1, title: "ismalure", author: "mohamed" },
  { id: 2, title: "hayaanka nolosha", author: "ayaan cali" },
  { id: 3, title: "waan kusalamay saaxiib", author: "sahro" },
];

// getl all books
app.get("/books", (req, res) => {
  const bookLis = books;
  if (!bookLis) return res.status(404).send("not found books");
  res.json(bookLis);
});

// get one book info

app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id == req.params.id);
  if (!book) return res.status(404).send("not found book info ");
  res.json(book);
});
//  add posks post route
app.post("/books", (req, res) => {
  const newBooks = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };

  if (!req.body.title || !req.body.author) {
    return res.status(400).send("Title and author are required");
  }

  books.push(newBooks);
  res.status(201).json(newBooks);
});

// update books
app.put("/books/:id", (req, res) => {
  console.log("body", req.body);
  const book = books.find((book) => book.id == req.params.id);
  if (!book) return res.status(404).send("not found a book ");
  book.title = req.body.title ?? book.title;
  book.author = req.body.author ?? book.author;
  res.json(book);
});

// delete book
app.delete("/books/:id", (req, res) => {
  const book = books.filter((b) => b.id != req.params.id);
  if (book.length === books.length)
    return res.status(404).send("no found a book");
  books = book;
  res.status(200).json({
    success: true,
    deletedId: req.params.id,
  });
});

app.listen(port, () => {
  console.log("server is running.");
});
