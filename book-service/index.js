const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const book = req.body;
  books.push(book);
  res.status(201).json(book);
});

app.listen(PORT, () => {
  console.log(`Book service listening at http://localhost:${PORT}`);
});

