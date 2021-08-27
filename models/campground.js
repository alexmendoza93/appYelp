const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String

});
// con esto hacemos nuestro modelo

module.exports = mongoose.model('campground', campgroundSchema);
// el primero es el nombre y el otro es el nombre de la Schema