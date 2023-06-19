const Offer = require('../models/offers')

// GET -> http://localhost:3000/api/search
// Obtiene todas las ofertas de trabajo de la BBDD

const getOffers = async (req, res) => {

    const offer = await Offer
        .find()

    res.status(200).json(offer)
}

module.exports = {
    getOffers
}