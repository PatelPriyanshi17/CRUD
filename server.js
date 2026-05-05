const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',   // put your mysql password
    database: 'college_crud'
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// CREATE
app.post('/add', (req, res) => {
    const { name, email, course } = req.body;
    db.query("INSERT INTO students (name,email,course) VALUES (?,?,?)",
        [name, email, course],
        (err, result) => {
            if (err) throw err;
            res.send(result);
        });
});

// READ
app.get('/students', (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// UPDATE
app.put('/update/:id', (req, res) => {
    const { name, email, course } = req.body;
    const id = req.params.id;

    db.query("UPDATE students SET name=?, email=?, course=? WHERE id=?",
        [name, email, course, id],
        (err, result) => {
            if (err) throw err;
            res.send(result);
        });
});

// DELETE
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM students WHERE id=?", [id],
        (err, result) => {
            if (err) throw err;
            res.send(result);
        });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});