const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.get('/loans', async (req, res) => {
  try {
    // Appel de book-service par son nom DNS dans Kubernetes
    const booksResponse = await axios.get('http://book-service:3000/books');

    res.json({
      loans: [],  // pas encore d’emprunts
      books: booksResponse.data  // on inclut les livres disponibles
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erreur en contactant book-service' });
  }
});

app.listen(PORT, () => {
  console.log(`Loan service listening at http://localhost:${PORT}`);
});

