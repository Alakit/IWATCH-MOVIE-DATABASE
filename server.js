
require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

// Welcome message
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'movies.html'));
});

// Get all movies
app.get('/movies', (req, res) => {
  const sql = 'SELECT * FROM "moviesTable"';
  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching movies:', err);
      res.status(500).json({ error: 'Failed to fetch movies' });
      return;
    }
    res.json(result.rows);
  });
});

// Handle POST request to add a new movie
app.post('/addMovie', (req, res) => {
  const { title, synopsis, imageUrl, genre } = req.body;

  const sql = 'INSERT INTO "moviesTable" (id, title, synopsis, "imageUrl", genre) VALUES (DEFAULT, $1, $2, $3, $4)';
  const values = [title, synopsis, imageUrl, genre];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting movie:', err);
      res.status(500).send('Error adding movie');
      return;
    }
    console.log('Movie added successfully');
    res.status(200).send('Movie added successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
