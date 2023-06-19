const mongoose = require('mongoose');

const objectSchema = {
    title: String,
    price: Number,
    description: String,
    // provider: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Provider'
    // }
}

// Crear el esquema
const offerSchema = mongoose.Schema(objectSchema);
// Crear el modelo
const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
