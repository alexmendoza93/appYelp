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
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/4330032",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga dolorem nam neque impedit suscipit voluptas sapiente cum illo, repellat culpa, autem consequuntur modi commodi sed! Odio totam saepe vel praesentium, voluptate quam quasi quaerat dolore sint qui porro nesciunt at! Ipsa quisquam placeat molestiae nostrum ullam ratione id praesentium provident in, dicta quod exercitationem mollitia quam voluptates error. Nemo eveniet ratione earum voluptas molestias reprehenderit ea quae voluptatum quas in.",
            price: price
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})