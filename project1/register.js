const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());


const conne = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'saint-anne'
});

conne.connect((err) => {
  if (err) {
    console.error('Error in connection:', err);
    return;
  }
  console.log('MySQL connection is successful');

  app.listen(port, () => {
    console.log('Server is running on port:', port);
  });
});
app.post('/userregister', (req, res) => {
  const { username, email, password } = req.body;

  const sql = 'INSERT INTO register (username, email, password) VALUES (?, ?, ?)';
  conne.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Failed to register user' });
    }

    console.log('sucess fully');
    res.status(201).json({ message: 'User registered successfully' });
  });
});
