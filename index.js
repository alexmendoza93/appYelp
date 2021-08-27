const express = require('express');
const mongoose = require('mongoose');
const campground = require('./models/campground');
// de esta forma mandamos a llamar a nuestro modelo y podemos empeza a hacer objetos

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true, esta mierda no se pudo soportar
    useUnifiedTopology: true
});
// de esta forma llamomos y conectamos con la base de datos mongod con el nombre de yelp-camp y le ponemos opciones

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
// esta es la logica para preguntarle a mondod si esta conectabo

const app = express();
// con estos dos hechamos a andar nuestro servidor
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

// -------------------------------------------
// establecemos una pagina de campground en express
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await campground.find({});
    res.render('campgrounds/index', {campgrounds})
});

// ------------------------------------------
// hacemos nuestro primer campamento
// app.get('/makecampground', async (req, res) => {
//     const camp = new campground({ title: 'Mi Patio Trasero', description: 'un sitio muy comodo'});
//     await camp.save();
//     res.send(camp)
    // res.send sirve para mostrar mensajes
// });
// ----------------------------------

app.listen(3000, () => {
    console.log('en linea puerto 3000')
});