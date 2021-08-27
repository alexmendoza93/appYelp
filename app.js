const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
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
// const campground = require('./models/campground');
// con esto nos evitamos problemas de ejecucion

app.set('view engine', 'ejs');
// con esto hacemos funcionar nuestros templates de ejs
app.set('views', path.join(__dirname, 'views'));
// avisamos que estamos utilizando la carpeta views

app.use(express.urlencoded({extended: true}));
// con esto parseamos por si queremos visualizar un post en una pagina
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    // res.send('Hola desde campamento yelp')
    // este mensaje es de calis para probar que estemos conectados con la pagina
    res.render('home')
});

// -------------------------------------------
// establecemos una pagina de campground en express
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    // con esto mandamos allamar la base de datos en mongod
    res.render('campgrounds/index', {campgrounds})
    // con esto linkeamos mongod con index
});

// ------------------------------------------
// habilitamos pagina para agregar nuevos campamentos
app.get('/campgrounds/new', (req, res) => { 
    res.render('campgrounds/new')
});
// me estaba saltando un problema por que estaba tomando new como si fuera id, porque este codigo lo puse despues de campgrounds/:id

// ---------------------------------------------
// le dicimos al post a donde mandar la informacion
app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
    // y con esto seteamos el pedo para que se agreguen nuevas areas para acampar
    // res.send(req.body);
    // con esto podemos ver el post si esta parseado el pedo
});

// ---------------------------------------------
// ahora queremos editar los campamentos
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
});
// -----------------------------------------------
// vamos a calar si sirve el metodo override y con esto vamos a actualizar realmente la base de datos
app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    // obtenemos el id
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
    // res.send('Eres Un Perro Dios!!!')
    // mandamos ese mansaje si funciona
});


// --------------------------------------------
// iniciamos con nuestra pagina a detalle con id
app.get('/campgrounds/:id', async (req, res) => { 
    const campground = await Campground.findById(req.params.id);
    // con esto obtenemos el id y lo guardamos en campground
    res.render('campgrounds/show', {campground})
    // y de esta forma pasamos el id a Show.ejs
});
// --------------------------------------------
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