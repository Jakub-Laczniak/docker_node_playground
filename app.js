const express = require('express');
const app = express();

app.get('/', (req, res) => res.send({ version: process.version }));

app.listen(8080, (console.log('server is up')))