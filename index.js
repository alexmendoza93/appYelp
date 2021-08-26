const express = require('express');
const app = express();
// con estos dos hechamos a andar nuestro servidor
// const mongoose = require('mongoose');
const path = require('path');
// con esto nos evitamos problemas de ejecucion

app.set('view engine', 'ejs');
// con esto hacemos funcionar nuestros templates de ejs
app.set('views', path.join(__dirname, 'views'));
// avisamos que estamos utilizando la carpeta views

app.get('/', (req, res) => {
    // res.send('Hola desde campamento yelp')
    // este mensaje es de calis para probar que estemos conectados con la pagina
    res.render('home')
});

app.listen(3000, () => {
    console.log('en linea puerto 3000')
});