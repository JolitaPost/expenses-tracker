const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
};

const connection = mysql.createConnection(mysqlConfig);
/*
app.get('/expenses/:id', (req, res) => {  //1 budas. Tada postmane tikrinam: localhost:3000/expenses/1
    const { id } = req.params;
    connection.execute('SELECT * FROM expenses WHERE userid=?', [id], (err, expenses) => {
        res.send(expenses);
    });
});
*/

app.get('/expenses', (req, res) => {  //2 budas. Tada postmane tikrinam: localhost:3000/expenses?userId=1
    const { userId } = req.query;
    connection.execute('SELECT * FROM expenses WHERE userid=?', [userId], (err, expenses) => {
        res.send(expenses);
    });
});

app.post('/expenses', (req, res) => {
    const { type, amount, userId } = req.body;

    connection.execute(
        'INSERT INTO expenses (type, amount, userId) VALUES (?, ?, ?)',
        [type, amount, userId],
        (err, result) => {
            connection.execute('SELECT * FROM expenses WHERE userId=?',
            [userId],
            (err, expenses) => {
                res.send(expenses);
            })
        }
    )
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));