require('dotenv').config(); // Toujours le premier élément à importer dans un projet

const express = require('express');

const usersRouter = require('./routes/users.js');

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});