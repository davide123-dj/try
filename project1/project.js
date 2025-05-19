const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

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

// Employees CRUD Operations

// Get all employees
app.get('/employees', (_, res) => {
  db.query('SELECT * FROM employee', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.send(rows);
  });
});

// Create employee
app.post('/employees', (req, res) => {
  db.query('INSERT INTO employee SET ?', req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true });
  });
});

// Update employee information
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { FirstName, LastName, Position, Address, Telephone, Gender, hireDate, DepartmentCode } = req.body;

  const query = `
    UPDATE employee 
    SET FirstName = ?, LastName = ?, Position = ?, Address = ?, Telephone = ?, Gender = ?, hireDate = ?, DepartmentCode = ?
    WHERE EmployeeNumber = ?
  `;
  
  db.query(query, [FirstName, LastName, Position, Address, Telephone, Gender, hireDate, DepartmentCode, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ success: true, message: 'Employee updated successfully' });
  });
});

// Delete employee
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM employee WHERE EmployeeNumber = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ success: true, message: 'Employee deleted successfully' });
  });
});

// Start server
app.listen(5000, () => console.log('🚀 Backend running on port 5000'));
