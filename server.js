
require('dotenv').config();

// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_NAME:', process.env.DB_NAME);
// console.log('DB_PORT:', process.env.DB_PORT);

const express = require('express');
const mysql = require('mysql2');
const path = require('path')
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// const connection = mysql.createConnection({
//   host: 'localhost', 
//   user: 'root',      
//   password: 'Mykonos100%',  
//   database: 'movies' 
// });

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('MySQL connected...');
});



// Welcome message
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'movies.html'));
});

// How to Get all movies
app.get('/movies', (req, res) => {
  let sql = 'SELECT * FROM movies';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching movies:', err);
      res.status(500).json({ error: 'Failed to fetch movies' });
      return;
    }
    res.json(result);
  });
});

// how to Handle POST request to add a new movie
app.post('/addMovie', (req, res) => {
  const { title, synopsis, imageUrl, genre } = req.body;

  const sql = 'INSERT INTO movies (title, synopsis, imageUrl, genre) VALUES (?, ?, ?, ?)';
  connection.query(sql, [title, synopsis, imageUrl, genre], (err, result) => {
    if (err) {
      console.error('Error inserting movie:', err);
      res.status(500).send('Error adding movie');
      return;
    }
    console.log('Movie added successfully');
    res.status(200).send('Movie added successfully');
  });
});

// to  Start the server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

