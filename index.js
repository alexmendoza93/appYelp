const express = require('express');
const app = express();
// const mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.send('Hola desde campamento yelp')
})

app.listen(3000, () => {
    console.log('en linea puerto 3000')
})