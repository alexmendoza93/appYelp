const mongoose = require('mongoose');
// con esto requerimos mongoose
const cities = require('./cities');
// con esto requerimos el archivo de ciudades
const { places, descriptors } = require('./seedHelpers');
// con esto requerimos a nuestros seed helpers
const campground = require('../models/campground');
// con esto requerimos a nuestro modelo

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true, esta mierda no es soportada
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
// con esto validamos la conecion con la base de datos
const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})