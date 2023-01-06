const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'ziema2022*',
    database: 'expenses_tracker',
    port: 3306
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

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));