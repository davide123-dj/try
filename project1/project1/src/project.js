const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true
}));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'epms'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL DB');
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    req.session.user = username;
    res.send({ success: true });
  } else {
    res.status(401).send({ success: false, message: "Invalid credentials" });
  }
});

// Departments
app.get('/departments', (_, res) => {
  db.query('SELECT * FROM department', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.send(rows);
  });
});

app.post('/departments', (req, res) => {
  db.query('INSERT INTO department SET ?', req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true });
  });
});

// Employees
app.get('/employees', (_, res) => {
  db.query('SELECT * FROM employee', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.send(rows);
  });
});

app.post('/employees', (req, res) => {
  db.query('INSERT INTO employee SET ?', req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true });
  });
});

// Payroll report
app.get('/payroll', (_, res) => {
  const query = `
    SELECT 
      e.FirstName, e.LastName, e.Position, d.DepartmentName,
      (d.GrossSalary - d.TotalDeduction) AS NetSalary
    FROM employee e
    JOIN department d ON e.DepartmentCode = d.DepartmentCode
  `;
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// Start server
app.listen(5000, () => console.log('🚀 Backend running on port 5000'));
