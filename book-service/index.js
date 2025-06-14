const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Données en mémoire (fictives)
let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'Le Meilleur des mondes', author: 'Aldous Huxley' }
];

// Routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur le Book Service ');
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`✅ Book service listening at http://localhost:${port}`);
});

